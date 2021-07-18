const l = require('../../logger');
const mysql = require('mysql');
const { DateTime } = require('luxon');
const { tables, columns } = require('./sql_schema');
const migrations = require('./sql_migrate');

/**
 * Log Tag
 */
const tag = 'mysql';

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
 * The Database Pool
 * @returns { mysql.Pool }
 */
function getPool(){
    return pool
}

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
            l.logc(err, tag + ":init");
        else{
            migrations.runMigrations(db);
            l.logc('MySQL Connected', tag);
        }
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

/**
 * Converts snake case to camecase
 * @param {String} snake 
 */
function snakeCaseToCamelCase(snake){
    return snake.replace(
        /([-_][a-z])/g,
        (group) => group.toUpperCase()
            .replace('-', '')
            .replace('_', '')
    );
}

/**
 * Maps the snake case columns of a dataset
 * into camelCase columns and generates
 * a return-ready js object for the query result.
 * @param {Array} res 
 * @param {Array} fields 
 * @returns 
 */
function mapResult(res, fields){
    const mapped = res.map((row) => {
        console.log('row:', row);
        let obj = {};
        let i = 0;
        for (field of fields){
            const fieldName = String(field.name);
            const snakeCased = snakeCaseToCamelCase(fieldName);
            console.log('Mapping', fieldName, 'as', snakeCased);
            obj[snakeCased] = row[fieldName];
            i++;
        }
        return obj;
    });
    return mapped;
}

/// Initialize
module.exports.initialize = initialize;

/// Export the database pool
module.exports.getPool = getPool;

/// Tables
module.exports.tables = tables;

/// Columns
module.exports.columns = columns;

/// DateTime format
module.exports.formatDate = formatDate;

/// Mapper
module.exports.mapResult = mapResult;