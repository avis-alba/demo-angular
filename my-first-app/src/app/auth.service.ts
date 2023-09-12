import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {

    private _isAuth = false;
    public isAuthDynamic = new BehaviorSubject(false);

    public getLogin(cookies: string): string {
    
        const cookiesArr = cookies.split(';');
        let login: string = '';
        
        for (let cookie of cookiesArr) {
          
          const cookieSplit = cookie.split('=');
          
          if (cookieSplit[0] === 'login') {
    
            login = cookieSplit[1];
          } 
        }
    
        return login;
    }

    public login(login: string): void {

        document.cookie = `login=${login};samesite=lax`;
        this._isAuth = true;
        this.isAuthDynamic.next(this._isAuth);
    }

    public logout(): void {

        document.cookie = 'login=;samesite=lax;max-age=0';
        this._isAuth = false;
        this.isAuthDynamic.next(this._isAuth);
    }

    public isAuthenticated(): boolean {

        return this._isAuth;
    }
}