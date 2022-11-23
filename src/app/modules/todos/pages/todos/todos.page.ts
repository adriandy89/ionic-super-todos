import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodos } from '../../interfaces';
import { Todo } from '../../models';
import { TodosService } from '../../services';

@Component({
  selector: 'app-todos',
  templateUrl: 'todos.page.html',
  styleUrls: ['todos.page.scss'],
})
export class TodosPage {
  title = 'Todos App';
  todos$: Observable<ITodos>;

  constructor(private readonly todosService: TodosService) {
    this.todos$ = this.todosService.todos$;
  }

  addTodo(title: string) {
    const todo = new Todo(title);
    this.todosService.addTodo(todo);
  }

  checkTodo(id: number) {
    this.todosService.checkTodo(id);
  }

  deleteTodo(id: number) {
    this.todosService.deleteTodo(id);
  }
}
