import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title = 'Todos App';
  constructor() {}

  addTodo(title: string) {
    console.log(title);
  }

  checkTodo() {
    console.log('check');
  }

  deleteTodo() {
    console.log('delete');
  }
}
