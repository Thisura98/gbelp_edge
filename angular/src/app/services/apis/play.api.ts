import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ServerResponse, ServerResponsePlain } from "src/app/models/common-models";
import { IGroupJoinEncryptedResult } from "src/app/models/group/group";
import { UserGroup, UserGroupComposition } from "../../../../../commons/src/models/groups";
import { APIBase } from "./base.api";

export class PlayAPIs implements APIBase{

  http!: HttpClient;
  aurl!: (endpoint: string) => string;
  getHeaders!: () => HttpHeaders;

  constructor(){}

  getCompiledGameJS(sessionId: string): Observable<string> {
    const url = this.aurl('play/get-game-js');
    return this.http.get(url, {
      params: {
        sessionId: sessionId
      },
      responseType: 'text',
      headers: this.getHeaders()
    })
  }

  updateObjective(
    nonce: string,
    sessionId: string,
    objectiveId: string,
    progress: string,
  ): Observable<ServerResponsePlain>{
    const url = this.aurl('play/update-objective');
    const data = {
      nonce: nonce,
      sessionId: sessionId,
      objectiveId: objectiveId,
      progress: progress
    };
    return this.http.post<ServerResponsePlain>(url, data, {
      headers: this.getHeaders()
    });
  }

  updateGuidance(
    nonce: string,
    sessionId: string,
    trackerId: string,
    progress: string,
  ): Observable<ServerResponsePlain>{
    const url = this.aurl('play/update-guidance');
    const data = {
      nonce: nonce,
      sessionId: sessionId,
      trackerId: trackerId,
      newProgress: progress
    };
    return this.http.post<ServerResponsePlain>(url, data, {
      headers: this.getHeaders()
    });
  }

}