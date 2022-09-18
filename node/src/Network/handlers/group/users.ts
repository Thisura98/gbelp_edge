import { Express } from "express";
import { aurl } from '../../api_handler';
import { isEmptyParam } from '../../../util/utils';
import { ResponseModel } from '../../../model/models/common';

import * as groupsDAO from '../../../model/dao/group';
import * as groupUsersDAO from '../../../model/dao/group/users';
import * as l from '../../../util/logger';
import { StatusCodes } from "../../../../../commons/src/constants";

export function handlerGroupUsers(app: Express){

    app.get(aurl('group-users'), (req, res) => {
        const fn = 'group-users';
        const groupId = req.query.groupId as string;
        const userId = req.header('uid') as string;
        let statusCode = StatusCodes.success;

        groupsDAO.checkUserMembership(groupId, userId)
        .then(isMember => {
            if (!isMember){
                statusCode = StatusCodes.membershipError;
                return Promise.reject('User is not member of requested group ' + groupId);
            }

            return Promise.resolve();
        })
        .then(() => {
            l.logc("getGroupUsers", "handlerGroupUsers");
            return groupUsersDAO.getGroupUsers(groupId);
        })
        .then(memberData => {
            res.send(new ResponseModel(
                true, statusCode, 'Successfully retrieved group members', memberData
            ));
        })
        .catch(err => {
            l.logc(err, fn);
            res.send(new ResponseModel(false, statusCode, err));
        })
    });
}