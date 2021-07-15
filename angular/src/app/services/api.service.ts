import { isDevMode, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerResponseUserTypes, AuthUserResponse, ServerResponseUserAuth, ServerResponseUserTypeInfo, ServerResponseLatestSession, ServerResponseGameObjectiveHistories } from 'src/app/models/user';
import { ServerResponseAllGameEntries, ServerResponseGameCreate, ServerResponseGameEntry } from '../models/game';
import { Md5 } from 'ts-md5/dist/md5';
import { ServerResponsePlain } from '../models/common-models';
import { UserService } from './user.service';

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

}