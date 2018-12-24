import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

// Models
import { Ingredient } from '../_models/ingredient.model';
import { IngredientsService } from './ingredients.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5, 'each'),
    new Ingredient('Tomatoes', 10, 'each')
  ];

  constructor(private ingredientsService: IngredientsService) { }

  // returns ingredients array
  getIngredients() {
    return this.ingredients.slice();
  }

  // adding one ingredient to ingredients array
  addIngredient(ingredient: Ingredient) {
    const index = this.ingredients.findIndex( ing => ing.name === ingredient.name );
    if (index === -1) {
      this.ingredients.push(ingredient);
    } else {
      const adjustedAmount = +this.adjustAmount( index, ingredient );
      this.ingredients[index].amount += adjustedAmount;
      // console.log( 'new amount: ' + this.ingredients[ index ].amount);
      this.ingredients[index].measure = this.ingredientsService.convertMeasurements(this.ingredients[index], ingredient);
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  // adding many ingredients to ingredients array
  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach( ingredient => {
      this.addIngredient(ingredient);
    });
  }

  private adjustAmount(index: number, otherIngredient: Ingredient): number {
    if (this.ingredients[index].measure !== otherIngredient.measure) {
      if (this.ingredientsService.getMeasurementIndex(this.ingredients[index]) > this.ingredientsService.getMeasurementIndex(otherIngredient)){
        otherIngredient.amount = this.ingredientsService.convertAmount( this.ingredients[index], otherIngredient );
      } else {
        this.ingredients[index].amount = this.ingredientsService.convertAmount( otherIngredient, this.ingredients[index]);
      }
      
    }
    // console.log( 'new amount: ' + this.ingredients[ index ].amount);

    return otherIngredient.amount;
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteAllIngredients() {
    this.ingredients = [];
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  
}
