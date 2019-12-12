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

  get(coffeeId: string, callback) {
    this.http.get(`${this.apiUrl}/coffees/${coffeeId}`)
      .subscribe(response => {
        callback(response)
      });
  }

  getList(callback) {
    this.http.get(`${this.apiUrl}/coffees`)
      .subscribe(response => {
        console.log('Response ', response);
        callback(response);
      });
  }

  save(coffee: Coffee, callback) {
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
  }

}
