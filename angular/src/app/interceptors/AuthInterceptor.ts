import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpResponseBase } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, filter } from "rxjs/operators";
import { UserService } from "../services/user.service";
import { DialogService } from "../services/dialog.service";
import { Router } from "@angular/router";

let notAuthenticatedShown: boolean = false

export const AuthInterceptorStatusCodes = {
    missingAuth: 400,
    authIdNoMatch: 406,
    missingCapabilities: 403,
    tokenExpired: 401,
    tokenRenewFailed: 409
};

@Injectable()
/**
 * If API response returns user not authenticated,
 * logout and show error message.
 */
export class AuthInterceptor implements HttpInterceptor{

    constructor(
        private userService: UserService,
        private dialogService: DialogService,
        private router: Router
    ){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /**
         * Using next.handle, then returning it,
         * caused duplicated requests.
         */
        /*
        let observable = next.handle(req);
        observable.subscribe({
            next: e => {},
            error: e => this.handleAuthError(e),
        })
        return observable;*/
        
        return next.handle(req).pipe(tap({
            next: e => {},
            error: e => { this.handleAuthError(e) } 
        }))
    }

    private handleAuthError(response: HttpEvent<any>){
        /**
         * Error responses inhert from HttpResponseBase
         * Normal HttpResponse<T> inherits from this as well.
         * 
         * However the two are not mutually exclusive. Use HttpResponseBase casting.
         */
        if (response instanceof HttpResponseBase){
            const code = AuthInterceptorStatusCodes;
            if (response.status == code.authIdNoMatch || 
                response.status == code.missingAuth || 
                response.status == code.tokenExpired
            ){
                if (notAuthenticatedShown)
                    return;

                notAuthenticatedShown = true;
                this.userService.clearCredentials();
                this.dialogService.showDismissable(
                    'User not Authenticated!', 
                    'Please login a try again', 
                    () => {
                        notAuthenticatedShown = false;
                        this.router.navigate([''], {replaceUrl: true});
                })
            }
            else if (
                response.status == code.tokenRenewFailed
            ){
                if (!notAuthenticatedShown){
                    notAuthenticatedShown = true;
                    this.userService.clearCredentials();
                    this.dialogService.showDismissable(
                        'User token renew failed!', 
                        'Please login a try again', 
                        () => {
                            notAuthenticatedShown = false;
                            this.router.navigate([''], {replaceUrl: true});
                    });
                }
            }
        }
    }

}