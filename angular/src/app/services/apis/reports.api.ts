import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ServerResponsePlain } from "src/app/models/common-models";
import { ServerResponseReportObjectivesByCompletion, ServerResponseReportObjectivesByTimeGraph, ServerResponseReportUsageBreakdown, ServerResponseReportUsageGraph } from "src/app/models/reports";
import { APIBase } from "./base.api";

export class ReportsAPIs implements APIBase {

    http!: HttpClient;
    aurl!: (endpoint: string) => string;
    getHeaders!: () => HttpHeaders;

    constructor(){}

    usageReportGraph(sessionId: string): Observable<ServerResponseReportUsageGraph>{
      const data = { sessionId: sessionId };
      return this.http.get<ServerResponseReportUsageGraph>(this.aurl('reports/usage/graph'), {
        params: data,
        headers: this.getHeaders()
      })
    }

    usageReportBreakdown(
      sessionId: string,
      startTimestampSeconds: string | undefined,
      endTimestampSeconds: string | undefined
    ): Observable<ServerResponseReportUsageBreakdown>{
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

    usageObjectivesByTimeGraph(sessionId: string): Observable<ServerResponseReportObjectivesByTimeGraph>{
      const data = { sessionId: sessionId };
      return this.http.get<ServerResponseReportObjectivesByTimeGraph>(this.aurl('reports/objective/timegraph'), {
        params: data,
        headers: this.getHeaders()
      })
    }

    usageObjectivesByProgressGraph(sessionId: string): Observable<ServerResponseReportObjectivesByCompletion>{
      const data = { sessionId: sessionId };
      return this.http.get<ServerResponseReportObjectivesByCompletion>(this.aurl('reports/objective/completiongraph'), {
        params: data,
        headers: this.getHeaders()
      })
    }
}