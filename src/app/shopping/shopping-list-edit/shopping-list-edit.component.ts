import { 
  Component, 
  OnInit,
  OnDestroy,
  ViewChild, 
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

// Models
import { Ingredient } from 'src/app/_models/ingredient.model';

// Services
import { ShoppingListService } from 'src/app/_services/shopping-list.service';
import { IngredientsService } from 'src/app/_services/ingredients.service';



@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  measurement: string[] = [ ];
  amounts: number[] = [];

  constructor(private shoppingListService: ShoppingListService, private ingredientsService: IngredientsService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.shoppingForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
            measure: this.editedItem.measure
          })
        }
      );

      this.measurement = this.ingredientsService.getMeasurements();
      this.amounts = this.ingredientsService.getAmounts();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount, value.measure);
    // console.log(value.name + ': ' + value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
      this.editMode = false;
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    form.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
}
