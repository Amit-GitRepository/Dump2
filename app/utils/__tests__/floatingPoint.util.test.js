import {add, subtract} from '../floatingPoint.util';

describe('add function', () => {
  it('should return the sum of the two floats', () => {
    const val1 = 5.38, val2 = 4.62;
    expect(add(val1, val2)).toEqual(10);
  });
});

describe('subtract function', () => {
  it('should return the difference of the two floats', () => {
    const val1 = 5.38, val2 = 4.62;
    expect(subtract(val1, val2)).toEqual(0.76);
  });
});