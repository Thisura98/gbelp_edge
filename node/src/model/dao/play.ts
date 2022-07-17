import DAOCallback, { DAOTypedCallback } from './commons';
import * as sql from '../../util/connections/sql/sql_connection';
import { DateTime } from 'luxon';
import { GameSessionType, GameSessionState, GameSession } from '../../../../commons/src/models/session/index';
import { useIfTrueOrResolve } from './commons';
import * as sessionDAO from './session';
import * as groupsDAO from './group';
import * as gamesDAO from './games';
import * as l from '../../util/logger';
import { compileAndGetGameURL, getGameURLWithoutCompiling } from '../../game_compiler/index';

export interface TestSessionResult{
    sessionId: string | number,
    groupId: string | number,
    gameJS: string | string
}

/**
 * Creates a session and group with the user & game.
 * If a session and group exists, they are returned instead.
 * 
 * @returns 
 */
export function createTestSession(
    userId: string, 
    gameId: string,
    compileGame: boolean
): Promise<TestSessionResult>{
    const timeNow = DateTime.now().toISO({includeOffset: false});
    let finalSessionId: string = '';
    let finalGroupId: string = '';

    // Check re-usable session exists?
    const result2 = groupsDAO.getGroupConsitingOfOneUser(
        userId
    )
    .then(existingGroupId => {
        // Create group if needed
        if (existingGroupId == undefined){
            return groupsDAO.createGroup(
                'Test Group', 
                `Group for for testing game ID \\'${gameId}\\'`, 
                '', 
                undefined, 
                "1", 
                [userId]
            );
        }
        else{
            return existingGroupId!.toString();
        }
    })
    .then(groupId => {
        finalGroupId = groupId;
        return Promise.resolve(groupId);
    })
    .then(() => {
        return sessionDAO.getSessionIdMatchingCriteria(
            userId,
            gameId,
            GameSessionType.test.toString(),
            GameSessionState.live.toString()
        );
    })
    .then(existingSessionId => {
        // Create session if needed
        if (existingSessionId == undefined){
            return sessionDAO.createSession(
                GameSessionType.test, 
                GameSessionState.live, 
                Number.parseInt(gameId),
                Number.parseInt(finalGroupId),
                timeNow, 
                undefined,
                [userId]
            );
        }
        else{
            // Equivalent of Promise.resolve(existingSessionId)
            return existingSessionId!
        }
    })
    .then(sessionId => {
        // Final session ID
        // Check re-usable session exists?
        finalSessionId = sessionId;
        return new Promise<any>((resolve, reject) => {
            gamesDAO.getGame(gameId, (status, msg, result) => {
                if (status)
                    resolve(result);
                else
                    reject('Could not get game entry and project matching game ID: ' + gameId);
            });
        });
    })
    .then(gameEntryAndProject => {

        if (compileGame){
            return compileAndGetGameURL(
                gameEntryAndProject.entry,
                gameEntryAndProject.project,
            );
        }
        else{
            return Promise.resolve(
                getGameURLWithoutCompiling(
                    gameEntryAndProject.project
                )
            );
        }
    }).then(gameJS => {
        const result: TestSessionResult = {
            groupId: finalGroupId,
            sessionId: finalSessionId,
            gameJS: gameJS
        };
        return Promise.resolve(result);
    }).catch(error => {
        l.logc(error, 'createTestSession');
        return Promise.reject(error);
    });

    return result2;
}


