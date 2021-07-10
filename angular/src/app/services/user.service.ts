import { isDevMode, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserService{

    constructor(
        private router: Router
    ){}

    setLoggedIn(data: any){
        localStorage.setItem('uid', data.user_id);
        localStorage.setItem('uname', data.user_name);
        localStorage.setItem('utypename', data.user_type_name);
        localStorage.setItem('token', data.token);
    }

    clearCredentials(){
        localStorage.removeItem('uid');
        localStorage.removeItem('uname');
        localStorage.removeItem('utypename');
        localStorage.removeItem('token');
    }

    /**
     * Return currently set userId and token
     */
    getUserAndToken(): {user: {userId: string|null, userName: string|null, userTypeName: string|null}; token: string|null}{
        return {
            user: {
                userId: localStorage.getItem('uid')!,
                userName: localStorage.getItem('uname')!,
                userTypeName: localStorage.getItem('utypename')!
            },
            token: localStorage.getItem('token')
        };
    }

    getIsLoggedIn(): boolean{
        const res = this.getUserAndToken();
        if (res.user.userId != null && res.token != null)
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