import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { environment } from '@environments/environment';
import { Feature, GeoJsonProperties, Geometry } from 'geojson';

import * as mapboxgl from 'mapbox-gl';
var MapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');

@Component({
  selector: 'app-map',
  template: `
    <div id="divMap" #divMap></div>
  `,
  styles: [
    `
    #divMap {
      position: absolute;
      height: 100%;
      width: 100%;
    }
    `
  ]
})
export class MapComponent implements AfterViewInit, OnDestroy {

  @Input('geoJsonData') geoJsonData!: Feature<Geometry, GeoJsonProperties>;
  @Input('center') center: [number, number] = [0, 0]
  @Input('origin') origin: [number, number] = [0, 0]
  @Input('destination') destination: [number, number] = [0, 0]
  @Input('zoomLevel') zoomLevel: number = 15;
  @Input('hasDirection') hasDirection: boolean = false;

  @ViewChild('divMap') divMap!: ElementRef;
  map!: mapboxgl.Map;

  constructor() { }

  ngOnDestroy(): void {
    this.map.off('zoom', () => { });
    this.map.off('zoomend', () => { });
    this.map.off('move', () => { });
  }

  ngAfterViewInit(): void {

    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });

    const navControl = new mapboxgl.NavigationControl({
      visualizePitch: true,
      showZoom: true
    })
    this.map.addControl(navControl, 'bottom-right');
    this.map.addControl(new mapboxgl.ScaleControl, 'bottom-left');

    const direction = new MapboxDirections({
      accessToken: environment.mapboxToken,
      unit: 'metric',
      profile: 'mapbox/cycling',
    });
    if (this.hasDirection) {
      this.map.addControl(
        direction,
        'top-left'
      );
    }

    this.map.on('load', () => {
      this.map.resize();

      if (!this.hasDirection) {
        this.map.addSource('route', {
          'type': 'geojson',
          'data': this.geoJsonData
        });
        this.map.addLayer({
          'id': 'route',
          'type': 'line',
          'source': 'route',
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': '#888',
            'line-width': 8
          }
        });
      } else {
        direction.setOrigin(this.origin)
        direction.setDestination(this.destination)
      }

    })

    this.map.on('zoom', (ev) => {
      this.zoomLevel = this.map.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if (this.map.getZoom() > 18) {
        this.map.zoomTo(18);
      }
    });

    this.map.on('move', (ev) => {
      const target = ev.target;
      const { lng, lat } = target.getCenter();
      this.center = [lng, lat];
    });

  }

}
