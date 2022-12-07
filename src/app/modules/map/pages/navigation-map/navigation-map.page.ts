import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-map',
  template: `
    <ion-content [fullscreen]="true">
      <app-map
        [center]="center"
        [origin]="origin"
        [destination]="destination"
        [hasDirection]="true">
      </app-map>
    </ion-content>
  `,
  styles: []
})
export class NavigationMapPage implements OnInit {

  center!: [number, number];
  origin!: [number, number];
  destination!: [number, number];

  constructor() { }

  ngOnInit(): void {
    this.center = [-79.4512, 43.6568];
    this.origin = [-79.45086, 43.65774];
    this.destination = [-79.44271, 43.66360];
  }

}
