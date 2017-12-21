import networkStatus from '../networkStatus.reducer';
import {SET_NETWORK_STATUS} from '../../actions/index.actions';

describe('Reducer: networkStatus', () => {
  const initialState = {
    isConnected: true,
    isNetworkBarHighlighted: false
  };

  it('should return default state by default', () => {
    expect(networkStatus(initialState, '')).toEqual({
      isConnected: true,
      isNetworkBarHighlighted: false
    });
  });

  it('should set the network status', () => {
    const action = {
      type: SET_NETWORK_STATUS,
      payload: true
    };
    const expectedResult = {
      isConnected: true
    };
    expect(networkStatus(initialState, action)).toEqual(expectedResult);
  });
});
