import popup from '../popup.reducer';
import * as actions from '../../actions/index.actions';

describe('Show spinner reducer', () => {
  const initialState = {
    message: {
      title: '',
      body: '',
      buttons: [
        {
          title: ''
        }
      ]
    },
    isOpen: false
  };

  // check for immutable object
  Object.freeze(initialState);
  it('should have the initial value', () => {
    expect(popup(undefined, {})).toEqual(initialState);
  });
  it('should set the value of isOpen as true', () => {
    const incAction = {
      type: actions.POPUP_SHOW
    };
    const result = {
      message: undefined,
      isOpen: true
    };
    expect(popup(initialState, incAction)).toEqual(result);
  });
  it('should set the value of state as initial state on popup hide', () => {
    const incAction = {
      type: actions.POPUP_HIDE
    };
    const result = initialState;
    expect(popup(initialState, incAction)).toEqual(result);
  });
});
