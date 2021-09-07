import DAOCallback, { DAOTypedCallback } from './commons';
import * as sql from '../../util/connections/sql/sql_connection';
import { DateTime } from 'luxon';
import { GameSessionType, GameSessionState, GameSession } from '../../../../commons/src/models/session/index';
import { useIfTrueOrResolve } from './commons';
import * as sessionDAO from './session';
import * as groupsDAO from './group';
import * as l from '../../util/logger';

export interface TestSessionResult{
    sessionId: string | number,
    groupId: string | number
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
): Promise<TestSessionResult>{
    const timeNow = DateTime.now().toISO({includeOffset: false});
    let finalSessionId: string = '';
    let finalGroupId: string = '';

    // Check re-usable session exists?
    const result = sessionDAO.getSessionIdMatchingCriteria(
        userId,
        gameId,
        GameSessionType.test.toString(),
        GameSessionState.live.toString()
    ).then(existingSessionId => {
        // Create session if needed
        if (existingSessionId == undefined){
            return sessionDAO.createSession(
                GameSessionType.test, 
                GameSessionState.live, 
                Number.parseInt(gameId),
                timeNow, 
                undefined,
                [userId]
            );
        }
        else{
            // Equivalent of Promise.resolve(existingSessionId)
            return existingSessionId!
        }
    }).then(sessionId => {
        // Final session ID
        // Check re-usable session exists?
        finalSessionId = sessionId;
        return groupsDAO.getGroupIdMatchingCriteria(userId, 1);
    }).then(existingGroupId => {
        // Create group if needed
        if (existingGroupId == undefined){
            return groupsDAO.createGroup(
                'Test Session', 
                `Never ending session for testing game ID \\'${gameId}\\'`, 
                '', 
                undefined, 
                "1", 
                [userId]
            );
        }
        else{
            return existingGroupId!.toString();
        }
    }).then(groupId => {
        finalGroupId = groupId;
        return Promise.resolve({groupId: finalGroupId, sessionId: finalSessionId} as TestSessionResult);
    }).catch(error => {
        l.logc(error, 'createTestSession');
        return Promise.reject(error);
    });

    return result;
}


