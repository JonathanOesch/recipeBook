import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Components
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";

// Modules
import { SharedModule } from "../shared/shared.module";


const shoppingListRoute: Routes = [
    {path: '', component: ShoppingListComponent}
]

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(shoppingListRoute)
    ]
})
export class ShoppingListModule {

}