import { expect } from 'chai';
import { getCompletedTodos, getIncompleteTodos } from '../selectors';

describe('The getCompletedTodos selector', () => {
    it('Returns only completed todos', () => {
        const fakeTodos = [{
            text: 'Say Hello',
            isCompleted: true
        }, {
            text: ' Say Goodbye',
            isCompleted: false
        }, {
            text: ' Climb Mount Everest',
            isCompleted: false
        }];
        const expected = [{
            text: 'Say Hello',
            isCompleted: true
        }];
        const actual = getCompletedTodos.resultFunc(fakeTodos);
        /* eslint-disable jest/valid-expect */
        expect(actual).to.deep.equal(expected);
    });
});
describe('The getIncompleteTodos selector', () => {
    it('Returns only incomplete todos', () => {
        const fakeTodos = [{
            text: 'Say Hello',
            isCompleted: true
        }, {
            text: ' Say Goodbye',
            isCompleted: false
        }, {
            text: ' Climb Mount Everest',
            isCompleted: false
        }];
        const expected = [{
            text: ' Say Goodbye',
            isCompleted: false
        }, {
            text: ' Climb Mount Everest',
            isCompleted: false
        }];
        const actual = getIncompleteTodos.resultFunc(fakeTodos);
        /* eslint-disable jest/valid-expect */
        expect(actual).to.deep.equal(expected);
    });
});