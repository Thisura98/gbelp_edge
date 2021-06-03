import { isDevMode, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService{

    constructor(){}

    setLoggedIn(userId: string, token: string){
        localStorage.setItem('uid', userId);
        localStorage.setItem('token', token);
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
        if (res.userId && res.token)
            return true;
        else
            return false;
    }

}