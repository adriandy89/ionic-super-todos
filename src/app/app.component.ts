import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { environment } from '@environments/environment';

import * as mapboxgl from 'mapbox-gl'

interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-menu contentId="main-content">
        <ion-header>
          <ion-toolbar>
            <ion-title>Menu Content</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-list>
            <ion-menu-toggle *ngFor="let item of menuItems">
              <ion-item (click)="title=item.title" [routerLink]="item.route" >
                <ion-label>{{item.title}}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
      <div class="ion-page" id="main-content">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-title>{{title}}</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-router-outlet></ion-router-outlet>
        </ion-content>
      </div>

    </ion-app>
  `,
})
export class AppComponent implements OnInit {

  title: string = '';

  menuItems: MenuItem[];

  constructor(private router: Router) {
    this.menuItems = [
      {
        title: 'Todos',
        route: '/home'
      },
      {
        title: 'Route Map',
        route: '/map/route'
      },
      {
        title: 'Navigation Map',
        route: '/map/navigation'
      },
      {
        title: 'Realtime Map',
        route: '/map/realtime'
      },
      {
        title: 'Marker Map',
        route: '/map/marker'
      }
    ]

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd)
        this.title = this.menuItems.find(item => item.route===event.url)?.title || ''
    });
  }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;
  }


}
