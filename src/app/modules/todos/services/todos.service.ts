import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '@app/storage.service';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITodo, ITodos } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos$: Observable<ITodos>;
  private readonly todosApiEndpoint = `${environment}`;
  private readonly todosSubject = new BehaviorSubject<ITodos>([]);

  get todos() {
    return this.todosSubject.value;
  }

  // get todos$(){
  //   return this.todosSubject.asObservable()
  // }

  constructor(
    private readonly storageService: StorageService,
    private readonly http: HttpClient
  ) {
    this.todos$ = this.todosSubject.asObservable();
  }

  // getTodos() {
  //   return this.http.get();
  // }

  addTodo(todo: ITodo) {
    const todos = this.todosSubject.value;
    todos.push(todo);
    this.todosSubject.next(todos);
    return true;
  }

  checkTodo(id: number) {
    const todos = this.todosSubject.value;
    const todoIndex = todos.findIndex((t) => t.id === id);
    todos[todoIndex].checked = !todos[todoIndex].checked;
    this.todosSubject.next(todos);
    return true;
  }

  deleteTodo(id: number) {
    let todos = this.todosSubject.value;
    todos = todos.filter((t) => t.id !== id);
    this.todosSubject.next(todos);
    return true;
  }
}
