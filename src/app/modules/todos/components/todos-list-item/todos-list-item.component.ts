import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '../../interfaces';

@Component({
  selector: 'app-todos-list-item',
  template: `
    <ion-item-sliding #itemSliding>
      <ion-item>
        <ion-label>
          <h3 *ngIf="todo.checked; else activeTodo">
            <s style="color: #777;">{{ todo.title }}</s>
          </h3>
          <ng-template #activeTodo>
            <h3>
              <b>{{ todo.title }}</b>
            </h3>
          </ng-template>
          <p>
            <small>{{ todo.createdAt | date: 'medium' }}</small>
          </p>
        </ion-label>
      </ion-item>

      <ion-item-options>
        <ion-item-option
          (click)="onCheck(); itemSliding.close()"
          [color]="todo.checked ? 'primary' : 'success'"
          >{{ todo.checked ? 'Undo' : 'DONE' }}</ion-item-option
        >
        <ion-item-option (click)="onDelete()" color="danger"
          >Delete</ion-item-option
        >
      </ion-item-options>
    </ion-item-sliding>
  `,
})
export class TodosListItemComponent {
  @Input() todo!: ITodo;

  @Output() handleCheck = new EventEmitter<number>();
  @Output() handleDelete = new EventEmitter<number>();

  onCheck() {
    this.handleCheck.emit(this.todo.id);
  }

  onDelete() {
    this.handleDelete.emit(this.todo.id);
  }
}
