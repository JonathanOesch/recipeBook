import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

// Models
import { Ingredient } from '../_models/ingredient.model';
import { Recipe } from '../_models/recipe.model'


// Services
import { ShoppingListService } from './shopping-list.service';


@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>()
  
  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel', 
      'A super-tasty Schnitzel - just awesome!', 
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1, 'each'),
        new Ingredient('French Fries', 20, 'each')
      ],
      [
        {stepNum: 1, description: 'Cook meat'},
        {stepNum: 2, description: 'Cook Fries'}
      ]),
    new Recipe(
      'Big Fat Burger', 
      'What else do you need to say?', 
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2, 'each'),
        new Ingredient('Meat', 1, 'each')
      ],
      [
        {stepNum: 1 , description: 'Cook meat'},
        {stepNum: 2, description: 'open bun'},
        {stepNum: 3, description: 'put meat on bottom bun'},
        {stepNum: 4, description: 'put top bun on meat'}
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe ( recipe: Recipe ) {
    this.recipes.push( recipe );
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe ( index: number, newRecipe: Recipe ) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next( this.recipes.slice() );
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}