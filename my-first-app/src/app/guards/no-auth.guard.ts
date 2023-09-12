import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

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
