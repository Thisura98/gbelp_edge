import * as l from '../../util/logger';
import * as sql from '../../util/connections/sql/sql_connection';
import DAOCallback, { DAOMergeOperation } from './commons';
import { IGameObjective } from '../../../../commons/src/models/game/objectives';
import { IGameGuidanceTracker } from '../../../../commons/src/models/game/trackers';
import { MysqlError } from 'mysql';

/**
 * Helper for creaitng SQL INSERT Queries
 */
function createInsertQuery(
    table: string,
    columns: string[],
    values: string[],
): string{
    const escapedValues = values.map((v) => {
        if (v == null || v == undefined)
            return v ?? 'null';
        else
            return sql.escape(v);
    });
    const st_cols = '(' + columns.join(',') + ')';
    const st_values = '(' + escapedValues.map(v => `${v}`).join(',') + ')';
    return `INSERT INTO ${table} ${st_cols} VALUES ${st_values}`;
}

/**
 * Helper for creaitng SQL UPDATE Queries
 */
function createUpdateQuery(
    table: string,
    columns: string[],
    values: string[],
    where: string
): string{
    if (columns.length != values.length){
        l.logc(`array sizes do not match ${columns.length} ${values.length}`, 'createUpdateQuery');
        return '';
    }

    let sets: string[] = [];
    for (let i=0; i<columns.length; i++){
        const val = values[i];
        if (val == null || val == undefined){
            sets.push(`${columns[i]} = ${val ?? 'null'}`);
        }
        else{
            const escaped = sql.escape(values[i]);
            sets.push(`${columns[i]} = ${escaped}`);
        }
    }
    const st_set = sets.join(',');

    return `UPDATE ${table} SET ${st_set} WHERE ${where}`;
}

/**
 * Helper for creaitng SQL DELETE Queries
 */
function createDeleteQuery(
    table: string,
    where: string
){
    return `DELETE FROM ${table} WHERE ${where}`;
}

/******* * END PRIVATE METHODS * ********/

/**
 * @param id Game Entry ID
 */
 export function getObjectives(id: string | number, callback: DAOCallback){
    const query = `SELECT * FROM ${sql.tables.gameObjective} WHERE ${sql.columns.gameObjective.gameEntryId} = ${id}`;
    sql.getPool()?.query(query, (error, result) => {
        if (error){
            callback(false, error.message, null);
        }
        else{
            callback(true, 'Successfully obtained objectives', result);
        }
    });
}

/**
 * @param id Game Entry ID
 */
export function getGuidanceTrackers(id: string | number, callback: DAOCallback){
    const query = `SELECT * FROM ${sql.tables.gameGuidanceTracker} WHERE ${sql.columns.gameGuidanceTracker.gameEntryId} = ${id}`;
    sql.getPool()?.query(query, (error, result) => {
        if (error){
            callback(false, error.message, null);
        }
        else{
            callback(true, 'Successfully obtained trackers', result);
        }
    });
}


/**
 * Handle Add, Update and Delete of objectives for a game entry.
 */
export function updateObjectives(
    gameId: string, 
    objectives: IGameObjective[], 
    callback: (status: boolean) => void
){
    let objectivesOps: DAOMergeOperation<IGameObjective>[] = [];

    const qGetObjectives = `SELECT * FROM ${sql.tables.gameObjective}`;
    const abort = (msg: MysqlError | string | undefined) => {
        if (typeof msg === 'string')
            l.logc(msg, 'updateObjectives error');
        else if (msg as MysqlError)
            l.logc(msg!.message, 'updateObjectives error');
        
        callback(false);
    };

    // Get existing data
    sql.getPool()!.query(qGetObjectives, (error, result) => {
        if (error){
            abort(error);
            return;
        }

        objectivesOps = (result as Array<any>).map( (obj) => {
            const castObj = obj as IGameObjective
            return new DAOMergeOperation(castObj, 'delete');
        });

        // Check new data

        let toInsertObjectives: IGameObjective[] = [];
        for (let newObj of objectives){
            let markedForUpdate = false;
            for (let objOp of objectivesOps){
                if (objOp.data.objective_id == newObj.objective_id){
                    objOp.operation = 'update';
                    markedForUpdate = true;
                    objOp.data = newObj;
                    break;
                }
            }

            if (!markedForUpdate)
                toInsertObjectives.push(newObj);
        }
        objectivesOps.push(
            ...toInsertObjectives.map(o => new DAOMergeOperation<IGameObjective>(o, 'insert'))
        );
        
        // Process new data
        let objectivesPromises = createObjectivesQueryPromises(objectivesOps);
        Promise.all(objectivesPromises).then(() => {
            callback(true);
        }, (error) => {
            l.logc('Updating Game Objectives Failed', 'updateObjectivesAndTrackers')
            abort(error);
        });
    })
}

/**
 * Creates an array of promises to INSERT, UPDATE and DELETE
 * Game Objectives.
 */
function createObjectivesQueryPromises(operations: DAOMergeOperation<IGameObjective>[]): Promise<boolean>[]{
    return operations.map(op => {
        return new Promise<boolean>((resolve, reject) => {
            const c = sql.columns.gameObjective;
            const obj = op.data;
            const table = sql.tables.gameObjective;
            let query = '';

            switch(op.operation){
                case 'insert':
                    const i_columns = [c.objectiveId, c.gameEntryId, c.name, c.description, c.maxValue];
                    const i_values = ['null', `${obj.game_entry_id}`, obj.name, obj.description ?? 'null', `${obj.max_value}`];
                    query = createInsertQuery(table, i_columns, i_values);
                    break;

                case 'update':
                    const u_columns = [c.gameEntryId, c.name, c.description, c.maxValue];
                    const u_values = [`${obj.game_entry_id}`, obj.name, obj.description ?? 'null', `${obj.max_value}`];
                    const u_where = `${c.objectiveId} = '${obj.objective_id}'`;
                    query = createUpdateQuery(table, u_columns, u_values, u_where);
                    break;

                case 'delete':
                    const d_where = `${c.objectiveId} = '${obj.objective_id}'`;
                    query = createDeleteQuery(table, d_where);
                    break;
            }

            // console.log('createObjectivesQueryParams query', query);

            sql.getPool()!.query(query, (error, result) => {
                if (error)
                    reject(error.message);
                else
                    resolve(true);
            });
        })
    });
}

/**
 * Handle Add, Update and Delete of guidance trackers for a game entry.
 */
export function updateTrackers(
    gameId: string, 
    trackers: IGameGuidanceTracker[], 
    callback: (status: boolean) => void
){
    let trackersOps: DAOMergeOperation<IGameGuidanceTracker>[] = [];

    const qGetTrackers = `SELECT * FROM ${sql.tables.gameGuidanceTracker}`;
    const abort = (msg: MysqlError | string | undefined) => {
        if (typeof msg === 'string')
            l.logc(msg, 'updateTrackers error');
        else if (msg as MysqlError)
            l.logc(msg!.message, 'updateTrackers error');
        callback(false);
    };

    // Get Existing data
    sql.getPool()!.query(qGetTrackers, (error, result) => {
        if (error){
            abort(error);
            return;
        }
        trackersOps = (result as Array<any>).map( (obj) => {
            const castObj = obj as IGameGuidanceTracker
            return new DAOMergeOperation(castObj, 'delete');
        });

        // Check data
        let toInsertTrackers: IGameGuidanceTracker[] = [];
        for (let newTracker of trackers){
            let markedForUpdate = false;
            for (let trackerOp of trackersOps){
                if (trackerOp.data.tracker_id == newTracker.tracker_id){
                    markedForUpdate = true;
                    trackerOp.operation = 'update';
                    trackerOp.data = newTracker;
                    break;
                }
            }

            if (!markedForUpdate)
                toInsertTrackers.push(newTracker);
        }
        trackersOps.push(
            ...toInsertTrackers.map(o => new DAOMergeOperation<IGameGuidanceTracker>(o, 'insert'))
        );


        // Process new data
        let tarckerPromises = createTrackerQueryPromises(trackersOps);
        Promise.all(tarckerPromises).then(() => {
            callback(true);
        }, (error) => {
            l.logc('Updating Game Trackers Failed', 'updateTrackers')
            abort(error);
        });
    })
}


/**
 * Creates an array of promises to INSERT, UPDATE and DELETE
 * Game.
 */
function createTrackerQueryPromises(operations: DAOMergeOperation<IGameGuidanceTracker>[]): Promise<boolean>[]{
    return operations.map(op => {
        return new Promise<boolean>((resolve, reject) => {
            const c = sql.columns.gameGuidanceTracker;
            const obj = op.data;
            const table = sql.tables.gameGuidanceTracker;
            let query = '';

            switch(op.operation){
                case 'insert':
                    const i_columns = [c.gameEntryId, c.name, c.message, c.maxThreshold]
                    const i_values = [`${obj.game_entry_id}`, obj.name, obj.message ?? 'null', `${obj.max_threshold}`];
                    query = createInsertQuery(table, i_columns, i_values);
                    break;

                case 'update':
                    const u_columns = [c.gameEntryId, c.name, c.message, c.maxThreshold]
                    const u_values = [`${obj.game_entry_id}`, obj.name, obj.message ?? 'null', `${obj.max_threshold}`];
                    const u_where = `${c.trackerId} = '${obj.tracker_id}'`;
                    query = createUpdateQuery(table, u_columns, u_values, u_where);
                    break;

                case 'delete':
                    const d_where = `${c.trackerId} = '${obj.tracker_id}'`;
                    query = createDeleteQuery(table, d_where);
                    break;
            }

            console.log('createTrackerQueryPromises query', query);

            sql.getPool()!.query( query, (error, result) => {
                if (error)
                    reject(error.message);
                else
                    resolve(true);
            });
        })
    });
}