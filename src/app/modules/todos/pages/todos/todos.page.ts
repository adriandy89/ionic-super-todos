import { Component } from '@angular/core';
import { NotificationService } from '@app/notification.service';
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

  constructor(
    private readonly _todosService: TodosService,
    private readonly _notificationService: NotificationService
    ) {
    this.todos$ = this._todosService.todos$;
  }

  async addTodo(title: string) {
    const todo = new Todo(title);
    this._todosService.addTodo(todo)
    ? await this._notificationService.notify({typeOfNotification:'success', message:'Add Todo Success!'})
    : await this._notificationService.notify({typeOfNotification:'alert', message:'Error Message'});
  }

  async checkTodo(id: number) {
    this._todosService.checkTodo(id)
    ? await this._notificationService.notify({typeOfNotification:'success', message:'Check Todo Success!'})
    : await this._notificationService.notify({typeOfNotification:'alert', message:'Error Message'});
  }

  async deleteTodo(id: number) {
    this._todosService.deleteTodo(id)
    ? await this._notificationService.notify({typeOfNotification:'success', message:'Delete Todo Success!'})
    : await this._notificationService.notify({typeOfNotification:'alert', message:'Error Message'});
  }
}
