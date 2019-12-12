export class TastingRating {
    body?: number;
    constructor(
        public aroma: number = null,
        public flavour: number = null,
        public intensity: number = null,
        public sweetness: number = null,
        public aftertaste: number = null
    ) {}
}