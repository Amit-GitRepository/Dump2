import storeLocator from '../storeLocator.reducer';
import {translate} from '../../../language/i18n/helper';
import * as actions from '../../actions/index.actions';

describe('storeLocator reducer', () => {
  it('should have the initial value as false', () => {
    const initialState = storeLocator(undefined, {});
    expect(initialState).toHaveProperty('selectedProvince');
    expect(initialState).toHaveProperty('selectedService');
    expect(initialState).toHaveProperty('nearByStores');
    expect(initialState).toHaveProperty('filteredStores');
    expect(initialState).toHaveProperty('radiusKM');
    expect(initialState).toHaveProperty('allStores');
  });
  it('CHANGE_SEARCH_TEXT: should return filteredStores on text change', () => {
    const initialState = {allStores: {data: [
      {address: {th: 'Pat'}},
      {address: {th: 'patt'}},
      {address: {th: 'Bangkok'}}
    ]},
    filteredStores: []};
    const action = actions.changeSearchText({language: 'th', input: 'pa'});
    const expected = [{address: {th: 'Pat'}},
      {address: {th: 'patt'}}];
    expect(storeLocator(initialState, action).filteredStores).toEqual(expected);
  });
  it('CHANGE_SEARCH_TEXT: should return error if store not found', () => {
    const initialState = {allStores: {data: []}, filteredStores: []};
    const action = actions.changeSearchText({language: 'th', input: 'pa'});
    const expected = [{storeName: translate('STORE_LOCATOR_STORE_NOT_FOUND')}];
    expect(storeLocator(initialState, action).filteredStores).toEqual(expected);
  });
  it('CLEAR_FILTERED_STORES: should clear filteredStores key in the store', () => {
    const initialState = {allStores: {data: []}, filteredStores: [{'someKey': 'someVal'}]};
    const action = actions.clearFilteredStores();
    expect(storeLocator(initialState, action).filteredStores).toEqual([]);
  });
});
