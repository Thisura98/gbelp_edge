const mysql = require('mysql');
const { tables, columns } = require('./sql_schema');
const l = require('../../util/logger');

/**
 * Initial table schemas (requires a db - does not create the db)
 * @param {mysql.Connection} db
 * @param {String} migratedVer
 * @param {function():void} completion
 */
function migrateV1(db, migratedVer, completion){
    // Check current version
    if (shouldMigrate(migratedVer, 1)){
        completion();
        return;
    }

    const errHandler = (err, _, __) => {
        if (err){
            l.logc(err, "migrateV1");
        }
    };

    // Queued operations happen in sequence

    db.query(`CREATE TABLE IF NOT EXISTS ${tables.metaConfig} (
        ${columns.metaConfig.key} VARCHAR(100) NOT NULL,
        ${columns.metaConfig.value} VARCHAR(200)
    );`, errHandler);

    db.query(`CREATE TABLE ${tables.userType} (
        ${columns.userType.userTypeId} INT AUTO_INCREMENT PRIMARY KEY,
        ${columns.userType.name} VARCHAR(100)
    );`, errHandler);

    db.query(`CREATE TABLE ${tables.users} (
        ${columns.users.userId} INT AUTO_INCREMENT PRIMARY KEY,
        ${columns.users.userName} VARCHAR(100) NOT NULL,
        ${columns.users.userEmail} VARCHAR(100) NOT NULL,
        ${columns.users.userType} INT,
        ${columns.users.userPasswordHash} VARCHAR(33) NOT NULL,
        FOREIGN KEY (${columns.users.userType}) 
            REFERENCES ${tables.userType}(${columns.userType.userTypeId})
            ON UPDATE SET NULL ON DELETE SET NULL
    );`, errHandler);

    setLastMigration(db, '1', () => {
        completion();
    });

    // TODO capabilities, relationships
}

/**
 * Migrate the database schema to the latest version
 * @param {mysql.Connection} db
 */
function runMigrations(db){
    getCurrentMigrationVersion(db, (ver) => {
        migrateV1(db, ver, () => {});
    });
}

/**
 * Returns the current migration version.
 * If this is the initial run return ""
 * @param {mysql.Connection} db 
 * @param {function(string):void} callback 
 */
function getCurrentMigrationVersion(db, callback){
    db.query(
        `SELECT ${columns.metaConfig.value} 
        FROM ${tables.metaConfig} 
        WHERE ${columns.metaConfig.key} = 'migrate';`,

        (err, res, _) => {
            if (err){
                // l.logc(err, "migrate-checkVersion");
                callback("");
            }
            else{
                callback(res[0].meta_value)
            }
        }
    );
}

/**
 * Set the last migration version on db
 * @param {mysql.Connection} db 
 * @param {String} value 
 * @param {function():void} callback 
 */
function setLastMigration(db, value, callback){
    db.query(`INSERT INTO ${tables.metaConfig} VALUES ('migrate', '${value}')`, (err, _, __) => {
        l.logc(err, "migrate-setMigration");
        callback();
    });
}

/**
 * Returns whether the migration represented by 
 * 'thisVer' should execute.
 * 
 * @param {Number|String} dbVer 
 * @param {Number|string} thisVer 
 * @returns boolean
 */
function shouldMigrate(dbVer, thisVer){
    if (dbVer instanceof String && (dbVer == "" || dbVer == null)){
        return true;
    }
    else if (Number(dbVer) >= Number(thisVer)){
        return true;
    }
    return false;
}

module.exports.runMigrations = runMigrations;