import { isDevMode, Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerResponseUserTypes, AuthUserResponse, ServerResponseUserAuth, ServerResponseUserTypeInfo, ServerResponseLatestSession, ServerResponseGameObjectiveHistories } from 'src/app/models/user';
import { ServerResponseAllGameEntries, ServerResponseGameCreate, ServerResponseGameListing, ServerResponseGameProject, ServerResponseGameTestSession, ServerResponseGetGuidanceTrackers, ServerResponseGetObjectId, ServerResponseGetObjectives } from '../models/game/game';
import { ServerResponseSessionsByGroup } from '../models/session';
import { Md5 } from 'ts-md5/dist/md5';
import { ServerResponse, ServerResponsePlain } from '../models/common-models';
import { UserService } from './user.service';
import { tap, map } from 'rxjs/operators';
import { GameLevel } from '../../../../commons/src/models/game/levels';
import { UserGroup, UserGroupComposition, UserGroupMembership } from '../../../../commons/src/models/groups';
import { IGroupJoinEncryptedResult } from '../models/group/group';
import { GameSession, GameSessionState } from '../../../../commons/src/models/session';
import { UserAPIs } from './apis/user.api';
import { GameEntryAPIs } from './apis/game-entry.api';

/**
 * TODO: Response Code Handling Interceptor
 * https://angular.io/guide/http#intercepting-requests-and-responses
 */

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  static getBaseURL(): string {
    if (isDevMode())
      return "http://localhost:80";
    else
      return "https://edgeelp.lk";
  }

  static getSocketURL(): string {
    if (isDevMode())
      return "http://localhost:100";
    else
      return "https://edgeelp.lk:100";
  }

  private get serverBaseUrl(): string {
    return ApiService.getBaseURL();
  }

  private get apiBaseUrl(): string {
    return this.serverBaseUrl + "/api";
    // return 'https://d53c0891-ae64-4f74-ba67-542e3ba74c6f.mock.pstmn.io'; // postman mock server
  }

  public user: UserAPIs;
  public game: GameEntryAPIs;

  constructor(
    public http: HttpClient,
    public userService: UserService
  ) {
    this.user = new UserAPIs(this);
    this.game = new GameEntryAPIs(this);
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

  // MARK: Game Entry 

  // MARK END: Game Entry

  // MARK: Groups

  getGroupsForUser(): Observable<ServerResponse<any[]>> {
    const url = this.aurl('get-groups-for-user');
    return this.http.get<ServerResponse<any[]>>(url, {
      headers: this.getHeaders()
    })
  }

  createGroup(
    name: string,
    description: string,
    bannedUserCSV: string,
    userLimit: number | null,
    userIds: string[]
  ): Observable<ServerResponse<UserGroup>> {
    const url = this.aurl('create-group');
    const data = {
      name: name,
      description: description,
      bannedUserCSV: bannedUserCSV,
      link: '',
      limit: userLimit,
      insertUserIds: userIds
    };
    return this.http.post<ServerResponse<UserGroup>>(
      url, data, {
      headers: this.getHeaders()
    }
    )
  }

  getGroup(groupId: string): Observable<ServerResponse<UserGroup>> {
    const url = this.aurl('get-group');
    const query = { groupId: groupId };
    return this.http.get<ServerResponse<UserGroup>>(url, {
      params: query,
      headers: this.getHeaders()
    })
  }

  getGroupAnonymously(encryptedGroupId: string): Observable<ServerResponse<UserGroup>> {
    const url = this.aurl('get-group/anonymous');
    const query = { egi: encryptedGroupId };
    return this.http.get<ServerResponse<UserGroup>>(url, {
      params: query
    });
  }

  getGroupComposition(groupId: string): Observable<ServerResponse<UserGroupComposition[]>> {
    const url = this.aurl('get-group-composition');
    const query = { groupId: groupId };
    return this.http.get<ServerResponse<UserGroupComposition[]>>(url, {
      params: query,
      headers: this.getHeaders()
    });
  }

  joinGroupWith(encryptedGroupId: string): Observable<ServerResponse<IGroupJoinEncryptedResult>> {
    const url = this.aurl('groups-join-e');
    const body = {
      egi: encryptedGroupId
    };
    return this.http.post<ServerResponse<IGroupJoinEncryptedResult>>(url, body, {
      headers: this.getHeaders()
    });
  }

  deleteGroup(groupId: string): Observable<ServerResponsePlain> {
    const url = this.aurl('delete-group');
    const query = {
      groupId: groupId
    };
    return this.http.delete<ServerResponsePlain>(url, {
      params: query,
      headers: this.getHeaders()
    });
  }

  removeFromGroup(groupId: string, userId: string): Observable<ServerResponsePlain> {
    const url = this.aurl('leave-group');
    const query = {
      groupId: groupId,
      userId: userId
    };
    return this.http.delete<ServerResponsePlain>(url, {
      params: query,
      headers: this.getHeaders()
    });
  }

  // MARK END: Groups

  // MARK: Game Editing

  getNewObjectId(): Observable<ServerResponseGetObjectId> {
    const url = this.aurl('get-objectid');
    return this.http.get<ServerResponseGetObjectId>(url);
  }

  uploadGameResource(data: FormData, progressCallback: (progress: number) => void): Observable<ServerResponseGameProject> {
    const url = this.aurl('upload-resource');
    const uploadingRequest = new HttpRequest('POST', url, data, {
      headers: this.getHeaders(),
      reportProgress: true
    });
    const responseObserver = new Observable<ServerResponseGameProject>((subscriber) => {
      console.log('Starting upload...');

      this.http.request<ServerResponseGameProject>(uploadingRequest).subscribe({
        next: (event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              progressCallback(event.loaded / (event.total ?? 1))
              break;

            case HttpEventType.Response:
              let handled = false;

              // console.log('Upload Request Response:', JSON.stringify(event.body));
              if (event instanceof HttpResponse) {
                if (event.body != null) {
                  handled = true
                  subscriber.next(event.body);
                }
              }

              if (!handled)
                subscriber.error('Response received but expected type mismatched');
              break;

            default:
              // console.log('uploadGameResource', 'Ignoring event', JSON.stringify(event));
              break;
          }
        },
        error: (err) => {
          subscriber.error(err);
        }
      })
    });

    // console.log('uploadGameResource reached');

    return responseObserver;
  }

  deleteGameResource(gameId: string, resourceId: string): Observable<ServerResponsePlain> {
    const url = this.aurl(`delete-resource?gameId=${gameId}&resId=${resourceId}`);
    return this.http.delete<ServerResponsePlain>(url, {
      headers: this.getHeaders()
    });
  }

  saveLevel(gameId: string, projectId: string, levels: GameLevel[]): Observable<ServerResponsePlain> {
    const url = this.aurl(`save-level`);
    const body = {
      'gameId': gameId,
      'projectId': projectId,
      'levels': levels
    }
    return this.http.put<ServerResponsePlain>(url, body, { headers: this.getHeaders() });
  }

  getGameLibraryJSFile(type: string): Observable<string> {
    const url = this.aurl(`game-lib`);
    return this.http.get(url, {
      params: {
        type: type
      },
      responseType: 'text',
      headers: this.getHeaders()
    });
  }

  getGameTestSession(gameId: string): Observable<ServerResponseGameTestSession> {
    const url = this.aurl('create-test-session')
    const body = {
      gameId: gameId
    }
    return this.http.post<ServerResponseGameTestSession>(url, body, {
      headers: this.getHeaders()
    })
  }

  // MARK END: Game Editing

  // MARK: Play 

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

  // MARK END: Play

  // MARK: Session

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

  // MARK END: Session

  // MARK: Session API calls

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