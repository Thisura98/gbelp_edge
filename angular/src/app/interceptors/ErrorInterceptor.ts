import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpResponseBase } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, filter } from "rxjs/operators";
import { AuthInterceptorStatusCodes } from "./AuthInterceptor";
import { DialogService } from "../services/dialog.service";
import { Router } from "@angular/router";
import { ServerResponsePlain } from "../models/common-models";

const AuthErrorCodes = [
    AuthInterceptorStatusCodes.authIdNoMatch,
    AuthInterceptorStatusCodes.missingAuth,
    AuthInterceptorStatusCodes.missingCapabilities,
    AuthInterceptorStatusCodes.tokenExpired,
]

@Injectable()
/**
 * Handles error messages not handled by Auth Interceptor.
 * Checks the response status code, and not the response body.
 */
export class ErrorInterceptor implements HttpInterceptor{

    constructor(
        private dialogService: DialogService,
        private router: Router
    ){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(tap({
            next: e => { this.handleAuthError(e) },
            error: e => { this.handleAuthError(e) } 
        }))
    }

    private handleAuthError(response: HttpEvent<any>){
        if (response instanceof HttpResponseBase){
            if (AuthErrorCodes.includes(response.status))
                return;

            // console.log(response);

            if (response.status >= 300){
                if (response instanceof HttpResponse){
                    const castBody: ServerResponsePlain | undefined = response.body as ServerResponsePlain;
                    if (castBody.success)
                        return;

                    if (castBody?.description != undefined){
                        this.dialogService.showDismissable('Generic Error', castBody!.description);
                    }
                }
                else{
                    this.dialogService.showDismissable(
                        'Unknown Error', 
                        'An unknown error occured with the system. Status code = ' + response.status.toString()
                    );
                }
            }
        }
    }

}