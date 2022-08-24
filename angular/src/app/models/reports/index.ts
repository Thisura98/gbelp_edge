import { GameSessionUserObjectiveBreakdown, ReportGraphDataUserObjectiveCompletionProgress, ReportGraphDataUserObjectiveProgressByTime } from "../../../../../commons/src/models/reports/user.objective";
import { GameSessionUserUsageBreakdown, ReportGraphDataUserUsage } from "../../../../../commons/src/models/reports/user.usage";
import { ServerResponse } from "../common-models";

export interface ServerResponseReportUsageGraph extends ServerResponse<ReportGraphDataUserUsage>{}

export interface ServerResponseReportUsageBreakdown extends ServerResponse<GameSessionUserUsageBreakdown[]>{}

export interface ServerResponseReportObjectivesByTimeGraph extends ServerResponse<ReportGraphDataUserObjectiveProgressByTime>{}

export interface ServerResponseReportObjectivesByCompletion extends ServerResponse<ReportGraphDataUserObjectiveCompletionProgress>{};

export interface ServerResponseReportObjectivesBreakdown extends ServerResponse<GameSessionUserObjectiveBreakdown[]>{};