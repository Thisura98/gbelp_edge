import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ServerResponsePlain } from "src/app/models/common-models";
import { ServerResponseReportGuidanceTrackerHitCounts, ServerResponseReportGuidanceTrackerTimeGraph, ServerResponseReportObjectivesBreakdown, ServerResponseReportObjectivesByCompletion, ServerResponseReportObjectivesByTimeGraph, ServerResponseReportUsageBreakdown, ServerResponseReportUsageGraph } from "src/app/models/reports";
import { APIBase } from "./base.api";

export class ReportsAPIs implements APIBase {

  http!: HttpClient;
  aurl!: (endpoint: string) => string;
  getHeaders!: () => HttpHeaders;

  constructor() { }

  private getReport<T>(sessionId: string, endpoint: string): Observable<T> {
    const data = { sessionId: sessionId };
    return this.http.get<T>(this.aurl(endpoint), {
      params: data,
      headers: this.getHeaders()
    })
  }

  usageReportGraph(sessionId: string): Observable<ServerResponseReportUsageGraph> {
    return this.getReport(sessionId, 'reports/usage/graph');
  }

  usageReportBreakdown(
    sessionId: string,
    startTimestampSeconds: string | undefined,
    endTimestampSeconds: string | undefined
  ): Observable<ServerResponseReportUsageBreakdown> {
    const data = {
      sessionId: sessionId,
      startTimestamp: startTimestampSeconds ?? '',
      endTimestamp: endTimestampSeconds ?? ''
    };
    return this.http.get<ServerResponseReportUsageBreakdown>(this.aurl('reports/usage/breakdown'), {
      params: data,
      headers: this.getHeaders()
    })
  }

  usageObjectivesByTimeGraph(sessionId: string): Observable<ServerResponseReportObjectivesByTimeGraph> {
    return this.getReport(sessionId, 'reports/objective/timegraph');
  }

  usageObjectivesByProgressGraph(sessionId: string): Observable<ServerResponseReportObjectivesByCompletion> {
    return this.getReport(sessionId, 'reports/objective/completiongraph');
  }

  usageObjectivesBreakdown(sessionId: string): Observable<ServerResponseReportObjectivesBreakdown> {
    return this.getReport(sessionId, 'reports/objective/breakdown');
  }

  usageGuidanceTrackerTimeGraph(sessionId: string): Observable<ServerResponseReportGuidanceTrackerTimeGraph>{
    return this.getReport(sessionId, 'reports/guidance/timegraph');
  }

  usageGuidanceTrackerTriggerRates(sessionId: string): Observable<ServerResponseReportGuidanceTrackerHitCounts>{
    return this.getReport(sessionId, 'reports/guidance/tracker_hits_graph');
  }
}