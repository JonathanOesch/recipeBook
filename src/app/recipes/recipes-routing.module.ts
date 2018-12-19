import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

// Components
import { RecipeComponent } from "./recipe.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";

// Services
import { AuthGuard } from "../auth/_guards/auth-guard.service";

const recipesRoutes: Routes = [
    {
        path: '', component: RecipeComponent, children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent, canActivate: [ AuthGuard ] },
            { path: ':id', component: RecipeDetailComponent },
            { path: ':id/edit', component: RecipeEditComponent, canActivate: [ AuthGuard ] }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(recipesRoutes)
    ],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}