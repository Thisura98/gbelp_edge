import * as l from '../../Util/logger';
import * as sql from '../../Util/connections/sql/sql_connection';
import * as mongo from '../../Util/connections/mongo/mongo_connection';
import * as utils from '../../Util/utils';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';
import * as mimeParse from '../../Util/mime_parse';
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { GameResourceType } from '../../../../commons/src/models/game/resources';
import { GameType } from '../../../../commons/src/models/game/game';
import * as LevelInitData from '../../../../commons/src/models/game/levels/initdata';
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