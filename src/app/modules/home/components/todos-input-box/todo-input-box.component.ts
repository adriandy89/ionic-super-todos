import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
          value=""
          (keyup.enter)="onAdd(todo)"
          #todo
        ></ion-input>
      </ion-item>
    </div>
  `,
})
export class TodosInputBoxComponent {
  @Output() newTodo = new EventEmitter<string>();

  onAdd(event: IonInput) {
    const title = event.value as string;
    this.newTodo.emit(title);
  }
}
