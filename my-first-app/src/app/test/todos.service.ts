import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, delay, throwError } from "rxjs";

export interface Todo {
    completed: boolean;
    title: string;
    id?: number;
}

@Injectable({providedIn: 'root'})
export class TodosService {
    constructor(private http: HttpClient) {};

    public addTodo(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo);
    }

    public fetchTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
            .pipe(
                delay(500),
                catchError(error => {
                    console.log('Error', error.status);
                    return throwError(() => error);
                })
            );
    }

    public removeTodo(id: number): Observable<void> {
        return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`);
    }

    public completeTodo(id: number): Observable<Todo> {
        return this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {completed: true});
    }
}