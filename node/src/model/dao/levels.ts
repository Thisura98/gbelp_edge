import * as mongo from '../../Util/connections/mongo/mongo_connection';
import * as utils from '../../Util/utils';
import { ObjectId } from 'mongodb';

import DAOCallback from './commons';
import { GameLevel } from '../../../../commons/src/models/game/levels';

export function saveLevels(gameId: string, projectId: string, userId: string, levels: GameLevel[], callback: DAOCallback){

    utils.checkUserCanModifyGame(gameId, userId, (canModify, projectId) => {

        if (!canModify){
            callback(false, 'User not allowed to modify levels', null);
            return;
        }

        let finalLevels: GameLevel[] = [];

        for (const lvl of levels){
            if (lvl._id == null){
                lvl._id = (new ObjectId()).toHexString();
            }
            finalLevels.push(lvl);
        }

        mongo.Collections.getGameProjects().updateOne({_id: mongo.toObjectId(projectId)}, {$set: {levels: finalLevels}}, (err, result) => {
            if (err){
                callback(false, 'Failed to save levels', err!.message);
                return;
            }
    
            callback(true, 'Saving successful!', null);
        })

    });

}