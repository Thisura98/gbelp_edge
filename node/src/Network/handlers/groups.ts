import { Express } from 'express';
import { aurl } from '../api_handler';
import * as groupsDAO from '../../model/dao/group';
import * as playDAO from '../../model/dao/play';
import * as l from '../../util/logger';
import { ResponseModel } from '../../model/models/common';

export function handlerGroups(app: Express){

    app.post(aurl('create-group'), (req, res) => {
        const name = req.body.name;
        const desc = req.body.description;
        const bannedCSV = req.body.bannedUserCSV;
        const link = req.body.link;
        const limit = req.body.limit;
        const userIds = req.body.insertUserIds;
        groupsDAO.createGroup(name, desc, bannedCSV, link, limit, userIds).then((groupId) => {
            return groupsDAO.getGroup(groupId);
        }).then((group) => {
            res.send(new ResponseModel(true, 200, 'Created and retrieved group', group));
        }).catch((error) => {
            res.send(new ResponseModel(false, 200, error));
        });
    });

    app.get(aurl('get-groups-for-user'), (req, res) => {
        const userId = req.header('uid')!;
        groupsDAO.getGroupsOfUser(
            userId
        ).then(group => {
            res.send(new ResponseModel(true, 200, 'Successfully received groups', group));
        }).catch(error => {
            res.send(new ResponseModel(false, 200, error));
        });
    });

    app.get(aurl('get-group-composition'), (req, res) => {
        const userId = req.header('uid')!;
        const groupId = req.query.groupId as string;
        let membershipCheck = true;

        groupsDAO.checkUserMembership(
            groupId, userId
        )
        .then(isMember => {
            if (!isMember){
                membershipCheck = false;
                return Promise.reject('User is not member of requested group ' + groupId);
            }

            return groupsDAO.getGroupComposition(groupId);
        })
        .then(composition => {
            const msg = 'Processed group composition for ' + groupId;
            res.send(new ResponseModel(true, 200, msg, composition));
        })
        .catch(err => {
            const code = membershipCheck ? 200 : 201;
            l.logc(err, 'get-group-composition');
            res.send(new ResponseModel(false, code, err));
        })
    });

    app.get(aurl('get-group'), (req, res) => {
        const userId = req.header('uid') ?? "";
        const groupId = req.query.groupId as string;
        let membershipCheck = true;

        groupsDAO.checkUserMembership(
            groupId, userId
        ).then(isMember => {
            if (!isMember){
                membershipCheck = false;
                return Promise.reject('User is not member of requested group ' + groupId);
            }
            return groupsDAO.getGroup(groupId);
        }).then(group => {
            // OK!
            res.send(new ResponseModel(true, 200, `Successfully retrieved group id ${groupId}`, group));
        }).catch(err => {
            const code = membershipCheck ? 200 : 201;
            res.send(new ResponseModel(false, code, err));
        })
    });

    app.delete(aurl('delete-group'), (req, res) => {
        // todo
        const uid = req.header('uid') as string;
        const groupId = req.query.groupId as string;
        const userId = req.query.userId as string;

        groupsDAO.removeUserFromGroup(
            uid, userId, groupId
        )
        .then(status => {
            if (!status)
                Promise.reject(`Could not remove user ${userId} from the group`);

            res.send(new ResponseModel(true, 200, 'Removing Successful'));
        })
        .catch(err => {
            l.logc(err, 'delete-group');

            res.send(new ResponseModel(false, 200, err));
        });
    })

}