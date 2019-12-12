import { TastingRating } from './TastingRating';
import { PlaceLocation } from './PlaceLocation';

export class Coffee {
    _id?: string;
    type: string;
    rating: number;
    notes: string;

    constructor(public name: string = '', public place: string = '', public location:  PlaceLocation = null, public tastingRating: TastingRating = null) {
        this.location = new PlaceLocation();
        this.tastingRating = new TastingRating();
    }
}

