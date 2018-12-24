import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

// Services
import { RecipesService } from 'src/app/_services/recipes.service';
import { IngredientsService } from 'src/app/_services/ingredients.service';
import { Ingredient } from 'src/app/_models/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, AfterContentInit {
  editMode = false;

  amounts: number[] = [];
  id: number;
  ingredients: Ingredient[] = [];
  measurements: string[] = [];
  recipeForm: FormGroup;
  steps: {stepNum: number, description: string}[] = [];
  stepsLength: number;
  deletedStep: boolean;

  constructor(
    private route: ActivatedRoute, 
    private recipesService: RecipesService,
    private router: Router,
    private ingredientsService: IngredientsService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
      this.ingredients = this.recipeForm.get('ingredients').value;
      this.steps = this.recipeForm.get('steps').value;
      this.amounts = this.ingredientsService.getAmounts();
      this.stepsLength = this.steps.length;
      this.deletedStep = false;
  }

  ngAfterContentInit() {
    this.measurements = this.ingredientsService.getMeasurements();
  }

  getControls () {
    return ( <FormArray>this.recipeForm.get( 'ingredients' ) ).controls;
  }

  getStepsControls () {
    return (<FormArray>this.recipeForm.get('steps')).controls;
  }

  private initForm() {
    
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    let recipeSteps = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipesService.getRecipe( this.id );
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern( /^\d*\.?\d*$/)
              ]),
              'measure': new FormControl( ingredient.measure )
            })
          );
        }
      }
      if (recipe['steps']) {
        for (let step of recipe.steps) {
          recipeSteps.push(
            new FormGroup({
                'stepNum': new FormControl(step.stepNum, Validators.required),
                'description': new FormControl(step.description, Validators.required)
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients,
      'steps': recipeSteps
    });
  }

  onAddIngredient () {
    ( <FormArray>this.recipeForm.get( 'ingredients' ) ).push(
      new FormGroup( {
        'name': new FormControl( null, Validators.required ),
        'amount': new FormControl( null, [
          Validators.required,
          Validators.pattern( /^\d*\.?\d*$/ )
        ] ),
        'measure': new FormControl( '' )
      } )
    );
  }

  onAddStep () {
    // console.log('start of onAddStep: ' + this.stepsLength);
    if (this.deletedStep) {
      (<FormArray>this.recipeForm.get('steps')).push(
        new FormGroup({
            'stepNum': new FormControl(++this.stepsLength, Validators.required),
            'description': new FormControl(null, Validators.required)
        })
      );
    } else {
      ( <FormArray>this.recipeForm.get( 'steps' ) ).push(
        new FormGroup( {
          'stepNum': new FormControl( ++this.stepsLength, Validators.required ),
          'description': new FormControl( null, Validators.required )
        } )
      );
    }

    this.steps = this.recipeForm.get('steps').value;
  }

  onCancel () {
    this.deletedStep = false;
    this.router.navigate( [ '../' ], { relativeTo: this.route } );
  }

  onDeleteIngredient ( index: number ) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    this.ingredients.slice(index, 1);
  }

  onDeleteStep (index: number) {
    (<FormArray>this.recipeForm.get('steps')).removeAt(index);
    this.steps.slice(index, 1);
    const formArrayLength = (<FormArray>this.recipeForm.controls['steps']).length;
    for(let i = index; i < formArrayLength; i++) {
      ( <FormArray>this.recipeForm.controls['steps'] ).at(i).patchValue({ stepNum: i + 1 });
      this.steps[i].stepNum = i + 1;
    }

    this.steps = this.recipeForm.get( 'steps' ).value;
    this.stepsLength--;
    this.deletedStep = true;
  }

  onSubmit () {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'], 
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['ImagePath'],
    //   this.recipeForm.value['ingredients']);
    if ( this.editMode ) {
      this.recipesService.updateRecipe( this.id, this.recipeForm.value );
    } else {
      this.recipesService.addRecipe( this.recipeForm.value );
    }
    this.onCancel();
  }
}
