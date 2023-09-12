import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, delay } from "rxjs";
import { Post } from "../utils/types";
import { POSTS_URL } from "../utils/const";

@Injectable({providedIn: 'root'})
export class PostsService {
    constructor(private _http: HttpClient) {};

    public download(page: number): Observable<Post[]> {
        const url: string = `${POSTS_URL}?_page=${page + 1}`;
        return this._http.get<Post[]>(url).pipe(delay(500));
    }

    public create(post: Post): Observable<Post> {
        const url: string = POSTS_URL;
        return this._http.post<Post>(url, post);
    }

    public edit(id: number, post: Post): Observable<Post> {
        const url: string = `${POSTS_URL}/${id}`;
        return this._http.put<Post>(url, post);
    }

    public delete(id: number): Observable<void> {
        const url: string = `${POSTS_URL}/${id}`;
        return this._http.delete<void>(url);
    }
}