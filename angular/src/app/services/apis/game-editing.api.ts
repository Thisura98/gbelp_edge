import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { ServerResponsePlain } from "src/app/models/common-models";
import { ServerResponseAllGameEntries, ServerResponseGameCompiling, ServerResponseGameCreate, ServerResponseGameListing, ServerResponseGameProject, ServerResponseGameTestSession, ServerResponseGetGuidanceTrackers, ServerResponseGetObjectId, ServerResponseGetObjectives } from "src/app/models/game/game";
import { GameLevel } from "../../../../../commons/src/models/game/levels";
import { APIBase } from "./base.api";

export class GameEditingAPIs implements APIBase {

  http!: HttpClient;
  aurl!: (endpoint: string) => string;
  getHeaders!: () => HttpHeaders;

  constructor(){}

  getNewObjectIds(count: number = 1): Observable<ServerResponseGetObjectId> {
    const url = this.aurl('get-objectid');
    return this.http.get<ServerResponseGetObjectId>(url, {
      params: {
        count: count
      }
    });
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

  // To be deprecated
  getGameTestSession(gameId: string, compileGame: boolean): Observable<ServerResponseGameTestSession> {
    const url = this.aurl('create-test-session')
    const body = {
      gameId: gameId,
      compile: compileGame
    }
    return this.http.post<ServerResponseGameTestSession>(url, body, {
      headers: this.getHeaders()
    })
  }

  compileGame(gameId: string): Observable<ServerResponseGameCompiling> {
    const url = this.aurl('compile-game');
    const body = {
      gameId: gameId
    };
    return this.http.post<ServerResponseGameCompiling>(url, body, {
      headers: this.getHeaders()
    });
  }

}