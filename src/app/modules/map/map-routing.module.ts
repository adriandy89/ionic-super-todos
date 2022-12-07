import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationMapPage, RealtimeMapPage, RouteMapPage } from './pages';

const routes: Routes = [
  {
    path: 'route',
    component: RouteMapPage,
  },
  {
    path: 'navigation',
    component: NavigationMapPage,
  },
  {
    path: 'realtime',
    component: RealtimeMapPage,
  },
  {
    path: '',
    redirectTo: 'route',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapPageRoutingModule {}
