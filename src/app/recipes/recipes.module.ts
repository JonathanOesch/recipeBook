import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

// Components
import { RecipeComponent } from "./recipe.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { SharedModule } from "../shared/shared.module";

// Modules
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipeItemComponent } from "./recipe-item/recipe-item.component";

@NgModule({
    declarations: [
        RecipeComponent,
        RecipeStartComponent,
        RecipeListComponent,
        RecipeEditComponent,
        RecipeDetailComponent,
        RecipeItemComponent
    ],
    imports: [
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule
    ]
})
export class RecipesModule {

}