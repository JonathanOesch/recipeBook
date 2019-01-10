import { Ingredient } from "./ingredient.model";

export class Recipe {
    public id: number;
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];
    public steps: {stepNum: number, description: string}[];

    constructor(name:string, description: string, imagePath: string, ingredients: Ingredient[], steps: {stepNum: number, description: string}[]) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        this.steps = steps;
    }
}