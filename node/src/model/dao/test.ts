import * as utils from '../../Util/utils';
import * as l from '../../Util/logger';
import * as sql from '../../Util/connections/sql/sql_connection';

export function clearTestDatabase(): Promise<boolean>{
    if (!utils.getIsTestMode()){
        return Promise.reject('Server is not in Test mode');
    }

    let excludedTables = [
        sql.tables.metaConfig, 
        sql.tables.userType,
        sql.tables.userRelationshipType
    ];

    let tables = Object.values(sql.tables);
    for (let et of excludedTables){
        tables.splice(tables.findIndex(t => t == et), 1);
    }

    let queries = tables.map(table => `DELETE FROM \`${table}\` WHERE 1 = 1;`);
    let promises = queries.map(query => {
        return new Promise<boolean>((resolve, reject) => {
            sql.getPool()!.query(query, (error, result) => {
                if (error){
                    reject(error);
                }
                else{
                    resolve(true);
                }
            });
        });
    });

    return Promise.all(promises).then(() => { return Promise.resolve(true) });
}