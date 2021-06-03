import { isDevMode, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerResponseUserTypes, AuthUserResponse, ServerResponseUserAuth, ServerResponseUserTypeInfo } from 'src/app/models/user';
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

    // MARK: User API Calls

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
            'uid': headerValues.userId!,
            'auth': headerValues.token!
        });
        return h;
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
        const url = this.aurl('login');
        const data = { email: email, ph: pwHash }
        return this.http.post<ServerResponseUserAuth>(url, data);
    }

    getUserType(userId: string): Observable<ServerResponseUserTypeInfo>{
        const url = this.aurl('user-type-info');
        const data = { userId: userId };
        console.log("getUserType Request Headers", this.getHeaders());
        return this.http.get<ServerResponseUserTypeInfo>(url, {
            headers: this.getHeaders(),
            params: data
        });
    }

    // MARK END: User API calls

}