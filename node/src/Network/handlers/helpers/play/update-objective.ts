import * as sessionDAO from '../../../../model/dao/session';
import * as metricsDAO from '../../../../model/dao/metrics';
import { isEmptyParam } from '../../../../util/utils';

export function updateObjectiveProgress(
    nonce: string | undefined,
    sessionId: string | undefined,
    objectiveId: string | undefined,
    newProgress: string | undefined,
    uid: string | undefined
): Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
        if (isEmptyParam(uid)){
            reject('User ID invalid');
            return;
        }

        if (isEmptyParam(sessionId)){
            reject('Session ID invalid');
            return;
        }

        if (isEmptyParam(nonce) || isEmptyParam(objectiveId) || isEmptyParam(newProgress)){
            reject('Required parameter empty');
            return;
        }

        sessionDAO.checkUserBelongsToSession(uid!, sessionId!)
        .then(belongs => {
            if (!belongs){
                return Promise.reject('User does not belong to session');
            }
            return Promise.resolve();
        })
        .then(() => {
            const parsed = Number.parseFloat(newProgress!);
            if (isNaN(parsed))
                return Promise.reject('Progress is not a number');
            else
                return parsed;
        })
        .then(progress => {
            return metricsDAO.recordSessionObjectiveProgress(
                sessionId!, objectiveId!, uid!, nonce!, progress!
            );
        })
        .then(status => {
            resolve(status)
        })
        .catch(error => {
            reject(error)
        });
    });
}