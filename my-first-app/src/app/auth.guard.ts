import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard {
    
    constructor(
        private _authService: AuthService,
        private _router: Router) {}

    public canActivate(): boolean {

        const isAuth: boolean = this._authService.isAuthenticated();

        if (isAuth) {

            return true;

        } else {

            this._router.navigate(['/login']);
            return false;
        }
    }  
}

@Injectable({providedIn: 'root'})
export class NoAuthGuard {

    constructor(
        private _authService: AuthService,
        private _router: Router) {}

    public canActivate(): boolean {

        const isNotAuth: boolean = !this._authService.isAuthenticated();

        if (isNotAuth) {

            return true;

        } else {

            this._router.navigate(['/posts']);
            return false;
        }
    }  
}

@Injectable({providedIn: 'root'})
export class HomeGuard {

    constructor(
        private _authService: AuthService,
        private _router: Router) {}

    public canActivate(): boolean {

        const isAuth: boolean = this._authService.isAuthenticated();

        if (isAuth) {

            this._router.navigate(['/posts']);
            return false;

        } else {

            this._router.navigate(['/login']);
            return false;
        }
    }  
}