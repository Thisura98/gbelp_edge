import { GameSessionUserUsageBreakdown, ReportGraphDataUserUsage } from "../../../../../commons/src/models/reports/user.usage";
import { ServerResponse } from "../common-models";

export interface ServerResponseReportUsageGraph extends ServerResponse<ReportGraphDataUserUsage>{}

export interface ServerResponseReportUsageBreakdown extends ServerResponse<GameSessionUserUsageBreakdown[]>{}