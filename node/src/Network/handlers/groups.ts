import { Express } from 'express';
import { aurl } from '../api_handler';
import * as groupsDAO from '../../model/dao/group';
import * as playDAO from '../../model/dao/play';
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

    app.get(aurl('get-groups'), (req, res) => {
        const userId = req.header('uid')!;
        groupsDAO.getGroupsOfUser(
            userId
        ).then(group => {
            res.send(new ResponseModel(true, 200, 'Successfully received groups', group));
        }).catch(error => {
            res.send(new ResponseModel(false, 200, error));
        });
    });

}