import * as mongo from '../../../Util/connections/mongo/mongo_connection';
import { GameListing, GameType, kGameEntryParentEntryIdNone, SaveGameRequestData } from '../../../../../commons/src/models/game/game';
import * as LevelInitData from '../../../../../commons/src/models/game/levels/initdata';
import * as sql from '../../../Util/connections/sql/sql_connection';

export function createTemplate(data: any, m: { [key: string]: any }): Promise<string>{

    const c = sql.columns.gameEntry;

    return new Promise<string>((resolve, reject) => {
        let sampleLevels: Object[] = []

        if (data.type == GameType.Singleplayer){
            sampleLevels = LevelInitData.getSinglePlayerLevelInitData(data.level_switch, null);
        }
        else if (data.type == GameType.Multiplayer){
            sampleLevels = LevelInitData.getMultiPlayerLevelInitData(data.level_switch, null);
        }
        else{
            // callback(false, `Unknown game type: "${data.type}"`, null);
            reject(`Unknown game type: "${data.type}"`);
        }

        const proj = { resources: [], levels: sampleLevels };
        mongo.Collections.getGameProjects().insertOne(proj, (mongo_error, result) => {
            if (mongo_error != null){
                // callback(false, 'Error creating Game Project', null);
                reject('Error creating Game Project');
                return;
            }
        
            /**
             * .toString() is IMPORTANT. document._id are ObjectIDs
             * and not strings. Trying to pass it to MySQL with throw
             * head scratching errors where, the 'INSERT INTO'
             * contains values such as '_bsonType'.
             * 
             * Had to learn this the hard way. DO NOT FORGET!
             */
            const projectId = result!.insertedId.toHexString();
            m[c.projectId] = projectId;

            const dictKeys = Object.keys(m);
            const dictValues = Object.values(m);
            const noEntries = dictValues.length;
            const template = `${Array(noEntries).fill('?')}`
            const columns = dictKeys.join(', ');

            const query = `INSERT INTO ${sql.tables.gameEntry} (${columns}) VALUES (${template})`;

            sql.getPool()!.query({
                sql: query,
                values: dictValues
            }, (err, results, fields) => {

                if (err == null){
                    // const response = {
                    //     gameId: results.insertId
                    // };
                    // callback(true, "Successfully inserted", response);
                    resolve(results.insertId);
                }
                else{
                    console.log("Create Game Error", err);
                    // callback(false, "Server Error occured", null);
                    reject('Server Error Occured');
                }
            });
        });
    });
}