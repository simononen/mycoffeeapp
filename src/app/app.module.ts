import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GeolocationService } from './geolocation.service';
import { DataService } from './data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import 'hammerjs';

import { MaterialModule } from './material/material.module';
import { CoffeeComponent } from './coffee/coffee.component';
import { ListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'coffee',
    component: CoffeeComponent
  },
  {
    path: 'coffee/:id',
    component: CoffeeComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    CoffeeComponent,
    ListComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,

    MaterialModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    GeolocationService,
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
