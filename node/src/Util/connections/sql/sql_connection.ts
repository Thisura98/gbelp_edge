import * as l from '../../../Util/logger';
import * as migrations from './sql_migrate';
import * as utils from '../../utils';

import mysql, { FieldInfo } from 'mysql';
import { DateTime } from 'luxon';
import { tables, columns } from './sql_schema';
import { assert } from 'console';
import { IConfig } from '../../../Util/config';

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
var pool: mysql.Pool | null = null;

export { tables, columns };

/**
 * The Database Pool
 * @returns { mysql.Pool }
 */
export function getPool(){
    return pool
}
/**
 * Escape an untrusted string to be used as a SQL value. Use this on user
 * provided data.
 * @param value Value to escape
 * @param stringifyObjects If true, don't convert objects into SQL lists
 * @param timeZone Convert dates from UTC to the given timezone.
 */
export const escape = mysql.escape;

/**
 * Unlike `escape()`, this variant handles
 * null and undefined values safely.
 * @param value Value to escape
 */
export const smartEscape = (value: any | null | undefined) => {
    if (value == null || undefined)
        return 'null';
    else
        return mysql.escape(value);
}

/**
 * Initialize SQL connections
 */
export function initialize(config: IConfig){
    const dbName = utils.getIsTestMode() ? config.test_database : config.production_database;

    // Init DB Connection Pool
    pool = mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        port: 9000,
        user: 'root',
        password: 'edgeknowledgesource1234567890',
        database: dbName,
        dateStrings: true
    });

    // Migrations must run sequentially, 
    // so we're providing an explicit connection
    pool.getConnection((err, db) => {
        if (err)
            l.logc(err.message, tag + ":init");
        else{
            migrations.runMigrations(db);
            l.logc('MySQL Connected', tag);
        }
        db.release();
    })
}

/**
 * Convert Luxon DateTime objects into MySQL friendly datetime strings
 * @param {DateTime} param 
 * @returns String
 */
export function formatDate(param: DateTime){
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
function snakeCaseToCamelCase(snake: string){
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
export function mapResult(res: Array<string>, fields: Array<FieldInfo> | undefined): Object{
    const mapped = res.map((row) => {
        console.log('row:', row);
        let obj = {};
        let i = 0;
        for (let field of fields!){
            const fieldName = String(field.name);
            const snakeCased = snakeCaseToCamelCase(fieldName);
            console.log('Mapping', fieldName, 'as', snakeCased);
            (obj as any)[snakeCased] = (row as any)[fieldName];
            i++;
        }
        return obj;
    })[0];
    return mapped;
}

// Pre-typescript exports

/// Initialize
// module.exports.initialize = initialize;

/// Export the database pool
// module.exports.getPool = getPool;

/// Tables
// module.exports.tables = tables;

/// Columns
// module.exports.columns = columns;

/// DateTime format
// module.exports.formatDate = formatDate;

/// Mapper
// module.exports.mapResult = mapResult;