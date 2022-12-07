import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPageRoutingModule } from './map-routing.module';
import { MapComponent } from './components';
import { NavigationMapPage, RealtimeMapPage, RouteMapPage } from './pages';
import { IonicModule } from '@ionic/angular';
import { MarkerMapPage } from './pages/marker-map/marker-map.page';

const components = [MapComponent];
const pages = [RouteMapPage, NavigationMapPage, RealtimeMapPage, MarkerMapPage];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MapPageRoutingModule
  ],
  declarations: [...components, ...pages],
})
export class MapPageModule { }
