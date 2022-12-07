import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPageRoutingModule } from './map-routing.module';
import { MapComponent } from './components';
import { NavigationMapPage, RealtimeMapPage, RouteMapPage } from './pages';
import { IonicModule } from '@ionic/angular';

const components = [MapComponent];
const pages = [RouteMapPage, NavigationMapPage, RealtimeMapPage];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MapPageRoutingModule
  ],
  declarations: [...components, ...pages],
})
export class MapPageModule { }
