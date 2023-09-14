import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";
import { LoginData } from "../utils/types";

@Injectable({providedIn: 'root'})
export class AuthFormService {
    constructor(private _http: HttpClient) {};

    public login(loginData: LoginData): Observable<LoginData> {
        return this._http.post<LoginData>(`${environment.apiUrl}users/`, loginData);
    }
}