import mapConfig from '../../config/map.config';
import result from 'lodash/result';
import storeInfo from '../../config/storeInfo.config';
import {translate} from '../../language/i18n/helper';
import * as actions from '../actions/index.actions';

const initialState = {
  selectedProvince: null,
  selectedService: '',
  nearByStores: [],
  filteredStores: [],
  radiusKM: 15,
  allStores: storeInfo
};

const getFilteredStores = (input, language, allStores) => {
  const filteredStores =  allStores.data
    .filter((store) => result(store, `address[${language}]`, '')
      .toLowerCase()
      .includes(input.toLowerCase()));
  return filteredStores.length < 1 ? [{storeName: translate('STORE_LOCATOR_STORE_NOT_FOUND')}] : filteredStores;
};

export default function storeLocator (state = initialState, {type, payload}) {
  switch (type) {
  case actions.UPDATE_NEARBY_STORES:
    return {...state, nearByStores: payload};
  case actions.UPDATE_KM_RADIUS:
    return {...state, radiusKM: payload};
  case actions.SET_PROVINCE:
    return {...state, selectedProvince: payload.province, nearByStores: payload.nearByStores, radiusKM: mapConfig.distanceLimit.province};
  case actions.CLEAR_PROVINCE:
    return {...state, selectedProvince: null};
  case actions.SET_SERVICE:
    return {...state, selectedService: payload.service, nearByStores: payload.nearByStores};
  case actions.CLEAR_SERVICE:
    return {...state, selectedService: ''};
  case actions.CHANGE_SEARCH_TEXT: {
    const {language, input} = payload;
    const filteredStores = getFilteredStores(input, language, state.allStores);
    return {...state, filteredStores};
  }
  case actions.CLEAR_FILTERED_STORES:
    return {...state, filteredStores: []};
  default:
    return state;
  }
}
