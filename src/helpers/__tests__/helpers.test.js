import {isValidEmail} from '../isValidEmail'
import {roundTo, roundToExactly} from '../roundTo'

describe('isValidEmail helper', () => {

    it('should return false for emails without @', () => {
        expect(isValidEmail('test.com')).toBeFalsy();
    });
    
    it('should return false for emails without .', () => {
        expect(isValidEmail('test@com')).toBeFalsy();
    });
    
    it('should return truth for correct emails', () => {
        expect(isValidEmail('test@asd.com')).toBeTruthy();
    });
});

describe('roundTo helper', () => {

    it('should round given number to 10', () => {
        expect(roundTo(123.123123123, 2)).toBe(123.12);
    });
    
    it('should roundToExactly given number to 10', () => {
        expect(roundToExactly(123.123123123, 3)).toBe("123.123");
    });
});