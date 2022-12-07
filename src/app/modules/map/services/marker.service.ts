import { Injectable } from '@angular/core';
import { CustomMarker } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor() { }

  getMarkers() {
    let markers: CustomMarker[] = [
      {
          center: [
              -99.21899414062418,
              38.20687423094245
          ],
          color: "#42563d",
          id: "#1b0149"
      },
      {
          center: [
              -97.3,
              38.1
          ],
          color: "#a51eda",
          id: "#8062fd"
      },
      {
          center: [
              -96.8239746093741,
              38.37932669663877
          ],
          color: "#6be323",
          id: "#487ddf"
      },
      {
          center: [
              -98.28515624999922,
              37.15482539052718
          ],
          color: "#b059d3",
          id: "#0268db"
      },
      {
          center: [
              -96.40649414062403,
              37.084743560847954
          ],
          color: "#6cfa4a",
          id: "#63c9a6"
      },
      {
          center: [
              -97.91162109374908,
              38.542776676360006
          ],
          color: "#bd667b",
          id: "#1d5ce4"
      },
      {
          center: [
              -97.2414550781242,
              36.51292855730533
          ],
          color: "#6992ce",
          id: "#b237af"
      }
    ]

    return markers;
  }

}
