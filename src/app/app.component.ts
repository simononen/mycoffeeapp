import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {

    this.updateNetworkStatusUI()

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
          sb.onAction().subscribe( () => {
            (event as any).prompt();
            (event as any).userChoice.then( result => {
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
}
