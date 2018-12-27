import { Pipe, PipeTransform } from "@angular/core";
import { Recipe } from "../_models/recipe.model";


@Pipe({
    name: 'filterRecipe'
})
export class FilterPipe implements PipeTransform {
    transform(items: Recipe[], searchText: string): any[] {
        if(!items) return [];
        if(!searchText) return items;

        searchText = searchText.toLowerCase();

        return items.filter (it => {
            return it.name.toLowerCase().includes(searchText);
        });
    }
}