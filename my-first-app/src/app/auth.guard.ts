import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard {
    
    constructor(
        private authService: AuthService,
        private router: Router
        ) {}

    canActivate() {

        const isAuth: boolean = this.authService.isAuthenticated();

        if (isAuth) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}