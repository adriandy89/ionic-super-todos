import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TodosPage } from './pages';

import { TodosPageRoutingModule } from './todos-routing.module';
import { TodosInputBoxComponent, TodosListItemComponent } from './components';

const components = [TodosListItemComponent, TodosInputBoxComponent];
const pages = [TodosPage];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    TodosPageRoutingModule,
  ],
  declarations: [...components, ...pages],
})
export class TodosPageModule {}
