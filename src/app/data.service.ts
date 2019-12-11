import { Injectable } from '@angular/core';
import { Coffee } from './logic/logic';
import { PlaceLocation } from './logic/PlaceLocation';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getList(callback) {
    const list = [
      new Coffee('Double expresso', 'Sunny Cafe', new PlaceLocation('123 Market Street', 'San Francisco')),
      new Coffee('Caramel Americano', 'Star Coffee', new PlaceLocation('Gran Via 34', 'Madrid'))
    ];
    callback(list);
  }

  save(coffee, callback) {
    callback(true);
  }

}
