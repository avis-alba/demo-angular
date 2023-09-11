import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, delay, throwError } from "rxjs";
import { environment } from "../../environments/environment.development";

export interface Post {
    id: number;
    title: string;
    body: string;
}

@Injectable({providedIn: 'root'})
export class PostsService {
    constructor(private http: HttpClient) {};

    public download(page: number): Observable<Post[]> {
        const url: string = `${environment.apiUrl}posts?_page=${page + 1}`;
        return this.http.get<Post[]>(url).pipe(delay(500));
    }

    public create(post: Post): Observable<Post> {
        const url: string = `${environment.apiUrl}posts`;
        return this.http.post<Post>(url, post);
    }

    public edit(id: number, post: Post): Observable<Post> {
        const url: string = `${environment.apiUrl}posts/${id}`;
        return this.http.put<Post>(url, post);
    }

    public delete(id: number): Observable<void> {
        const url: string = `${environment.apiUrl}posts/${id}`;
        return this.http.delete<void>(url);
    }
}