import { ShoppingListService } from "../_services/shopping-list.service";
import { IngredientsService } from "../_services/ingredients.service";
import { Ingredient } from "../_models/ingredient.model";

describe('ShoppingListService', () => {
    let service: ShoppingListService;
    let ingC: Ingredient;
    let ingGa: Ingredient;
    let ingLb: Ingredient;
    let ingOz: Ingredient;
    let ingTsp: Ingredient;

    beforeEach(() => {
        let ingService: IngredientsService;
        ingService = new IngredientsService;
        service = new ShoppingListService(ingService);
        service.deleteAllIngredients();
        ingC = new Ingredient( 'testC', 16, 'c' );
        ingGa = new Ingredient( 'testGa', 1, 'ga' );
        ingLb = new Ingredient( 'testLb', 1, 'lb' );
        ingOz = new Ingredient( 'testOz', 16, 'oz' );
        ingTsp = new Ingredient( 'testTsp', 48, 'tsp' );
    });

    it('should add ingredient of the same measure -- tsp', () => {
        service.addIngredient(ingTsp);
        // service.addIngredient(new Ingredient(ingTsp.name, 10, ingTsp.measure));

        const expected = new Ingredient(ingTsp.name, 48, 'tsp');
        expect(service.getIngredient(0)).toEqual(expected);
    });

    it('should add ingredient with new ingredient converting to original ingredient c -> ga', () => {
        service.addIngredient(ingGa);
        service.addIngredient(new Ingredient(ingGa.name, 16, 'c'));

        const expected = new Ingredient(ingGa.name, 2, 'ga');
        expect(service.getIngredients()[0]).toEqual(expected);
    });

    it('should add ingredient with original ingredient converting to new ingredient ga -> c', () => {
        service.addIngredient( ingC );
        service.addIngredient( new Ingredient( ingC.name, 1, 'ga' ) );

        const expected = new Ingredient( ingC.name, 2, 'ga' );
        expect( service.getIngredients()[ 0 ] ).toEqual( expected );
    });

    it('should add ingredient (oz -> cups)', () => {
        service.addIngredient(new Ingredient('test', .5, 'c'));
        service.addIngredient(new Ingredient( 'test', 16, 'oz'));

        const expected = new Ingredient('test', 2.5, 'c');
        expect (service.getIngredients()[0]).toEqual(expected);
    });
});

