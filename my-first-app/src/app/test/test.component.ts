import { Component, OnInit } from '@angular/core';
import { Todo, TodosService } from './todos.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  todos: Todo[] = [];
  todoTitle: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(private todosService: TodosService) { };
  
  ngOnInit() {
    this.fetchTodos();
  }

  public addTodo(): void {

    if (!this.todoTitle.trim()) return;

    const newTodo: Todo = {
      title: this.todoTitle,
      completed: false
    }

    this.todosService.addTodo(newTodo)
      .subscribe(todo => {
          console.log(todo);
          this.todos.push(todo);
          this.todoTitle = '';
        });
  }

  public fetchTodos(): void {

    this.loading = true;

    this.todosService.fetchTodos()
      .subscribe({
        next: todos => {
          this.todos = todos;
          this.loading = false;
        },
        error: error => {
          this.error = error.message;
        }
      });
  }

  public removeTodo(id: number): void {

    this.todosService.removeTodo(id)
      .subscribe(response => {
        console.log(response); //empty object
        this.todos = this.todos.filter(t => t.id !== id);
      })
  }

  public completeTodo(id: number): void {

    this.todosService.completeTodo(id)
      .subscribe(todo => {
        console.log(todo);
        this.todos.find(t => t.id === todo.id).completed = true;
      });
  }
}