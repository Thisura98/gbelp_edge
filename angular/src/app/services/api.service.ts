import { isDevMode, Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerResponseLatestSession, ServerResponseGameObjectiveHistories } from 'src/app/models/user';
import { ServerResponsePlain } from '../models/common-models';
import { UserService } from './user.service';
import { UserAPIs } from './apis/user.api';
import { GameEntryAPIs } from './apis/game-entry.api';
import { GroupAPIs } from './apis/group.api';
import { APIBase } from './apis/base.api';
import { GameEditingAPIs } from './apis/game-editing.api';
import { SessionAPIs } from './apis/session.api';
import { PlayAPIs } from './apis/play.api';
import { ReportsAPIs } from './apis/reports.api';
import { environment } from 'src/environments/environment';

/**
 * TODO: Response Code Handling Interceptor
 * https://angular.io/guide/http#intercepting-requests-and-responses
 */

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  static getBaseURL(): string {
    if (isDevMode() || environment.staging)
      return "http://localhost:80";
    else
      return "https://edgeelp.online";
  }

  static getSocketURL(): string {
    if (isDevMode() || environment.staging)
      return "http://localhost:100";
    else
      return "https://edgeelp.online:100";
  }

  private get serverBaseUrl(): string {
    return ApiService.getBaseURL();
  }

  private get apiBaseUrl(): string {
    return this.serverBaseUrl + "/api";
    // return 'https://d53c0891-ae64-4f74-ba67-542e3ba74c6f.mock.pstmn.io'; // postman mock server
  }

  // MARK: API Namespaces

  public user: UserAPIs;
  public game: GameEntryAPIs;
  public group: GroupAPIs;
  /**
   * Game Editing APIs
   */
  public editor: GameEditingAPIs;
  public session: SessionAPIs;
  public play: PlayAPIs;
  public reports: ReportsAPIs;

  // MARK END

  constructor(
    public http: HttpClient,
    public userService: UserService
  ) {
    this.user = this.prepareAPI(new UserAPIs);
    this.game = this.prepareAPI(new GameEntryAPIs);
    this.group = this.prepareAPI(new GroupAPIs);
    this.editor = this.prepareAPI(new GameEditingAPIs);
    this.session = this.prepareAPI(new SessionAPIs);
    this.play = this.prepareAPI(new PlayAPIs);
    this.reports = this.prepareAPI(new ReportsAPIs);
  }

  /**
   * APIs are separated into files in "apis" folder.
   * To reference the main API service methods (without DI)
   * we use this method.
   * 
   * @param api An API to prepare
   * @returns 
   */
  private prepareAPI<T extends APIBase>(api: T): T{
    api.aurl = this.aurl.bind(this);
    api.getHeaders = this.getHeaders.bind(this);
    api.http = this.http;
    return api;
  }

  /**
   * Create API url
   * @param suffix String
   * @returns 
   */
  public aurl(suffix: string): string {
    return `${this.apiBaseUrl}/${suffix}`;
  }

  public getHeaders(): HttpHeaders {
    const headerValues = this.userService.getUserAndToken();
    // console.log("getHeaders:", headerValues);
    const h = new HttpHeaders({
      'uid': headerValues.user.userId!,
      'auth': headerValues.token!
    });
    return h;
  }

  getFileSystemBaseURL(): string {
    return this.serverBaseUrl;
  }

  // @DEMO
  getLatestSessionDetailsFor(userId: string): Observable<ServerResponseLatestSession> {
    const url = this.aurl('student/getLatestSession');
    const data = { userId: userId };
    return this.http.get<ServerResponseLatestSession>(url, {
      headers: this.getHeaders(),
      params: data
    });
  }

  // @DEMO
  getGameObjectiveHistories(userId: string, sessionId: string): Observable<ServerResponseGameObjectiveHistories> {
    const url = this.aurl('student/getObjectiveHistories');
    const data = { userId: userId, sessionId: sessionId };
    return this.http.get<ServerResponseGameObjectiveHistories>(url, {
      headers: this.getHeaders(),
      params: data
    });
  }

  // @DEMO
  clearHistories(userId: string): Observable<ServerResponsePlain> {
    const url = this.aurl('student/clearObjectiveHistories');
    const data = { userId: userId };
    return this.http.delete<ServerResponseGameObjectiveHistories>(url, {
      headers: this.getHeaders(),
      params: data
    });
  }

  // MARK: Private Methods

  /*
  private getEventMessage(event: HttpEvent<any>) {
      switch (event.type) {
        case HttpEventType.Sent:
          return `Uploading file "${file.name}" of size ${file.size}.`;
    
        case HttpEventType.UploadProgress:
          // Compute and show the % done:
          const percentDone = Math.round(100 * event.loaded / (event.total ?? 0));
          return `File "${file.name}" is ${percentDone}% uploaded.`;
    
        case HttpEventType.Response:
          return `File "${file.name}" was completely uploaded!`;
    
        default:
          return `File "${file.name}" surprising upload event: ${event.type}.`;
      }
  }*/

}