import { ReportGraphDataUserGuidanceTrackerHitCounts, ReportGraphDataUserGuidanceTrackerTimeGraph } from "../../../../../commons/src/models/reports/user.guidancetracker";
import { GameSessionUserObjectiveBreakdown, ReportGraphDataUserObjectiveCompletionProgress, ReportGraphDataUserObjectiveProgressByTime } from "../../../../../commons/src/models/reports/user.objective";
import { GameSessionUserUsageBreakdown, ReportGraphDataUserUsage } from "../../../../../commons/src/models/reports/user.usage";
import { ServerResponse } from "../common-models";

export interface ServerResponseReportUsageGraph extends ServerResponse<ReportGraphDataUserUsage>{}

export interface ServerResponseReportUsageBreakdown extends ServerResponse<GameSessionUserUsageBreakdown[]>{}

export interface ServerResponseReportObjectivesByTimeGraph extends ServerResponse<ReportGraphDataUserObjectiveProgressByTime>{}

export interface ServerResponseReportObjectivesByCompletion extends ServerResponse<ReportGraphDataUserObjectiveCompletionProgress>{};

export interface ServerResponseReportObjectivesBreakdown extends ServerResponse<GameSessionUserObjectiveBreakdown[]>{};

export interface ServerResponseReportGuidanceTrackerTimeGraph extends ServerResponse<ReportGraphDataUserGuidanceTrackerTimeGraph>{};

export interface ServerResponseReportGuidanceTrackerHitCounts extends ServerResponse<ReportGraphDataUserGuidanceTrackerHitCounts>{};