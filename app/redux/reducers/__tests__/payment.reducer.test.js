import payment from '../payment.reducer';
import * as actions from '../../actions/index.actions';

describe('Payment reducer', () => {
  const initialState = {
    paymentItems: [],
    paymentStatus: {},
    savedCards: []
  };
  it('Should have the initial paymentItems set to empty array', () => {
    expect(payment(initialState, {}).paymentItems).toEqual([]);
    expect(payment(initialState, {}).paymentStatus).toEqual({});
    expect(payment(initialState, {}).savedCards).toEqual([]);
  });
  it('Should set the paymentItems', () => {
    const setPaymentItemsAction = {
      type: actions.SET_PAYMENT_ITEMS,
      payload: [{item: '123'}]
    };
    const result = {paymentItems: [{item: '123'}], paymentStatus: {}, savedCards: []};
    expect(payment(initialState, setPaymentItemsAction)).toEqual(result);
  });
  it('Should set the paymentStatus', () => {
    const setPaymentStatusAction = {
      type: actions.SET_PAYMENT_STATUS,
      payload: {
        status: 'SUCCESS'
      }
    };
    const result = {paymentItems: [], paymentStatus: {status: 'SUCCESS'}, savedCards: []};
    expect(payment(initialState, setPaymentStatusAction)).toEqual(result);
  });
  it('Should set the savedCards', () => {
    const setSavedCardsAction = {
      type: actions.SET_SAVED_CARDS,
      payload: [{id: 'card1'}]
    };
    const result = {paymentItems: [], paymentStatus: {}, savedCards: [{id: 'card1'}]};
    expect(payment(initialState, setSavedCardsAction)).toEqual(result);
  });
});
