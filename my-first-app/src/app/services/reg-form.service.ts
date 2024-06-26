import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { User } from "../utils/types";

@Injectable({ providedIn: 'root' })
export class RegFormService {
    constructor(private _http: HttpClient) { };

    public createUser(user: User): Observable<User> {
        return this._http.post<User>(`${environment.apiUrl}users/`, user);
    }
}