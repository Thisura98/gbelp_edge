import * as l from '../../util/logger';
import * as sql from '../../util/connections/sql/sql_connection';
import * as mongo from '../../util/connections/mongo/mongo_connection';
import * as utils from '../../util/utils';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';
import * as mimeParse from '../../util/mime_parse';
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

export function saveLevel(gameId: string, projectId: string, userId: string, levels: GameLevel[], callback: DAOCallback){

    // console.log('projectId', projectId, `levels: ${JSON.stringify(levels)}`, "saveLevel");
    let finalLevels: any[] = [];

    for (const lvl of levels){
        const item: any = lvl;
        if (lvl._id == null){
            item._id = (new ObjectId()).toHexString();
        }
        finalLevels.push(item);
    }

    // console.log('New Levels:', JSON.stringify(finalLevels));

    mongo.Collections.getGameProjects().updateOne({_id: mongo.toObjectId(projectId)}, {$set: {levels: finalLevels}}, (err, result) => {
        if (err){
            callback(false, 'Failed to save levels', err!.message);
            return;
        }

        callback(true, 'Saving successful!', null);
    })

}