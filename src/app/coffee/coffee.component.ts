import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coffee } from '../logic/logic';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GeolocationService } from '../geolocation.service';
import { TastingRating } from '../logic/TastingRating';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})
export class CoffeeComponent implements OnInit, OnDestroy {

  coffee: Coffee;
  types: Array<string> = ['Espresso', 'Ristretto', 'Americano', 'Cappucino', 'Frappe'];

  routingSubscription: any;

  coffeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private geolocation: GeolocationService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.coffee = new Coffee();
    this.routingSubscription = this.route.params.subscribe(params => {
      console.log('Params ', params['id']);
    });
    this.geolocation.requestLocation(location => {
      if (location) {
        this.coffee.location.latitude = location.latitude;
        this.coffee.location.longitude = location.longitude;
        this.coffeeForm.value.location.latitude = this.coffee.location.latitude;
        this.coffeeForm.value.location.longitude = this.coffee.location.longitude;
      }
    });
  }

  initForm(): void {
    this.coffeeForm = this.fb.group({
      coffeeName: ['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator]],
      type: ['', [Validators.required]],
      place: ['', [Validators.required, this.noWhitespaceValidator]],
      rating: [''],
      notes: ['', [Validators.required, Validators.minLength(10), this.noWhitespaceValidator]],
      location: this.fb.group({
        address: ['', [Validators.required, this.noWhitespaceValidator]],
        city: ['', [Validators.required, this.noWhitespaceValidator]],
        latitude: [null],
        longitude: [null]
      }),
      tastingRating: this.fb.group({
        aromaRating: [''],
        flavorRating: [''],
        intensityRating: [''],
        sweetnessRating: [''],
        aftertasteRating: ['']
      })
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  get coffeeName() {
    return this.coffeeForm.get('coffeeName');
  }

  get place() {
    return this.coffeeForm.get('place');
  }

  get type() {
    return this.coffeeForm.get('type');
  }

  get address() {
    return this.coffeeForm.get('location.address');
  }

  get city() {
    return this.coffeeForm.get('location.city');
  }

  get notes() {
    return this.coffeeForm.get('notes');
  }

  tastingRatingChanges(checked: boolean) {
    if (checked) {
      this.coffeeForm.value.testingRating = new TastingRating();
    } else {
      this.coffeeForm.controls.tastingRating.reset();
    }
  }

  cancel(): void {

  }

  save(): void {
    
  }

  ngOnDestroy(): void {
    this.routingSubscription.unsubscribe();
  }

}
