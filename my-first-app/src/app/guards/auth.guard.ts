import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

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