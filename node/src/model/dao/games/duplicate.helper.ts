/**
 * Clone helper performs the actual clone operations.
 * 
 * Duplicate helper calls clone helper to perform the 
 * frontend duplicate actions from places such as tables.
 * It doesn't contain any cloning logic.
 */

import * as utils from '../../../Util/utils';
import * as l from '../../../Util/logger';
import { getGame, convertGameRequestDataToQueryMap } from './';
import { SaveGameRequestData } from '../../../../../commons/src/models/game/game';
import { cloneTemplateAndCreateNewRecord } from './clone.helper';

export interface DuplicateEntryResult{
    gameId: string
}

/**
 * Duplicates a game or template
 * @param entryId Game or template ID
 * @param userId User ID calling the action
 * @returns the New concrete entry ID
 */
export function duplicateGameOrTemplateEntry(
    entryId: string,
    userId: string,
): Promise<DuplicateEntryResult> {

    return new Promise<DuplicateEntryResult>((resolve, reject) => {
        utils.checkUserCanModifyGame(entryId, userId, async (canModify, projectId) => {
            if (!canModify){
                reject('User does not have permission to modify game');
                return;
            }

            try{
                const newEntryId = await duplicateEntry(entryId, userId);
                resolve({ gameId: newEntryId });
            }
            catch(error){
                reject(String(error));
            }
        });
    });

}

function duplicateEntry(entryId: string, userId: string): Promise<string>{
    return getGamePartiallyDuplicatedEntry(entryId, userId)
    .then(request => {
        const queryMap = convertGameRequestDataToQueryMap(request)
        return cloneTemplateAndCreateNewRecord(entryId, queryMap);
    });
}

/**
 * @returns partial GameRequestData with empty objectives & guidance trackers.
 */
function getGamePartiallyDuplicatedEntry(entryId: string, userId: string): Promise<SaveGameRequestData>{
    return new Promise<SaveGameRequestData>((resolve, reject) => {
        getGame(entryId, (success, error, result) => {
            if (success){
                if (result == null){
                    reject('Original game entry while duplicating was null');
                    return;
                }

                const o = result.entry;
                const partialRequest: SaveGameRequestData = {
                    id: '-1',
                    name: o.name,
                    author_id: userId,
                    type: o.type,
                    is_template: o.is_template,
                    is_published: o.is_published,
                    parent_entry_id: o.parent_entry_id,
                    multi_user_limit: o.multi_user_limit,
                    level_switch: o.level_switch,
                    progress_bound_type: o.progress_bound_type,
                    rep_opt_objectives: o.rep_opt_objectives,
                    rep_opt_guidance_trg: o.rep_opt_guidance_trg,
                    rep_opt_student_usg: o.rep_opt_student_usg,
                    rep_opt_level_score: o.rep_opt_level_score,
                    rep_opt_level_time: o.rep_opt_level_time,
                    objectives: [],
                    trackers: [],
                };

                resolve(partialRequest);
            }
            else{
                l.logc(error, 'duplicateEntry()');
                reject('Could not find game entry with provided ID');
            }
        })
    })
}