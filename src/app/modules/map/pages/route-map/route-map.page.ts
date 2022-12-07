import { Component } from '@angular/core';
import { Feature, GeoJsonProperties, Geometry } from 'geojson';

@Component({
  selector: 'app-route-map',
  template: `
    <ion-content [fullscreen]="true">
      <app-map
        [geoJsonData]="geoJsonData"
        [center]="center"
        [zoomLevel]="14">
      </app-map>
    </ion-content>
  `,
  styles: []
})
export class RouteMapPage {

  center: [number, number] = [-122.486958, 37.82931];
  geoJsonData: Feature<Geometry, GeoJsonProperties> = {
    'type': 'Feature',
    'properties': {},
    'geometry': {
      'type': 'LineString',
      'coordinates': [
        [-122.483696, 37.833818],
        [-122.483482, 37.833174],
        [-122.483396, 37.8327],
        [-122.483568, 37.832056],
        [-122.48404, 37.831141],
        [-122.48404, 37.830497],
        [-122.483482, 37.82992],
        [-122.483568, 37.829548],
        [-122.48507, 37.829446],
        [-122.4861, 37.828802],
        [-122.486958, 37.82931],
        [-122.487001, 37.830802],
        [-122.487516, 37.831683],
        [-122.488031, 37.832158],
        [-122.488889, 37.832971],
        [-122.489876, 37.832632],
        [-122.490434, 37.832937],
        [-122.49125, 37.832429],
        [-122.491636, 37.832564],
        [-122.492237, 37.833378],
        [-122.493782, 37.833683]
      ]
    }
  }

  constructor() { }

}
