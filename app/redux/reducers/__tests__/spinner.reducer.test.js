import spinner from '../spinner.reducer';
import * as actions from '../../actions/index.actions';

describe('Show spinner reducer', () => {
  const initialState = {count: 0};
  // check for immutable object
  Object.freeze(initialState);
  it('should have the initial value as 0', () => {
    expect(spinner(undefined, {})).toEqual(initialState);
  });
  it('should set the value of count spinner as 1', () => {
    const incAction = {
      type: actions.SPINNER_SHOW
    };
    const result = {count: 1};
    expect(spinner(initialState, incAction)).toEqual(result);
  });
  it('should set the value of count spinner as 0 if initial state has 0', () => {
    const incAction = {
      type: actions.SPINNER_HIDE
    };
    const result = {count: 0};
    expect(spinner(initialState, incAction)).toEqual(result);
  });
  it('should set the value of count spinner as 0 if initail state has show spinner', () => {
    const incAction = {
      type: actions.SPINNER_HIDE
    };
    const initialState = {count: 1};
    const result = {count: 0};
    expect(spinner(initialState, incAction)).toEqual(result);
  });
});
