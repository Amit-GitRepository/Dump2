import result from 'lodash/result';
import {CLEAR_PAYMENT_DATA, LOGOUT_SUCCESS, REMOVE_CARD_SUCCESSFUL, SET_PAYMENT_ITEMS, SET_PAYMENT_STATUS, SET_SAVED_CARDS} from '../actions/index.actions';

const initialState = {
  paymentItems: [],
  paymentStatus: {},
  savedCards: {cards: []}
};

export default function payment (state = initialState, action) {
  switch (action.type) {
  case SET_PAYMENT_ITEMS:
    return {...state, paymentItems: result(action, 'payload', [])};
  case SET_PAYMENT_STATUS:
    return {...state, paymentStatus: result(action, 'payload', {})};
  case SET_SAVED_CARDS:
    return {...state, savedCards: result(action, 'payload', [])};
  case REMOVE_CARD_SUCCESSFUL: {
    // Shallow clone the array
    const cards = state.savedCards.cards.slice(0);
    const cardIndex = cards.findIndex((card) => card.id === action.payload);
    if (cardIndex > -1) {
      cards.splice(cardIndex, 1);
    }
    return {...state, savedCards: {...state.savedCards, cards}};
  }
  case CLEAR_PAYMENT_DATA:
    return initialState;
  case LOGOUT_SUCCESS:
    return initialState;
  default:
    return state;
  }
}
