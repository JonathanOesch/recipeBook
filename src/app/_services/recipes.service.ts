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
  
  private recipes: Recipe[] = [ ];

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
