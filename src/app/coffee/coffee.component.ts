import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Coffee } from '../logic/logic';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GeolocationService } from '../geolocation.service';
import { TastingRating } from '../logic/TastingRating';
import { DataService } from '../data.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})
export class CoffeeComponent implements OnInit, OnDestroy {

  coffee: Coffee;
  types: Array<string> = ['Espresso', 'Ristretto', 'Americano', 'Cappucino', 'Frappe'];

  routingSubscription: any;

  tastingEnabled: Boolean = false;

  coffeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private geolocation: GeolocationService,
    private data: DataService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.coffee = new Coffee();
    this.routingSubscription = this.route.params.subscribe(params => {
      console.log('Params ', params['id']);
      if (params['id']) {
        this.data.get(params['id'], response => {
          this.coffee = response;
          if (this.coffee.tastingRating) {
            this.tastingEnabled = true;
          }
          this.setFormValues();
        });
      }
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
        aromaRating: [null],
        flavorRating: [null],
        intensityRating: [null],
        sweetnessRating: [null],
        aftertasteRating: [null]
      })
    });
  }

  setFormValues(): void {
    this.coffeeForm.setValue({
      coffeeName: this.coffee.name,
      type: this.coffee.type,
      place: this.coffee.place,
      rating: this.coffee.rating,
      notes: this.coffee.notes,
      location: {
        address: this.coffee.location.address,
        city: this.coffee.location.city,
        latitude: this.coffee.location.latitude,
        longitude: this.coffee.location.longitude
      },
      tastingRating: {
        aromaRating: this.coffee.tastingRating.aroma,
        flavorRating: this.coffee.tastingRating.flavour,
        intensityRating: this.coffee.tastingRating.intensity,
        sweetnessRating: this.coffee.tastingRating.sweetness,
        aftertasteRating: this.coffee.tastingRating.aftertaste
      }
    })
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
    this.router.navigate(['/']);
  }

  save(form: FormGroup): void {
    const coffee: Coffee = {
      _id: this.coffee._id,
      name: form.value.coffeeName,
      type: form.value.type,
      place: form.value.place,
      rating: form.value.rating,
      notes: form.value.notes,
      location: {
        address: form.value.location.address,
        city: form.value.location.city,
        latitude: form.value.location.latitude,
        longitude: form.value.location.longitude
      },
      tastingRating: {
        aroma: form.value.tastingRating.aromaRating,
        flavour: form.value.tastingRating.flavorRating,
        intensity: form.value.tastingRating.intensityRating,
        sweetness: form.value.tastingRating.sweetnessRating,
        aftertaste: form.value.tastingRating.aftertasteRating
      }
    }

    console.log('Form Values ', coffee);
    
    this.data.save(coffee, result => {
      if (result) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    this.routingSubscription.unsubscribe();
  }

}
