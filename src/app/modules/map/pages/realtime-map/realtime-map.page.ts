import { Component, ElementRef, ViewChild } from '@angular/core';
import { ViewDidEnter, ViewWillLeave } from '@ionic/angular';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-realtime-map',
  template: `
    <ion-content [fullscreen]="true">
      <div id="divRealTimeMap" #divRealTimeMap></div>
    </ion-content>
  `,
  styles: [
    `
    #divRealTimeMap {
      position: absolute;
      height: 100%;
      width: 100%;
    }
    `
  ]
})
export class RealtimeMapPage implements ViewDidEnter, ViewWillLeave {

  timerDataSimulation: any;

  @ViewChild('divRealTimeMap') divRealTimeMap!: ElementRef;
  map: mapboxgl.Map | undefined;
  response!: Promise<any> | null;

  constructor() {}

  ionViewWillLeave(): void {
    window.clearInterval(this.timerDataSimulation);
    this.divRealTimeMap.nativeElement = null;
    this.map = undefined;
  }

  async ionViewDidEnter() {
    this.response = fetch(
      'https://docs.mapbox.com/mapbox-gl-js/assets/hike.geojson'
    )

    this.map = new mapboxgl.Map({
      container: this.divRealTimeMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 14,
      interactive: false,
    });

    this.map.addControl(new mapboxgl.ScaleControl, 'bottom-left');

    this.map.on('load', async () => {
      this.map!.resize();

      // We fetch the JSON here so that we can parse and use it separately
      // from GL JS's use in the added source.
      const resp = await this.response;
      if (resp) {
        const data = await resp.json();
        // save full coordinate list for later
        const coordinates = data.features[0].geometry.coordinates;

        // start by showing just the first coordinate
        data.features[0].geometry.coordinates = [coordinates[0]];

        // add it to the map
        this.map!.addSource('trace', { type: 'geojson', data: data });
        this.map!.addLayer({
          'id': 'trace',
          'type': 'line',
          'source': 'trace',
          'paint': {
            'line-color': 'blue',
            'line-opacity': 0.75,
            'line-width': 5
          }
        });

        // setup the viewport
        this.map!.jumpTo({ 'center': coordinates[0], 'zoom': 14 });
        this.map!.setPitch(30);

        // on a regular basis, add more coordinates from the saved list and update the map
        let i = 0;
        this.timerDataSimulation = setInterval(() => {
          if (i < coordinates.length) {
            data.features[0].geometry.coordinates.push(coordinates[i]);
            //@ts-ignore
            this.map!.getSource('trace').setData(data);
            this.map!.panTo(coordinates[i]);
            i++;
          } else {
            window.clearInterval(this.timerDataSimulation);
          }
        }, 50);
      }

    });
  }



}
