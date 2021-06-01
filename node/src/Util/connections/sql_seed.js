const mysql = require('mysql');
const { tables, columns } = require('./sql_schema');
const l = require('../../util/logger');

/*
 * TODO: In progress...
 * - [x]: Seed User Types
 * - [ ]: Seed User Capabilities
 * - [ ]: Seed User Relationship Types
 * - [ ]: Mark seed complete
 */


/**
 * Seed the database if it not already seeded.
 * @param {mysql.Connection} db 
 * @param {function():void} completion 
 */
function seedDatabase(db, completion){
    const seededKey = 'seeded';
    db.query(
        `SELECT ${columns.metaConfig.value}
         FROM ${tables.metaConfig}
         WHERE ${columns.metaConfig.key} = '${seededKey}'`,
        (err, res, fields) => {
            if (res === undefined){
                // Seeding required
                seedingProcess(db, completion);
            }
            else{
                if (err){
                    l.logc(err, 'mysql-seed');
                }
                completion()
            }
        }
    )
}

/**
 * Performs seeding process then 
 * @param {mysql.Connection} db 
 * @param {function():void} completion 
 */
function seedingProcess(db, completioon){

    const logErrors = (err, _, __) => {
        l.logc(err, 'mysql-seed-proc');
    };

    db.query(
        `INSERT INTO ${tables.userType} 
         (${columns.userType.userTypeId}, ${columns.userType.name})
         VALUES ?`,
        [
            [0, 'admin'],
            [1, 'teacher'],
            [2, 'student'],
            [3, 'parent']
        ],
        logErrors
    );   

    // 
}