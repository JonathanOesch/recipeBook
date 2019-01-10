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

  constructor(
    private shoppingListService: ShoppingListService
  ) { }


  addIngredientsToShoppingList ( ingredients: Ingredient[] ) {
    this.shoppingListService.addIngredients( ingredients );
  }

  addRecipe ( recipe: Recipe ) {
    this.recipes.push( recipe );
    this.sortRecipes();
    this.recipesChanged.next( this.recipes.slice() );
  }

  deleteRecipe ( index: number ) {
    this.recipes.splice( index, 1 );
    this.recipesChanged.next( this.recipes.slice() );
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  setRecipes ( recipes: Recipe[] ) {
    this.recipes = recipes;
    this.sortRecipes();
    this.recipesChanged.next( this.recipes.slice() );
  }

  private sortRecipes() {
    this.recipes.sort( ( left, right ): number => {
      if ( left.name.toUpperCase() < right.name.toUpperCase() ) return -1;
      if ( left.name.toUpperCase() > right.name.toUpperCase() ) return 1;
      return 0;
    } );

    let idCount = 0;

    for(let recipe of this.recipes) {
      recipe.id = idCount++;
    }
  }

  updateRecipe ( index: number, newRecipe: Recipe ) {
    this.recipes[index] = newRecipe;
    this.sortRecipes();
    this.recipesChanged.next( this.recipes.slice() );
  }

}
