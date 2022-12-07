import { Component, ElementRef, ViewChild } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';

import * as mapboxgl from 'mapbox-gl';
import { CustomMarker } from '../../interfaces';
import { MarkerService } from '../../services';

@Component({
  selector: 'app-marker-map',
  template: `
    <ion-content [fullscreen]="true">
      <ion-list class="list-group">
        <ion-item *ngFor="let marcador of markers; let i = index"
            (click)="goToMarker( marcador.marker! )" class="pointer">
          <ion-label>
            <div [style.color]="marcador.color">
              marker {{ i + 1 }}
            </div>
          </ion-label>
        </ion-item>
      </ion-list>

      <div id="divMarkerMap" #divMarkerMap></div>
    </ion-content>
  `,
  styles: [
    `
    #divMarkerMap {
      position: absolute;
      height: 100%;
      width: 100%;
    }

    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }
    .pointer {
      cursor: pointer;
    }
    `
  ]
})
export class MarkerMapPage implements ViewDidEnter {

  @ViewChild('divMarkerMap') divMarkerMap!: ElementRef;
  map!: mapboxgl.Map;

  private _markers: CustomMarker[] = [];

  public get markers(): CustomMarker[] {
    return this._markers;
  }
  public set markers(value: CustomMarker[]) {
    this._markers = value;
  }

  constructor(public markerService: MarkerService) {}


  ionViewDidEnter() {
    this.markers = []
    this.map = new mapboxgl.Map({
      container: this.divMarkerMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-96, 37.8],
      zoom: 6,
    });
    const marks = this.markerService.getMarkers()
    console.log(marks);
    marks.forEach((marker:any) => {
      this.updateMarker({...marker})
    });
    this.map.on('load', () => {
      this.map?.resize()

    })
  }

  updateMarker(marker: CustomMarker) {
    const foundIndex = this.markers.findIndex(markr => markr.id === marker.id)
    if (foundIndex!==-1) {
      this.markers[foundIndex] = {
        color: this.randomColor(),
        marker: this.markers[foundIndex].marker!.setLngLat( marker.center! ),
        center: marker.center,
        id: marker.id
      }
    } else {
      this.addMarker(marker.id!, marker.center!);
    }
  }

  addMarker(id: string, lngLat: [number, number]) {

    const color = this.randomColor();
    const nuevoMarcador = new mapboxgl.Marker({color})
      .setLngLat( lngLat )
      .addTo( this.map! );

    const mk = this.markers;
    mk.push({
      marker: nuevoMarcador,
      id,
      color
    });
    this.markers = mk;
  }

  goToMarker( marker: mapboxgl.Marker ) {
    this.map!.flyTo({
      center: marker.getLngLat()
    });
  }

  randomColor() {
    return "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16))
  }

  fakeId() {
    return "xxxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16))
  }


}
