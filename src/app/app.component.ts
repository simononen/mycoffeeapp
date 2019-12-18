import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwUpdate, SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private snackbar: MatSnackBar,
    private updates: SwUpdate,
    private swPush: SwPush
  ) { }

  ngOnInit(): void {

    this.updates.available.subscribe(event => {
      const sb = this.snackbar.open('There is an update available', 'Install Now', { duration: 4000 });
      sb.onAction().subscribe(() => {
        console.log('Current version is ', event.current);
        console.log('available version is ', event.available);
        location.reload();
      });
    });

    this.updates.activated.subscribe(event => {
      console.log('Old version was ', event.previous);
      console.log('new version is ', event.current);
    });

    this.updates.checkForUpdate();

    this.updateNetworkStatusUI();

    window.addEventListener('online', this.updateNetworkStatusUI);
    window.addEventListener('offline', this.updateNetworkStatusUI);

    if ((navigator as any).standalone === false) {
      this.snackbar.open('You can add this app to your home screen', '', { duration: 3000 });
    }

    if ((navigator as any).standalone === undefined) {
      if (window.matchMedia("(display-mode: browser)").matches) {
        window.addEventListener('beforeinstallprompt', event => {
          event.preventDefault();
          const sb = this.snackbar.open('Do you want to install this App?', 'Install', { duration: 5000 });
          sb.onAction().subscribe(() => {
            (event as any).prompt();
            (event as any).userChoice.then(result => {
              if (result.outcome == 'dismisses') {
                console.log('Dismissed');
              } else {
                console.log('Installed');
              }
            })
          })
          return false;
        });
      }
    }
  }

  updateNetworkStatusUI(): void {
    if (navigator.onLine) {
      (document.querySelector('body') as any).style = "";
    } else {
      (document.querySelector('body') as any).style = "filter: grayscale(1)";
    }

  }

  subscribeToPush(): void {
    Notification.requestPermission( permission => {
      if (permission === 'granted') {
        this.swPush.requestSubscription({
          serverPublicKey: 'public-valid-server-key'
        });
      }
    }); 
  }
}
