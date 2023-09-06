import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";

export interface LoginData {
    email: string;
    password: string;
}

@Injectable({providedIn: 'root'})
export class AuthFormService {
    constructor(private http: HttpClient) {};

    login(loginData: LoginData) {
        return this.http.post<LoginData>('https://jsonplaceholder.typicode.com/users/', loginData);
    }
}