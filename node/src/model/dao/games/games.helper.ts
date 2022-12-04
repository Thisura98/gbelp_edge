import { kGameEntryParentEntryIdNone } from "../../../../../commons/src/models/game/game";
import { GameProject } from "../../../../../commons/src/models/game/project";
import { cloneTemplateResources, cleanupGameResources } from './rescopy.helper';
import { replaceResourcesInTemplate } from './template.resreplace.helper';
import * as mongo from '../../../Util/connections/mongo/mongo_connection';
import * as sql from '../../../Util/connections/sql/sql_connection';
import * as l from '../../../Util/logger';
import * as utils from '../../../Util/utils';
import * as gamesDAO from './index';
import * as metricsDAO from '../metrics';
import { getNewObjectId } from "../../../../../commons/src/models/common";
import { GameObjective } from "../../../../../commons/src/models/game/objectives";
import { GameGuidanceTracker } from "../../../../../commons/src/models/game/trackers";

/**
 * Clones the provided game template and returns a 
 * fully concrete game ID
 * 
 * @param data Parameters sent from client's game create component
 * @param m Columns and Values prepared for GameEntry table insert
 */
export async function cloneTemplateAndCreateGame(data: any, m: { [key: string]: string }): Promise<string> {
    const templateId = data.parent_entry_id;

    if (templateId == null || templateId == kGameEntryParentEntryIdNone) {
        return Promise.reject('Game template cannot be empty');
    }

    return new Promise((resolve, reject) => {
        gamesDAO.getGame(templateId, async (status, msg, listing) => {
            if (!status || listing == null){
                reject(msg);
                return;
            }

            const oldGameId = listing.entry.id.toString();
            const oldResources = listing.project.resources;

            let clonedResources: Map<string, string> | undefined = undefined;

            try{
                // Step 1: Clone resources
                clonedResources = await cloneTemplateResources(oldResources);

                // Step 2: Duplicate project
                let clonedTemplate = deepCopy(listing.project);
                replaceResourcesInTemplate(clonedTemplate, clonedResources);
                let projectId = await writeNewProject(clonedTemplate);

                // Step 3: Duplicate Game Records
                m[sql.columns.gameEntry.projectId] = projectId;
                let newGameId = await createGameRecord(m);
                await cloneObjectives(oldGameId, newGameId);
                await cloneGuidanceTracker(oldGameId, newGameId);

                resolve(newGameId);
            }
            catch(error){
                if (clonedResources != undefined){
                    await cleanupGameResources(clonedResources.values());
                }

                l.logc(String(error), 'cloneTemplateAndCreateGame()');
                reject('Error occurred while trying to create game');
            }
        });
    });
}

function deepCopy<T>(object: T){
    return JSON.parse(JSON.stringify(object)) as T;
}

function writeNewProject(project: GameProject): Promise<string>{
    return mongo.Collections.getGameProjects().insertOne({
        resources: project.resources, 
        levels: project.levels
    })
    .then(result => {
        return result.insertedId.toHexString();
    })
}

/**
 * @param m Prepared columns and values for the game entry table
 * @returns InsertID of the new record
 */
function createGameRecord(m: { [key: string]: string }): Promise<string>{
    const dictKeys = Object.keys(m);
    const dictValues = Object.values(m);
    const noEntries = dictValues.length;
    const template = `${Array(noEntries).fill('?')}`
    const columns = dictKeys.join(', ');

    const query = `INSERT INTO ${sql.tables.gameEntry} (${columns}) VALUES (${template})`;

    return new Promise<string>((resolve, reject) => {
        sql.getPool()!.query(query, dictValues, (err, res) => {
            if (err){
                l.logc(err.message, 'createGameRecord()');
                reject('Error creating Game Record');
            }
            else{
                resolve(res.insertId);
            }
        })
    });
}

/**
 * @param originalEntryId The gameEntry from which the objectives must be copied
 * @param newEntryId The gameEntry to which the new objectives must be associated
 * @returns 
 */
function cloneObjectives(originalEntryId: string, newEntryId: string): Promise<void>{
    return new Promise((resolve, reject) => {
        metricsDAO.getObjectives(originalEntryId, (status, msg, result) => {
            if (!status || result == null){
                reject(msg);
                return;
            }
    
            const records = result as GameObjective[];
            
            for (let record of records){
                record.game_entry_id = Number.parseInt(newEntryId);
                record.objective_id = undefined;
            }

            metricsDAO.updateObjectives(newEntryId, records, (metricsStatus) => {
                if (metricsStatus){
                    resolve();
                }
                else{
                    reject('Failed to insert objective copies');
                }
            });
        });
    });
}

/**
 * @param originalEntryId The gameEntry from which the objectives must be copied
 * @param newEntryId The gameEntry to which the new objectives must be associated
 * @returns 
 */
function cloneGuidanceTracker(originalEntryId: string, newEntryId: string): Promise<void>{
    return new Promise((resolve, reject) => {
        metricsDAO.getGuidanceTrackers(originalEntryId, (status, msg, result) => {
            if (!status || result == null){
                reject(msg);
                return;
            }
    
            const records = result as GameGuidanceTracker[];
            
            for (let record of records){
                record.game_entry_id = Number.parseInt(newEntryId);
                record.tracker_id = undefined;
            }

            metricsDAO.updateTrackers(newEntryId, records, (metricsStatus) => {
                if (metricsStatus){
                    resolve();
                }
                else{
                    reject('Failed to insert guidance tracker copies');
                }
            });
        });
    });
}