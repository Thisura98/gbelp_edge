import { isDevMode, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthUserResponse } from 'src/app/models/user';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
    providedIn: 'root'
})
export class ApiService{

    private get apiBaseUrl(): String{
        if (isDevMode())
            return "http://localhost:4200/api";
        else
            return "https://edgeelp.lk/api";
    }

    constructor(private http: HttpClient){}

    getAuthToken(username: string, password: string): Observable<AuthUserResponse>{
        const url = `${this.apiBaseUrl}/auth-token`;
        const hashedPW = Md5.hashStr(password);
        const params = { 
            'uname': username,
            'pw': hashedPW
        };
        return this.http.get<AuthUserResponse>(url, {
            params: params
        })
    }

}