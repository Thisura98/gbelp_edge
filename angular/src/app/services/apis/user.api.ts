import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ServerResponsePlain } from "src/app/models/common-models";
import { ServerResponseUserAuth, ServerResponseUserTypeInfo, ServerResponseUserTypes } from "src/app/models/user";
import { APIBase } from "./base.api";

export class UserAPIs implements APIBase {

    http!: HttpClient;
    aurl!: (endpoint: string) => string;
    getHeaders!: () => HttpHeaders;

    constructor(){}

    refreshToken(): Observable<ServerResponsePlain>{
        const url = this.aurl('refresh-token');
        return this.http.get<ServerResponsePlain>(url, {
            headers: this.getHeaders()
        });
    }

    getUserTypes(): Observable<ServerResponseUserTypes> {
        const url = this.aurl('user-types');
        return this.http.get<ServerResponseUserTypes>(url, { responseType: 'json' });
    }

    createUser(username: string, email: string, typeId: number, pwHash: string): Observable<ServerResponseUserAuth> {
        const url = this.aurl('create-user');
        const data = {
            username: username,
            email: email,
            typeId: typeId,
            ph: pwHash
        };
        return this.http.post<ServerResponseUserAuth>(url, data);
    }

    loginUser(email: string, pwHash: string): Observable<ServerResponseUserAuth> {
        const url = this.aurl('login');
        const data = { email: email, ph: pwHash }
        return this.http.post<ServerResponseUserAuth>(url, data);
    }

    getUserType(userId: string): Observable<ServerResponseUserTypeInfo> {
        const url = this.aurl('user-type-info');
        const data = { userId: userId };
        return this.http.get<ServerResponseUserTypeInfo>(url, {
            headers: this.getHeaders(),
            params: data
        });
    }
}