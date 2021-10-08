import { expect } from 'chai';
import { getBorderStyleForDate } from '../TodoListItem';

describe('The getBorderStyleForDate func', () => {
    it('Returns none when the date is less than 5 days ago', () => {
        const today = Date.now();
        const recentDate = new Date(Date.now()-  86400000 * 3)
        const actual = getBorderStyleForDate(recentDate, today);
        const expected = 'none';
        /* eslint-disable jest/valid-expect */
        expect(actual).to.deep.equal(expected);
    });
    it('Returns a border when the date is more than 5 days ago', () => {
        const recentDate = new Date(Date.now()-  86400000 * 5)
        const today = Date.now();
        const actual = getBorderStyleForDate(recentDate, today);
        const expected = '2px solid red';
        /* eslint-disable jest/valid-expect */
        expect(actual).to.deep.equal(expected);
    });
});
