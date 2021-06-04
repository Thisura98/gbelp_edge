import { isDevMode, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserService{

    constructor(
        private router: Router
    ){}

    setLoggedIn(userId: string, token: string){
        localStorage.setItem('uid', userId);
        localStorage.setItem('token', token);
    }

    clearCredentials(){
        localStorage.removeItem('uid');
        localStorage.removeItem('token');
    }

    /**
     * Return currently set userId and token
     */
    getUserAndToken(): {userId: string|null; token: string|null}{
        return {
            userId: localStorage.getItem('uid'),
            token: localStorage.getItem('token')
        };
    }

    getIsLoggedIn(): boolean{
        const res = this.getUserAndToken();
        if (res.userId != null && res.token != null)
            return true;
        else
            return false;
    }

    /**
     * Reidrect the user out of the system if they are logged out
     * @param outPath {string} Redirection Path
     */
    routeOutIfLoggedOut(outPath: string = '/'){
        if (!this.getIsLoggedIn()){
            this.router.navigate([outPath]);
        }
    }

}