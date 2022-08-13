import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ServerResponsePlain } from "src/app/models/common-models";
import { ServerResponseReportGraphDataUsage } from "src/app/models/reports";
import { ServerResponseUserAuth, ServerResponseUserTypeInfo, ServerResponseUserTypes } from "src/app/models/user";
import { APIBase } from "./base.api";

export class ReportsAPIs implements APIBase {

    http!: HttpClient;
    aurl!: (endpoint: string) => string;
    getHeaders!: () => HttpHeaders;

    constructor(){}

    usageReports(sessionId: string): Observable<ServerResponseReportGraphDataUsage>{
      const data = { sessionId: sessionId };
      return this.http.get<ServerResponseReportGraphDataUsage>(this.aurl('reports/usage'), {
        params: data,
        headers: this.getHeaders()
      })
    }
}