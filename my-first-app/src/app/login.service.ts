import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export const AUTH: {login: boolean} = {login: false};

@Injectable({providedIn: 'root'})
export class LoginService {
    constructor() {};

    public login(auth: boolean): Observable<boolean> {

        return new Observable<boolean>(observer => {
            observer.next(auth);
        });
    }
}



