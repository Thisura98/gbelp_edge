import { Express } from "express";
import { aurl } from "../api_handler";
import { ResponseModel } from "../../model/models/common";
import * as pc from '../../util/parseconfig';
import * as path from 'path';
import * as gamesDAO from '../../model/dao/games';
import * as levelsDAO from '../../model/dao/levels';
import { getMultiPlayerLibPath, getSinglePlayerLibPath } from '../../model/gamelib';
import * as l from '../../util/logger';
import multer from 'multer';
import { getNewObjectId } from "../../../../commons/src/models/common";
import * as utils from '../../util/utils';
import { compileAndGetGameURL } from "../../game_compiler";
import { CompileStatus } from '../../../../commons/src/models/game/compile';

const config = pc.parseConfig('config.json');

const multerDiskWriteConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        const mimetype = file.mimetype;
        if (mimetype.includes('audio') || mimetype.includes('sound'))
            callback(null, config.fs_res_path_sound);
        else
            callback(null, config.fs_res_path_image);
    },
    filename: (req, file, callback) => {
        const extension = path.extname(file.originalname);
        const filename = Date.now() + path.extname(file.originalname);
        callback(null, filename);
    }
})

const upload = multer({storage: multerDiskWriteConfig});

export function handlerGameEditing(app: Express){
    // Get a new mongodb object id
    app.get(aurl('get-objectid'), (req, res) => {
        let objectIdCount = 1;
        let objectIdList: string[] = [];

        if (req.query.count != undefined && req.query.count != ''){
            try{
                objectIdCount = Number.parseInt(req.query.count as string);
            }
            catch(err){
                console.log("get-objectid", err);
                res.json(new ResponseModel(false, 200, 'Unable to create object ID', null));
            }
        }

        for (let i = 0; i < objectIdCount; i++){
            objectIdList.push(getNewObjectId());
        }

        res.json(new ResponseModel(true, 200, `Created ${objectIdList.length} MongoDB Object ID(s)`, objectIdList));
    });

    // README: https://www.npmjs.com/package/multer
    app.post(aurl('upload-resource'), upload.single('uploaddata'), (req, res) => {
        // console.log('upload-resource-body', JSON.stringify(req.file), JSON.stringify(req.body));
        gamesDAO.uploadGameResource(req.body, req.file!, (status, msg, result) => {
            res.json(new ResponseModel(status, 200, msg, result));
        })
    });

    app.delete(aurl('delete-resource'), (req, res) => {
        const userId = req.header('uid')! as string;
        const gameId = req.query.gameId! as string;
        const resourceId = req.query.resId! as string;
        gamesDAO.deleteGameResource(gameId, resourceId, userId, (status, msg, result) => {
            res.json(new ResponseModel(status, 200, msg, result));
        });
    });

    app.put(aurl('save-level'), (req, res) => {
        const userId = req.header('uid')! as string;
        const gameId = req.body.gameId! as string;
        const projectId = req.body.projectId! as string;
        const levels = req.body.levels! as any;
        levelsDAO.saveLevel(gameId, projectId, userId, levels, (status, msg, result) => {
            res.json(new ResponseModel(status, 200, msg, result))
        });
    })

    app.post(aurl('compile-game'), (req, res) => {
        const userId = req.header('uid') as string;
        const gameId = req.body.gameId as string;

        utils.checkUserCanModifyGame(gameId, userId, (canModify) => {
            if (!canModify){
                res.send(new ResponseModel(false, 200, 'User not allowed to compile game', null));
                return;
            }

            gamesDAO.getGame(gameId, (status, msg, listing) => {
                if (!status || listing == null){
                    res.send(new ResponseModel(false, 200, msg ?? "Could not find game listing", null));
                    return;
                }

                compileAndGetGameURL(listing.entry, listing.project).then(url => {
                    const status = new CompileStatus([]);
                    res.send(new ResponseModel(true, 200, "Compiled successfully!", status));
                })
                .catch(err => {
                    const status = new CompileStatus([err]);
                    res.send(new ResponseModel(false, 200, "Game compilation error", status));
                })
            });
        });
    });

    app.get(aurl('game-lib'), (req, res) => {
        const userId = req.header('uid')! as string;
        const scriptType = req.query.type as string;
        let gameLibPath: string = '';

        if (scriptType == '1')
            gameLibPath = getSinglePlayerLibPath();
        else if (scriptType == '2')
            gameLibPath = getMultiPlayerLibPath();

        res.type('text/javascript').sendFile(gameLibPath, (err) => {
            if (err){
                l.logc(`Could not locate game lib file at "${gameLibPath}"`, 'game-lib')
                l.logc(err.message, 'game-lib');
            }
        });
    });
}