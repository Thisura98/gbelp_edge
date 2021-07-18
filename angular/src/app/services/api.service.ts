import { isDevMode, Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerResponseUserTypes, AuthUserResponse, ServerResponseUserAuth, ServerResponseUserTypeInfo, ServerResponseLatestSession, ServerResponseGameObjectiveHistories } from 'src/app/models/user';
import { ServerResponseAllGameEntries, ServerResponseGameCreate, ServerResponseGameEntry } from '../models/game';
import { Md5 } from 'ts-md5/dist/md5';
import { ServerResponsePlain } from '../models/common-models';
import { UserService } from './user.service';
import { tap } from 'rxjs/operators';

/**
 * TODO: Response Code Handling Interceptor
 * https://angular.io/guide/http#intercepting-requests-and-responses
 */

@Injectable({
    providedIn: 'root'
})
export class ApiService{

    private get apiBaseUrl(): String{
        if (isDevMode())
            return "http://localhost:80/api";
        else
            return "https://edgeelp.lk/api";
    }

    constructor(
        private http: HttpClient,
        private userService: UserService
    ){}


    /**
     * Create API url
     * @param suffix String
     * @returns 
     */
    private aurl(suffix: string): string{
        return `${this.apiBaseUrl}/${suffix}`;
    }

    private getHeaders(): HttpHeaders{
        const headerValues = this.userService.getUserAndToken();
        console.log("getHeaders:", headerValues);
        const h = new HttpHeaders({
            'uid': headerValues.user.userId!,
            'auth': headerValues.token!
        });
        return h;
    }

    // MARK: User API Calls

    refreshToken(): Observable<ServerResponsePlain>{
        const url = this.aurl('refresh-token');
        return this.http.get<ServerResponsePlain>(url, {
            headers: this.getHeaders()
        });
    }

    getUserTypes(): Observable<ServerResponseUserTypes>{
        const url = this.aurl('user-types');
        return this.http.get<ServerResponseUserTypes>(url, { responseType: 'json' });
    }

    createUser(username: string, email: string, typeId: number, pwHash: string): Observable<ServerResponseUserAuth>{
        const url = this.aurl('create-user');
        const data = {
            username: username,
            email: email, 
            typeId: typeId,
            ph: pwHash
        };
        return this.http.post<ServerResponseUserAuth>(url, data);
    }

    loginUser(email: string, pwHash: string): Observable<ServerResponseUserAuth>{
        console.log('loginUser called');
        const url = this.aurl('login');
        const data = { email: email, ph: pwHash }
        return this.http.post<ServerResponseUserAuth>(url, data);
    }

    getUserType(userId: string): Observable<ServerResponseUserTypeInfo>{
        const url = this.aurl('user-type-info');
        const data = { userId: userId };
        return this.http.get<ServerResponseUserTypeInfo>(url, {
            headers: this.getHeaders(),
            params: data
        });
    }

    // MARK END: User API calls

    // MARK: Game Entry 

    createGame(data: any): Observable<ServerResponseGameCreate>{
        const url = this.aurl('create-game');
        return this.http.post<ServerResponseGameCreate>(url, data, {
            headers: this.getHeaders()
        })
    }

    editGame(data: any): Observable<ServerResponsePlain>{
        const url = this.aurl('edit-game');
        return this.http.put<ServerResponsePlain>(url, data, {
            headers: this.getHeaders()
        })
    }

    deleteGame(gameId: string): Observable<ServerResponsePlain>{
        const url = this.aurl(`delete-game?gameId=${gameId}`);
        return this.http.delete<ServerResponsePlain>(url, {
            headers: this.getHeaders() 
        });
    }

    getGame(gameId: number | string): Observable<ServerResponseGameEntry>{
        const url = this.aurl('game-entry');
        return this.http.get<ServerResponseGameEntry>(url, {
            headers: this.getHeaders(),
            params: {id: gameId}
        });
    }

    getAllGames(): Observable<ServerResponseAllGameEntries>{
        const url = this.aurl('all-games');
        return this.http.get<ServerResponseAllGameEntries>(url, {
            headers: this.getHeaders()
        });
    }

    // MARK END: Game Entry

    // MARK: Game Editing

    uploadGameResource(data: FormData, progressCallback: (progress: number) => void): Observable<ServerResponsePlain>{
        const url = this.aurl('upload-resource');
        const uploadingRequest = new HttpRequest('POST', url, data, {
            headers: this.getHeaders(),
            reportProgress: true
        });
        console.log('Starting upload...');
        let observable = this.http.request(uploadingRequest).pipe(
            tap((event) => {
                console.log('event!');
                switch(event.type){
                    case HttpEventType.UploadProgress:
                        console.log('Progress Event:', event.loaded, (event.total ?? 1))
                        progressCallback(event.loaded / (event.total ?? 1))
                        break;

                    case HttpEventType.Response:
                        let handled = false;
                        if (event.body instanceof HttpResponse){
                            if (event.body as HttpResponse<ServerResponsePlain>){
                                handled = true;
                                // subscriber.next((event.body as HttpResponse<ServerResponsePlain>)?.body ?? undefined);
                            }
                        }
                        if (!handled){
                            console.log('uploadGameResource', 'Please Debug:', JSON.stringify(event));
                        }
                        break;

                    default:
                        console.log('uploadGameResource', 'Ignoring event', JSON.stringify(event));
                }
            },
            (error) => {
                console.log('error', JSON.stringify(error));
                //subscriber.error(error);
            })
        );

        observable.subscribe((e) => {
            console.log('Event Occured!', JSON.stringify(e));
        })

        return new Observable<ServerResponsePlain>();
        /*
        return new Observable<ServerResponsePlain>((subscriber) => {
            
        });*/
    }

    // MARK END: Game Editing

    // MARK: Session API calls

    // @DEMO
    getLatestSessionDetailsFor(userId: string): Observable<ServerResponseLatestSession>{
        const url = this.aurl('student/getLatestSession');
        const data = { userId: userId };
        return this.http.get<ServerResponseLatestSession>(url, {
            headers: this.getHeaders(),
            params: data
        });
    }

    // @DEMO
    getGameObjectiveHistories(userId: string, sessionId: string): Observable<ServerResponseGameObjectiveHistories>{
        const url = this.aurl('student/getObjectiveHistories');
        const data = { userId: userId, sessionId: sessionId };
        return this.http.get<ServerResponseGameObjectiveHistories>(url, {
            headers: this.getHeaders(),
            params: data
        });
    }

    clearHistories(userId: string): Observable<ServerResponsePlain>{
        const url = this.aurl('student/clearObjectiveHistories');
        const data = { userId: userId};
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