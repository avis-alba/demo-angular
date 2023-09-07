import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {
    private isAuth = false;
    public isAuthDynamic = new BehaviorSubject(false);

    login() {
        this.isAuth = true;
        this.isAuthDynamic.next(true);
    }

    logout() {
        this.isAuth = false;
        this.isAuthDynamic.next(false);
    }

    isAuthenticated(): boolean {
        return this.isAuth;
    }
}