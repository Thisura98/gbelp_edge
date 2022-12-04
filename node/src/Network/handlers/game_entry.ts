import { Express } from 'express';
import { aurl } from '../api_handler';
import * as gamesDAO from '../../model/dao/games';
import * as metricsDAO from '../../model/dao/metrics';
import { ResponseModel } from '../../model/models/common';

/**
 * Returns whether the requested param is true or false
 */
function checkBoolParam(params: any, paramName: string): boolean | null{
    if (!params)
        return null;

    const param = params[paramName];

    if (param == undefined || param == '' || param == null)
        return null;

    if (param == 0 || param == '0' || param == false)
        return false;

    if (param == 1 || param == '1' || param == true)
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

    app.put(aurl('clone-game'), (req, res) => {
        res.json(new ResponseModel(false, 200, 'Cloning process is not implemented yet'));
    })

    app.get(aurl('game-listing'), (req, res) => {
        const gameId = req.query.id as string;
        gamesDAO.getGame(gameId, (status, msg, result) => {
            res.json(new ResponseModel(status, 200, msg, result));
        });
    });

    app.get(aurl('all-games'), (req, res) => {
        const isTemplate = checkBoolParam(req.query, 'is_template');
        const isPublished = checkBoolParam(req.query, 'is_published');
        const author = req.query.author as string;
        gamesDAO.getAllGames(isTemplate, isPublished, author, (status, msg, result) => {
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