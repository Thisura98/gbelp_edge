const l = require('../logger');
const mysql = require('mysql');
const { DateTime } = require('luxon');
const { tables, columns } = require('./sql_schema');
const migrations = require('./sql_migrate');


/**
 * Main DB pool
 * Use "pool.query" or, "c = pool.getConnection, c.query"
 * 
 * Readmore: https://github.com/mysqljs/mysql#pooling-connections
 * 
 * @type { mysql.Pool }
 */
var pool = null;

/**
 * Initialize SQL connections
 */
function initialize(){
    // Init DB Connection Pool
    pool = mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        port: 9000,
        user: 'root',
        password: 'root',
        database: 'edge_gbelp'
    });

    // Migrations must run sequentially, 
    // so we're providing an explicit connection
    pool.getConnection((err, db) => {
        if (err)
            l.logc(err, 'mysql:initialize');
        else
            migrations.runMigrations(db);
    })
}

/**
 * Convert Luxon DateTime objects into MySQL friendly datetime strings
 * @param {DateTime} param 
 * @returns String
 */
function formatDate(param){
    const format = 'yyyy-MM-dd HH:mm:ss';
    if (!(param instanceof DateTime)){
        l.logc(`${param} cannot be converted to MySQL DateTime format`, 'mysql');
        return DateTime.now().toFormat(format);
    }
    return (param).toFormat(format);
}

/// Initialize
module.exports.initialize = initialize;

/// Export the database pool
module.exports.pool = pool;

/// Tables
module.exports.tables = tables;

/// DateTime format
module.exports.formatDate = formatDate;