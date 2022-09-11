import { Express } from "express";
import { aurl } from '../api_handler';
import { isEmptyParam } from '../../util/utils';
import { ResponseModel } from '../../model/models/common';
import * as sessionDAO from '../../model/dao/session';
import * as usageReportDAO from '../../model/dao/reports/usage';
import * as objectiveReportDAO from '../../model/dao/reports/objective';
import * as guidanceTrackerReportDAO from '../../model/dao/reports/guidancetracker';
import { processUsage } from "../../model/processors/usage.processor";
import { processObjectivesByCompletion, processObjectivesByTime } from "../../model/processors/objectives.processor";
import { processGuidanceTrackerHitCountsGraph, processGuidanceTrackerTimeGraph } from "../../model/processors/guidancetracker.processor";

export function handlerReports(app: Express){

    const urlReportsAny                 = 'reports/*';
    const urlUsageReportGraph           = 'reports/usage/graph';
    const urlUsageReportBrakdown        = 'reports/usage/breakdown';
    const urlObjectiveTimeGraph         = 'reports/objective/timegraph';
    const urlObjectiveCompletionGraph   = 'reports/objective/completiongraph';
    const urlObjectiveBreakdown         = 'reports/objective/breakdown';
    const urlGuidanceTimeGraph          = 'reports/guidance/timegraph';
    const urlGuidanceTrackerHitsGraph   = 'reports/guidance/tracker_hits_graph';
    const urlGuidanceBreakdown          = 'reports/guidance/breakdown';

    // Check for missing sessionId, userId, then
    // Check user permission in session
    app.use(aurl(urlReportsAny), async (req, res, next) => {
        const sessionId = req.query.sessionId as string;
        const userId = req.header('uid')!;

        if (isEmptyParam(sessionId)){
            res.send(new ResponseModel(false, 200, 'Session ID missing from Request'));
            return;
        }

        if (isEmptyParam(userId)){
            res.send(new ResponseModel(false, 200, 'User ID missing from request'));
            return;
        }

        sessionDAO.checkUserBelongsToSession(userId, sessionId)
        .then(belongs => {
            if (belongs){
                next();
            }
            else{
                res.send(new ResponseModel(false, 200, 'User does not belong to session'));
            }
        })
        .catch(err => {
            res.send(new ResponseModel(false, 200, err));
        })

    })

    // Student/User usage report graph
    app.get(aurl(urlUsageReportGraph), (req, res) => {
        const sessionId = req.query.sessionId as string;
        
        usageReportDAO.getUserUsageGroupedByNonce(sessionId)
        .then(usageData => {
            return processUsage(usageData);
        })
        .then(output => {
            res.send(new ResponseModel(true, 200, 'Processed usage data', output));
        })
        .catch(err => {
            res.send(new ResponseModel(false, 200, err));
        })
    });

    // Student/User usage breakdown
    app.get(aurl(urlUsageReportBrakdown), (req, res) => {
        const sessionId = req.query.sessionId as string;
        const startTimestamp = req.query.startTimestamp as string || '';
        const endTimestamp = req.query.endTimestamp as string || '';

        usageReportDAO.getUserUsageBreakdown(sessionId, startTimestamp, endTimestamp)
        .then(result => {
            res.send(new ResponseModel(true, 200, 'User usage breakdown in seconds', result));
        })
        .catch(err => {
            res.send(new ResponseModel(false, 200, err));
        })
    });

    // Objective Progress by Time
    app.get(aurl(urlObjectiveTimeGraph), (req, res) => {
        const sessionId = req.query.sessionId as string;

        objectiveReportDAO.getUserObjectiveProgress(sessionId)
        .then(results => {
            return processObjectivesByTime(results);
        })
        .then(data => {
            res.send(new ResponseModel(true, 200, 'Processed objectives data by time', data));
        })
        .catch(err => {
            res.send(new ResponseModel(false, 200, err));
        })
    });

    // Objective Progress by Completion %
    app.get(aurl(urlObjectiveCompletionGraph), (req, res) => {
        const sessionId = req.query.sessionId as string;

        objectiveReportDAO.getUserObjectiveProgressByCompletion(sessionId)
        .then(results => {
            return processObjectivesByCompletion(results);
        })
        .then(data => {
            res.send(new ResponseModel(true, 200, 'Processed objectives data by Completion', data));
        })
        .catch(err => {
            res.send(new ResponseModel(false, 200, err));
        })
    });

    // Objective Breakdown
    app.get(aurl(urlObjectiveBreakdown), (req, res) => {
        const sessionId = req.query.sessionId as string;

        objectiveReportDAO.getUserObjectiveBreakdown(sessionId)
        .then(data => {
            res.send(new ResponseModel(true, 200, 'Processed objective breakdown', data));
        })
        .catch(err => {
            res.send(new ResponseModel(false, 200, err));
        })
    });

    // Guidance Tracker value by Time
    app.get(aurl(urlGuidanceTimeGraph), (req, res) => {
        const sessionId = req.query.sessionId as string;

        guidanceTrackerReportDAO.getUserGuidanceValues(sessionId)
        .then(results => {
            return processGuidanceTrackerTimeGraph(results);
        })
        .then(data => {
            res.send(new ResponseModel(true, 200, 'Processed guidance tracker value over time', data));
        })
        .catch(err => {
            res.send(new ResponseModel(false, 200, err));
        })
    });

    // Guidance Tracker trigger hits (no. of times triggered) graph
    app.get(aurl(urlGuidanceTrackerHitsGraph), (req, res) => {
        const sessionId = req.query.sessionId as string;

        guidanceTrackerReportDAO.getTrackerHitCounts(sessionId)
        .then(results => {
            return processGuidanceTrackerHitCountsGraph(results);
        })
        .then(data => {
            res.send(new ResponseModel(true, 200, 'Processed guidance tracker hit counts (no. of times triggered)', data));
        })
        .catch(err => {
            res.send(new ResponseModel(false, 200, err));
        })
    });

    // Guidance Tracker trigger hits (no. of times triggered) graph
    app.get(aurl(urlGuidanceBreakdown), (req, res) => {
        const sessionId = req.query.sessionId as string;

        guidanceTrackerReportDAO.getTrackerBreakdown(sessionId)
        .then(data => {
            res.send(new ResponseModel(true, 200, 'Processed guidance tracker hit counts (no. of times triggered)', data));
        })
        .catch(err => {
            res.send(new ResponseModel(false, 200, err));
        })
    });
}