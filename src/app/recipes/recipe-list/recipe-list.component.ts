import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

// Models
import { Recipe } from '../../_models/recipe.model'

// Services
import { RecipesService } from 'src/app/_services/recipes.service';
import { DataStorageService } from 'src/app/_services/data-storage.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, AfterContentInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipesService, 
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngAfterContentInit() {
    // this.recipes = this.recipeService.getRecipes();    
  }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
