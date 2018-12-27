import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

// Directives
import { DropDownDirective } from "../_directives/dropdown.directive";
import { PluralPipes } from "../_pipes/plural.pipes";
import { FractionPipes } from "../_pipes/fraction.pipes";
import { FilterPipe } from "../_pipes/filterRecipe.pipes";

@NgModule({
    declarations: [
        DropDownDirective,
        PluralPipes,
        FractionPipes,
        FilterPipe
    ],
    exports: [
        CommonModule,
        FormsModule,
        DropDownDirective,
        PluralPipes,
        FractionPipes,
        FilterPipe
    ]
})
export class SharedModule {

}