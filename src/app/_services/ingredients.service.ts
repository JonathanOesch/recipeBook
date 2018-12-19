import { Injectable } from '@angular/core';
import { Ingredient } from '../_models/ingredient.model';

// Order from smallest size to largest size
const TEASPOONS_TO_TABLESPOONS: number = 3;
const TABLESPOONS_TO_OUNCES: number = 2;
const OUNCES_TO_CUPS: number = 8;
const OUNCES_TO_POUNDS: number = 16;
const CUPS_TO_PINTS: number = 2;
const PINTS_TO_QUARTS: number = 2;
const QUARTS_TO_GALLONS: number = 4;

enum measurementIndex {
  EACH = 0,
  TSP,
  TBSP,
  OZ,
  LB,
  C,
  PT,
  QT,
  GA
}

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  private amounts: number[] = [];

  private measurements: string[] = [
    'each',
    'tsp',
    'tbsp',
    'oz',
    'lb',
    'c',
    'pt',
    'qt',
    'ga',
  ];

  constructor() {
    var i:number;
    for(i = 0; i <= 100; i++) {
      if (i !== 0) {
        this.amounts.push(i);
      }
      if (i < 100) {
        this.amounts.push( i + .125 );
        this.amounts.push( i + .25 );
        this.amounts.push( +( i + .33 ).toFixed( 2 ) );
        this.amounts.push( i + .5 );
        this.amounts.push( +( i + .66 ).toFixed( 2 ) );
        this.amounts.push( i + .75 ) ;
      }
    }
  }

  private adjustAmount(index1: number, index2: number): number {
    switch(index2) {
      case measurementIndex.TSP:
        return TEASPOONS_TO_TABLESPOONS;
      case measurementIndex.TBSP:
        return TABLESPOONS_TO_OUNCES;
      case measurementIndex.OZ:
        return (index1 === measurementIndex.C) ? OUNCES_TO_CUPS : OUNCES_TO_POUNDS; 
      case measurementIndex.C:
        return CUPS_TO_PINTS;
      case measurementIndex.PT:
        return PINTS_TO_QUARTS;
      case measurementIndex.QT:
        return QUARTS_TO_GALLONS;
      default:
        console.log("ERROR -- Unknown Measurement in IngredientsService ...");
        return 0;
    }
  }

  // convert amounts from ing2 into ing1
  convertAmount ( ing1: Ingredient, ing2: Ingredient ) {
    if ( this.isEqual(ing1, ing2) ) {
      return ing2.amount;
    } else {
      const ing1Index = this.getMeasurementIndex( ing1 );
      const ing2Index = this.getMeasurementIndex( ing2 );

      if (!this.isValidConversion( ing1Index, ing2Index )) {
        console.log('invalid conversion attempt');
        console.log('First index: ' + this.measurements[ing1Index]);
        console.log('Second index: ' + this.measurements[ing2Index]);
        return 0;
      }

      const fromOunce = ing2Index === measurementIndex.OZ;
      const toCup = ing1Index >= measurementIndex.C;
      const ouncesToCups = fromOunce && toCup;

      ing2.amount /= this.adjustAmount( ing1Index, ing2Index );
      ing2.measure = ouncesToCups ? this.measurements[ing2Index + 2] : this.measurements[ing2Index + 1];

      return this.convertAmount( ing1, ing2 );
    }
  }

  // ing1 is the ingredient being added
  convertMeasurements ( ing1: Ingredient, ing2: Ingredient ): string {
    if ( this.isEqual(ing1, ing2) ) {
      return ing1.measure;
    } else {
      const ing1Index = this.getMeasurementIndex( ing1 );
      const ing2Index = this.getMeasurementIndex( ing2 );
      return ing1Index > ing2Index ? ing1.measure : ing2.measure;
    }
  }

  getAmounts() {
    return this.amounts;
  }

  getMeasurementIndex(ing: Ingredient) {
    return this.measurements.findIndex( meas => meas === ing.measure );
  }

  getMeasurements() {
    return this.measurements;
  }

  private isEqual(ing1: Ingredient, ing2: Ingredient) {
    return ing1.measure === ing2.measure;
  }

  isValid ( ing1: Ingredient, ing2: Ingredient ) {
    const ing1Index = this.getMeasurementIndex( ing1 );
    const ing2Index = this.getMeasurementIndex( ing2 );
    return this.isValidConversion(ing1Index, ing2Index);
  }

  // shows false if either index is set on 'each' or one of the indexes is 'pounds' and the other is not 'ounces'
  private isValidConversion(index1: number, index2: number) {
    if ( index1 === 0 || index2 === 0 || ( ( index1 === 4 && index2 !== 3 ) || ( index2 === 4 && index1 !== 3 ) )) {
      return false;
    } else {
      return true;
    }
  }
  
}
