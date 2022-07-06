import { Express } from 'express';
import { aurl } from '../api_handler';
import * as gamesDAO from '../../model/dao/games';
import * as metricsDAO from '../../model/dao/metrics';
import { ResponseModel } from '../../model/models/common';

/**
 * Returns whether the current request is for a Template.
 * 
 * This is because Games and Templates are both handled by the same 
 * API & UIs.
 */
function checkIsTemplate(params: any): boolean{
    if (!params)
        return false;

    if (params.is_template == undefined || params.is_template == '')
        return false;

    if (params.is_template == 1 || params.is_template == '1' || params.is_template == true)
        return true;

    return false;
}

export function handlerGameEntry(app: Express){
    app.post(aurl('create-game'), (req, res) => {
        gamesDAO.createGame(req.body, (status, msg, result) => {
            res.json(new ResponseModel(status, 200, msg, result));
        });
    });

    app.put(aurl('save-game'), (req, res) => {
        gamesDAO.saveGame(req.body, (status, msg, result) => {
            res.json(new ResponseModel(status, 200, msg, result));
            // res.json(new ResponseModel(false, 200, 'This is a fake error', null));
        })
    });

    app.delete(aurl('delete-game'), (req, res) => {
        const userId = req.header('uid') ?? '';
        const gameId = req.query.gameId! as string
        gamesDAO.deleteGame(gameId, userId, (status, msg, _) => {
            res.json(new ResponseModel(status, 200, msg));
        });
    });

    app.get(aurl('game-listing'), (req, res) => {
        const gameId = req.query.id as string;
        gamesDAO.getGame(gameId, (status, msg, result) => {
            res.json(new ResponseModel(status, 200, msg, result));
        });
    });

    app.get(aurl('all-games'), (req, res) => {
        let isTemplate = checkIsTemplate(req.query);
        gamesDAO.getAllGames(isTemplate, (status, msg, result) => {
            res.json(new ResponseModel(status, 200, msg, result));
        });
    });

    app.get(aurl('game-objectives'), (req, res) => {
        const gameId = req.query.gameId as string;
        metricsDAO.getObjectives(gameId, (status, msg, objects) => {
            res.json(new ResponseModel(status, 200, msg, objects));
        })
    });

    app.get(aurl('game-guidance-trackers'), (req, res) => {
        const gameId = req.query.gameId as string;
        metricsDAO.getGuidanceTrackers(gameId, (status, msg, objects) => {
            res.json(new ResponseModel(status, 200, msg, objects));
        })
    });
}