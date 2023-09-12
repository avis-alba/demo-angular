import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";

export interface User {
    name: string;
    lastName: string;
    email: string;
    birthDate: Date;
    password: string;
}

@Injectable({providedIn: 'root'})
export class RegFormService {
    constructor(private _http: HttpClient) {};

    public createUser(user: User): Observable<User> {
        return this._http.post<User>(`${environment.apiUrl}users/`, user);
    }
}