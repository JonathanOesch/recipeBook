import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

// Components
import { HomeComponent } from "./core/home/home.component";
import { AuthGuard } from "./auth/_guards/auth-guard.service";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule', canLoad:[AuthGuard]},
    { path: 'shopping-list', loadChildren: './shopping/shopping-list.module#ShoppingListModule' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}