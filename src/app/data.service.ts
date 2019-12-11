import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coffee } from './logic/logic';
import { PlaceLocation } from './logic/PlaceLocation';
import { environment } from 'src/environments/environment';
import { resolve } from 'q';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getList(callback) {
    // const list = [
    //   new Coffee('Double expresso', 'Sunny Cafe', new PlaceLocation('123 Market Street', 'San Francisco')),
    //   new Coffee('Caramel Americano', 'Star Coffee', new PlaceLocation('Gran Via 34', 'Madrid'))
    // ];
    // callback(list);

    this.http.get(`${this.apiUrl}/coffees`)
      .subscribe(response => {
        console.log('Response ', response);
        callback(response);
      });

  }

  save(coffee, callback) {
    if (coffee._id) {
      // It is an update
      this.http.put(`${this.apiUrl}/coffees/${coffee._id}`, coffee)
        .subscribe(response => {
          console.log('Update reaponse ', response);
          callback(true);
        });
    } else {
      // It is an insert
      this.http.post(`${this.apiUrl}/coffees`, coffee)
        .subscribe(response => {
          console.log('Update reaponse ', response);
          callback(true);
        });
    }
    // callback(true);
  }

}
