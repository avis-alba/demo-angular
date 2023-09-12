import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";

export interface LoginData {
    email: string;
    password: string;
}

@Injectable({providedIn: 'root'})
export class AuthFormService {
    constructor(private http: HttpClient) {};

    public login(loginData: LoginData): Observable<LoginData> {
        return this.http.post<LoginData>(`${environment.apiUrl}users/`, loginData);
    }
}