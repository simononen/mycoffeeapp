import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Coffee } from '../logic/logic';
import { Router } from '@angular/router';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list: [Coffee];
  constructor(
    private dataService: DataService,
    private router: Router,
    private geolocation: GeolocationService,
  ) { }

  ngOnInit() {
    this.dataService.getList(list => {
      this.list = list;
    });
  }

  details(coffee: Coffee): void {
    this.router.navigate(['/coffee', coffee._id])
  }

  map(coffee: Coffee): void {
    console.log('Location ', coffee.location);
    const mapUrl = this.geolocation.getMapLink(coffee.location)
    location.href = mapUrl;
  }

  share(coffee: Coffee): void {
    let shareText = `I had this coffee at ${coffee.place} and for me it's a ${coffee.rating} star coffee`;
    if ('share' in navigator) {
      (navigator as any).share({
        title: coffee.name,
        text: shareText,
        url: window.location.href
      }).then( () => console.log('Sharing') ).catch( () => console.log('Error sharing') );
    } else {
      const shareURL = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
      location.href = shareURL;
    }
  }

}
