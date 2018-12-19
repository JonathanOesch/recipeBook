import { PipeTransform, Pipe } from "@angular/core";

enum frac {
    ONE_EIGHTH = .125,
    ONE_FOURTH = .25,
    ONE_THIRD = .33,
    HALF = .5,
    TWO_THIRDS = .66,
    THREE_FOURTHS = .75,
    WHOLE = 0
}

@Pipe({
    name: 'fraction'
})
export class FractionPipes implements PipeTransform {
    transform(value: number) {
        const wholeValue = Math.floor(value);
        const remainder = +((value - wholeValue).toFixed(3));
        if(remainder === frac.ONE_EIGHTH) {
            return wholeValue > 0 ? wholeValue + ' 1/8' : '1/8';
        } else if (remainder === frac.ONE_FOURTH) {
            return wholeValue > 0 ? wholeValue + ' 1/4' : '1/4';
        } else if (remainder === frac.ONE_THIRD) {
            return wholeValue > 0 ? wholeValue + ' 1/3' : '1/3';
        } else if (remainder === frac.HALF) {
            return wholeValue > 0 ? wholeValue + ' 1/2' : '1/2';
        } else if (remainder === frac.TWO_THIRDS) {
            return wholeValue > 0 ? wholeValue + ' 2/3' : '2/3';
        } else if (remainder === frac.THREE_FOURTHS) {
            return wholeValue > 0 ? wholeValue + ' 3/4' : '3/4';
        } else if (remainder === frac.WHOLE) {
            return value;
        } else {
            return wholeValue > 0 ? wholeValue + ' ' + this.customFraction( remainder ) : this.customFraction( remainder );
        }
    }

    private customFraction(value: number): string {
        const bottom: number = 1000;
        const top: number = 1000 * value;
        const gcd: number = this.getGcd(top, bottom);
        
        return (top / gcd) + '/' + (bottom / gcd);
    }

    private getGcd(num1: number, num2: number): number {
        const remainder: number = num2 % num1;

        return remainder === 0 ? num1 : this.getGcd(remainder, num1);
    }
}