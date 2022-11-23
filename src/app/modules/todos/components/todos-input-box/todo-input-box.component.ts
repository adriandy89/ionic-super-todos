import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-todos-input-box',
  template: `
    <div class="ion-padding-top">
      <ion-item counter="true" fill="outline">
        <ion-label for="todo" position="floating"
          >What are you up to!</ion-label
        >
        <ion-input
          color="primary"
          placeholder="Enter you todo"
          maxlength="20"
          name="todo"
          inputmode="text"
          (keyup.enter)="onAdd()"
          #newTodoEl
        ></ion-input>
      </ion-item>
    </div>
  `,
})
export class TodosInputBoxComponent {
  @Output() newTodo = new EventEmitter<string>();
  @ViewChild('newTodoEl', { static: false }) newTodoEl!: IonInput;

  onAdd() {
    const title = this.newTodoEl.value as string;

    if (title !== '') {
      this.newTodo.emit(title);
      this.newTodoEl.value = '';
    }
  }
}
