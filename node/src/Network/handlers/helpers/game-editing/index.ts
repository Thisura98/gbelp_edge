import { getNewObjectId } from "../../../../../../commons/src/models/common";
import { CompileStatus } from "../../../../../../commons/src/models/game/compile";
import * as utils from '../../../../util/utils';
import * as gamesDAO from '../../../../model/dao/games';
import { compileAndGetGameURL } from "../../../../game_compiler";
import { ResponseModel } from "../../../../model/models/common";
import { GenerateScene } from "../../../../game_compiler/generators/scene";

export function getObjectIds(countParam: any): Promise<ResponseModel>{
    return new Promise<ResponseModel>((resolve, reject) => {

        let objectIdCount = 1;
        let objectIdList: string[] = [];

        if (countParam != undefined && countParam != ''){
            try{
                objectIdCount = Number.parseInt(countParam as string);
            }
            catch(err){
                console.log("get-objectid", err);
                resolve(new ResponseModel(false, 200, 'Unable to create object ID', null));
            }
        }

        for (let i = 0; i < objectIdCount; i++){
            objectIdList.push(getNewObjectId());
        }

        const msg = `Created ${objectIdList.length} MongoDB Object ID(s)`;
        resolve(new ResponseModel(true, 200, msg, objectIdList));
    });
}

export function compileGame(userId: any, gameId: any): Promise<ResponseModel>{
    return new Promise<ResponseModel>((resolve, reject) => {
        utils.checkUserCanModifyGame(gameId, userId, (canModify) => {
            if (!canModify){
                resolve(new ResponseModel(false, 200, 'User not allowed to compile game', null));
                return;
            }
    
            gamesDAO.getGame(gameId, (status, msg, listing) => {
                if (!status || listing == null){
                    resolve(new ResponseModel(false, 200, 'Could not find game listing', null));
                    return;
                }
    
                compileAndGetGameURL(listing.entry, listing.project).then(_ => {
                    const status = new CompileStatus([]);
                    resolve(new ResponseModel(true, 200, 'Compiled successfully!', status));
                })
                .catch(err => {
                    const status = new CompileStatus([err]);
                    console.log("Game Compilation Error = ", err);
                    resolve(new ResponseModel(false, 200, 'Game compilation error', status));
                })
            });
        });
    });
}

export function getGameScriptTemplate(gameId: string, levelId: string, userId: string): Promise<ResponseModel>{
    
    return new Promise<ResponseModel>((resolve, reject) => {
        utils.checkUserCanModifyGame(gameId, userId, (status, projectId) => {
            if (!status){
                resolve(new ResponseModel(false, 200, 'User not allowed to request game script', null));
                return;
            }

            gamesDAO.getGame(gameId, (status, msg, listing) => {
                if (!status){
                    resolve(new ResponseModel(false, 200, 'Could not find game listing', null));
                    return;
                }

                const level = listing?.project.levels.find(lvl => lvl._id == levelId);

                if (level == undefined){
                    resolve(new ResponseModel(false, 200, `Level with ID "${levelId} not found"`, null));
                    return;
                }

                GenerateScene.generateForScripting(level).then(result => {
                    const scene = result.code;
                    resolve(new ResponseModel(true, 200, 'Successfully created scene script', scene));
                });

            });
        });
    });

}