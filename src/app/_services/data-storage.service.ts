import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { map } from 'rxjs/operators';

// Models
import { Recipe } from '../_models/recipe.model';

// Services
import { AuthService } from './auth.service';
import { RecipesService } from './recipes.service';



@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private httpClient: HttpClient, 
    private recipeService: RecipesService,
    private authService: AuthService
  ) { }

  storeRecipes() {
    // return this.httpClient.put( 
    //   'https://ng-recipe-book-ee76c.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
    //     observe: 'body',
    //     params: new HttpParams().set('auth', token)
    //     // headers: new HttpHeaders().set('Authorization', 'Bearer adkjljdklfjds')
    //   } );
    const req = new HttpRequest( 'PUT', 'https://ng-recipe-book-ee76c.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {reportProgress: true} );
    return this.httpClient.request(req);
  }

  getRecipes() {
    // return this.httpClient.get<Recipe[]>( 'https://ng-recipe-book-ee76c.firebaseio.com/recipes.json?auth=' + token )
    return this.httpClient.get<Recipe[]>( 'https://ng-recipe-book-ee76c.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    } )
      .pipe(map(
        (recipes) => {
          // console.log(recipes);
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
