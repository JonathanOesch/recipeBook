import { IngredientsService } from "../_services/ingredients.service";
import { Ingredient } from "../_models/ingredient.model";

describe('IngredientsService', () => {
    let service: IngredientsService;
    let ingC: Ingredient;
    let ingGa: Ingredient;
    let ingLb: Ingredient;
    let ingOz: Ingredient;
    let ingTsp: Ingredient;

    beforeEach(() => {
        service = new IngredientsService;
        ingC = new Ingredient( 'testC', 16, 'c' );
        ingGa = new Ingredient( 'testGa', 2, 'ga' );
        ingLb = new Ingredient( 'testLb', 1, 'lb' );
        ingOz = new Ingredient( 'testOz', 16, 'oz' );
        ingTsp = new Ingredient( 'testTsp', 24, 'tsp' );
    });

    it('should find the correct index in the measurements array', () => {
        const result = service.getMeasurementIndex(new Ingredient('test', 1, 'c'));
        expect(result).toBe(5);
    });

    it('should convert amounts c -> g', () => {
        
        const result = service.convertAmount(ingGa, ingC);
        expect(result).toBe(1);
    });

    it( 'should convert amounts oz -> c', () => {
        const result = service.convertAmount( ingC, ingOz );
        expect( result ).toBe( 2 );
    } );

    it('should NOT convert amounts lb -> ga', () => {
        const result = service.convertAmount(ingGa, ingLb);
        expect(result).toBe(0);
    });

    it('should return a valid conversion oz -> c', () => {
        const result = service.isValid(ingC, ingOz);
        expect(result).toBeTruthy;
    });

    it('should upgrade measurements oz -> c', () => {
        const result = service.convertMeasurements(ingC, ingOz);
        expect(result).toBe('c');
    });

    it( 'should upgrade measurements tsp -> ga', () => {
        const result = service.convertMeasurements( ingGa, ingTsp );
        expect( result ).toBe( 'ga' );
    } );

    
})