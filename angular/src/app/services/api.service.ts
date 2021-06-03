import { isDevMode, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerResponseUserTypes, AuthUserResponse, ServerResponseUserCreate } from 'src/app/models/user';
import { Md5 } from 'ts-md5/dist/md5';
import { ServerResponsePlain } from '../models/common-models';

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

    constructor(private http: HttpClient){}

    /**
     * Create API url
     * @param suffix String
     * @returns 
     */
    private aurl(suffix: string): string{
        return `${this.apiBaseUrl}/${suffix}`;
    }

    getUserTypes(): Observable<ServerResponseUserTypes>{
        const url = this.aurl('user-types');
        return this.http.get<ServerResponseUserTypes>(url, { responseType: 'json' });
    }

    createUser(username: string, email: string, typeId: number, pwHash: string): Observable<ServerResponseUserCreate>{
        const url = this.aurl('create-user');
        const data = {
            username: username,
            email: email, 
            typeId: typeId,
            ph: pwHash
        };
        return this.http.post<ServerResponseUserCreate>(url, data);
    }

}