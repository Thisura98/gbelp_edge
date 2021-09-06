import DAOCallback, { DAOTypedCallback } from './commons';
import * as sql from '../../util/connections/sql/sql_connection';
import { DateTime } from 'luxon';
import { GameSessionType, GameSessionState, GameSession } from '../../../../commons/src/models/session/index';
import { useIfTrueOrResolve } from './commons';
import * as sessionDAO from './session';

export interface TestSessionResult{
    sessionId: string | number,
    groupId: string | number
}

/**
 * Creates a session and group with the user & game.
 * If a session and group exists, they are returned instead.
 * 
 * @returns {}
 */
export function createTestSession(
    userId: string, 
    gameId: string,
    callback: DAOTypedCallback<TestSessionResult>
){
    const cSessions = sql.columns.gameSessions;
    const cSessionsMems = sql.columns.gameSessionMembers;
    const cGroup = sql.columns.userGroup;
    const cGroupMems = sql.columns.userGroupMembership;

    const qExistingSession = `SELECT G.${cSessions.sessionId} 
    FROM \`${sql.tables.gameSessions}\` G 
    INNER JOIN \`${sql.tables.gameSessionMembers}\` M 
    ON G.${cSessions.sessionId} = M.${cSessionsMems.sessionId}
    WHERE M.${cSessionsMems.userId} = ${userId}
    AND G.${cSessions.typeId} = ${GameSessionType.test} 
    AND G.${cSessions.state} = ${GameSessionState.live}
    LIMIT 1;
    `;

    const qExistingGroup = `SELECT G.${cGroup.groupId} 
    FROM \`${sql.tables.userGroup}\` G 
    INNER JOIN \`${sql.tables.userGroupMembership}\` M ON G.${cGroup.groupId} = M.${cGroupMems.groupId}
    WHERE M.${cGroupMems.userId} = ${userId}
    ORDER BY M.${cGroupMems.lastUpdated} DESC
    LIMIT 1
    `;

    const now = DateTime.now().toISO({includeOffset:false});

    sql.getPool()!.query(qExistingSession, (error, result) => {
        let promises: Promise<any>[] = [];

        useIfTrueOrResolve<string>(
            result.length > 0, 
            result[0][cSessions.sessionId], 
            sessionDAO.createSession(GameSessionType.test, GameSessionState.live, now, undefined)
        ).then((sessionId) => {



        })

    });
}


