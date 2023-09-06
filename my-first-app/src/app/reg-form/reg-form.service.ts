import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "../../environments/environment.development";

export interface User {
    name: string;
    lastName: string;
    email: string;
    birthDate: Date;
    password: string;
}

@Injectable({providedIn: 'root'})
export class RegFormService {
    constructor(private http: HttpClient) {};

    createUser(user: User) {
        return this.http.post<User>(`${environment.apiUrl}users/`, user);
    }
}