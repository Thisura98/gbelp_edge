import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpResponseBase } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { UserService } from "../services/user.service";
import { DialogService } from "../services/dialog.service";
import { Router } from "@angular/router";

@Injectable()
/**
 * If API response returns user not authenticated,
 * logout and show error message.
 */
export class AuthInterceptor implements HttpInterceptor{

    readonly statusCodes = {
        missingAuth: 400,
        authIdNoMatch: 406,
        missingCapabilities: 403,
        tokenExpired: 401
    }

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
            if (response.status == this.statusCodes.authIdNoMatch || 
                response.status == this.statusCodes.missingAuth || 
                response.status == this.statusCodes.tokenExpired
            ){
                this.userService.clearCredentials();
                this.dialogService.showDismissable('User not Authenticated', 'Please login a try again', () => {
                    this.router.navigate([''], {replaceUrl: true});
                })
            }
        }
    }

}