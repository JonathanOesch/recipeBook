import { FractionPipes } from '../_pipes/fraction.pipes';

describe('FractionPipes', () => {
    let component: FractionPipes
    beforeEach(() => {
        component = new FractionPipes;
    })

    it('should return just a fraction', () => {
        const result = component.transform(.25);
        expect(result).toBe('1/4');
    })

    it('should return a number with a fraction', () => {
        const result = component.transform(4.33);
        expect(result).toBe('4 1/3');
    })

    it('should return a custom fraction', () => {
        const result = component.transform(.375);
        expect(result).toBe('3/8');
    })

    it('should return a custom mixed number', () => {
        const result = component.transform(5.95);
        expect(result).toBe('5 19/20');
    })
})