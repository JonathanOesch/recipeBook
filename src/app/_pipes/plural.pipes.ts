import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'plural'
})
export class PluralPipes implements PipeTransform {

    transform(value: string) {
        return value + 's';
    }
}