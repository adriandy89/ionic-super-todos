import { Component } from '@angular/core';

@Component({
  selector: 'app-route-map',
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
export class NavigationMapPage {

  center: [number, number] = [-79.4512, 43.6568];
  origin: [number, number] = [-79.45086,43.65774];
  destination: [number, number] = [-79.44271,43.66360];

  constructor() { }

}
