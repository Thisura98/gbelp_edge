import express from 'express';
import multer from 'multer';
import * as usersDAO from '../model/dao/users';
import * as gamesDAO from '../model/dao/games';
import * as levelsDAO from '../model/dao/levels';
import * as statusCodes from './status_codes';
import * as pc from '../util/parseconfig';
import * as l from '../util/logger';
import * as utils from '../util/utils';
import { ResponseModel, ResponsePlainModel } from '../model/models/common';

const config = pc.parseConfig('config.json');
const apiPrefix = 'api'

const multerDiskWriteConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, config.fs_res_path);
    },
    /*
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }*/
})

const upload = multer({storage: multerDiskWriteConfig});

/**
 * Handler for API calls
 * @param {express.Express} app Express.js App
 */
export function handle(app: express.Express){
    // Authorization Middleware (faux) for API calls
    app.use(`/${apiPrefix}`, apiAuthorizationMiddleware);

    // MARK: User

    app.post(aurl('test'), (req, res) => {
        res.json(new ResponseModel(true, 200, "", null))
    });

    app.get(aurl('refresh-token'), (req, res) => {
        // If Auth headers are ok this will be the response for /api/refresh-token.
        // Otherwise, see apiAuthorizationMiddleware function.
        res.json(new ResponseModel(true, 200, "", null));
    });

    app.get(aurl('user-types'), (req, res) => {
        usersDAO.getDisplayUserTypes((results) => {
            res.json(new ResponseModel(true, 200, "Success", results));
        })
    })

    app.post(aurl('create-user'), (req, res) => {
        usersDAO.createUser(req.body.username, req.body.email, req.body.typeId, req.body.ph, (status, msg, userAndToken) => {
            res.json(new ResponseModel(status, 200, msg, userAndToken));
        });
    });

    app.post(aurl('login'), (req, res) => {
        usersDAO.loginUser(req.body.email, req.body.ph, (status, msg, userAndToken) => {
            res.json(new ResponseModel(status, 200, msg, userAndToken));
        });
    });

    app.get(aurl('user-type-info'), (req, res) => {
        usersDAO.getUserType(req.query.userId! as string, (status, msg, objOrNull) => {
            res.json(new ResponseModel(status, 200, msg, objOrNull));
        })
    });

    // MARK: Game Entry

    app.post(aurl('create-game'), (req, res) => {
        gamesDAO.createGame(req.body, (status, msg, result) => {
            res.json(new ResponseModel(status, 200, msg, result));
        });
    });

    app.put(aurl('edit-game'), (req, res) => {
        gamesDAO.editGame(req.body, (status, msg, result) => {
            res.json(new ResponseModel(status, 200, msg, result));
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
        gamesDAO.getAllGames((status, msg, result) => {
            res.json(new ResponseModel(status, 200, msg, result));
        });
    });

    // MARK: Game Editing

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

    // Fallbacks

    app.post(`/${apiPrefix}/*`, (req, res) => {
        res.redirect('/');
    });

    app.post(`/${apiPrefix}`, (req, res) => {
        res.redirect('/');
    });
}

/**
 * Authorize API requests with (auth + uid) headers
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export function apiAuthorizationMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const routeURL = req.originalUrl;
    const safeURLs = ['create-user', 'user-types', 'login'].map((v, i, m) => aurl(v));
    if (safeURLs.find((url, _, __) => url == routeURL)){
        next();
    }
    else{
        const authOk = req.rawHeaders.includes('auth');
        const userIdOk = req.rawHeaders.includes('uid');
        if (authOk && userIdOk){
            const auth = req.header('auth');
            const userId = req.header('uid');
            usersDAO.isTokenValidForUser(userId!, auth!, (lookupResult) => {
                switch(lookupResult){
                case 2:
                    next()
                    break;
                case -2:
                    res.sendStatus(statusCodes.errorCodes.tokenExpired)
                    break;
                case -1:
                    res.sendStatus(statusCodes.errorCodes.authIdNoMatch);
                    break;
                default:
                    res.sendStatus(statusCodes.errorCodes.serverError);
                }
            });
        }
        else{
            res.sendStatus(statusCodes.errorCodes.missingAuth);
        }
    }
}

/**
 * Returns the full API URL 
 * @param {string} $suffix 
 */
function aurl(suffix: string){
    return `/${apiPrefix}/${suffix}`;
}