import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ServerResponse, ServerResponsePlain } from "src/app/models/common-models";
import { ServerResponseSessionsByGroup } from "src/app/models/session";
import { GameSession, GameSessionState } from "../../../../../commons/src/models/session";
import { APIBase } from "./base.api";

export class SessionAPIs implements APIBase{

  http!: HttpClient;
  aurl!: (endpoint: string) => string;
  getHeaders!: () => HttpHeaders;

  constructor(){}

  getSession(sessionId: string): Observable<ServerResponse<GameSession>> {
    const url = this.aurl('get-session');
    return this.http.get<ServerResponse<GameSession>>(url, {
      params: {
        sessionId: sessionId
      },
      headers: this.getHeaders()
    });
  }

  getSessionsByGroup(groupId: string, stateFilters: GameSessionState[]): Observable<ServerResponseSessionsByGroup> {
    const url = this.aurl('session/sessions-by-group');
    return this.http.get<ServerResponseSessionsByGroup>(url, {
      params: {
        groupId: groupId,
        states: stateFilters.map(v => v.toString())
      },
      headers: this.getHeaders()
    })
  }

  
}