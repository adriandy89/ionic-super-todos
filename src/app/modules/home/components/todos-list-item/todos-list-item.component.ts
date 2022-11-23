import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todos-list-item',
  template: `
    <ion-item-sliding>
      <ion-item>
        <ng-container *ngIf="!checked" style="color: #777;">
          <ion-label
            ><b>{{ title }}</b></ion-label
          >
        </ng-container>
        <ng-container *ngIf="checked">
          <ion-label
            ><s>{{ title }}</s></ion-label
          >
        </ng-container>
      </ion-item>

      <ion-item-options>
        <ion-item-option (click)="onCheck()" color="success"
          >Done</ion-item-option
        >
        <ion-item-option (click)="onDelete()" color="danger"
          >Delete</ion-item-option
        >
      </ion-item-options>
    </ion-item-sliding>
  `,
})
export class TodosListItemComponent {
  @Input() title!: string;
  @Input() checked!: Boolean;

  @Output() handleCheck = new EventEmitter<void>();
  @Output() handleDelete = new EventEmitter<void>();

  onCheck() {
    this.handleCheck.emit();
  }

  onDelete() {
    this.handleDelete.emit();
  }
}
