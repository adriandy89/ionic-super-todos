import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './pages';

import { HomePageRoutingModule } from './home-routing.module';
import { TodosInputBoxComponent, TodosListItemComponent } from './components';

const components = [TodosListItemComponent, TodosInputBoxComponent];
const pages = [HomePage];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [...components, ...pages],
})
export class HomePageModule {}
