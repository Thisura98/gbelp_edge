import { isDevMode, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserType, UserTypeNames } from '../../../../commons/src/models/user';

export interface IUserData{
    user_id: string;
    user_name: string;
    user_type_name: string;
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService{

    constructor(
        private router: Router
    ){}

    setLoggedIn(data: IUserData){
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

    /**
     * Returns the navigation link safe user type, if 
     * user is logged in.
     */
    getNavSafeUserType(): string | null{
        const user = this.getUserAndToken().user;
        if (user.userTypeName == null)
            return null;
        
        const userType = user.userTypeName.toLowerCase();
        
        if (userType == UserTypeNames.admin || userType == UserTypeNames.creator)
            return UserTypeNames.teacher;
        return userType;
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