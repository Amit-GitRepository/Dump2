import React from 'react';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';
import {configure, shallow} from 'enzyme';
import {CustomBorderedTouchable} from '../../../components/Shared/Touchable/Touchable.component';
import {generateCloseButton, generateDrawerHamburger, getPaymentStatusHeader, getStackNavOption} from '../route.helper';
import {translate} from '../../../language/i18n/helper';

configure({adapter: new ReactSixteenAdapter()});

describe('Route Helper', () => {
  it('should generate hamburger icon component', () => {
    const wrapper = shallow(generateDrawerHamburger({}, 'test'));
    const wrapperName = wrapper.type();
    expect(wrapperName).toEqual(CustomBorderedTouchable);
  });
  it('generateCloseButton: should close button', () => {
    const wrapper = shallow(generateCloseButton());
    const wrapperName = wrapper.type();
    expect(wrapperName).toEqual(CustomBorderedTouchable);
  });
  it('should find route title from route in section', () => {
    const current = {
      navigation: {
        state: {
          routeName: 'StoreLocator'
        }
      }
    };
    const titleKey = 'SIDE_MENU__TRUE_SHOP';
    const navOptions = getStackNavOption(current);
    expect(navOptions.title).toEqual(translate(titleKey));
  });
  it('should calculate stack navigationOptions', () => {
    const current = {
      navigation: {
        state: {
          routeName: 'StoreLocator'
        }
      }
    };
    const titleKey = 'SIDE_MENU__TRUE_SHOP';
    const navOption = {
      headerLeft: generateDrawerHamburger(current, 'menu'),
      title: translate(titleKey),
      headerStyle: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        elevation: 0,
        paddingHorizontal: 10
      }
    };
    const receivedVal = getStackNavOption(current);
    expect(receivedVal.headerStyle).toEqual(navOption.headerStyle);
    expect(receivedVal.title).toEqual(navOption.title);
    expect(shallow(receivedVal.headerLeft).type()).toEqual(CustomBorderedTouchable);
  });
  it('getPaymentStatusHeader: should return header for payment status screen', () => {
    const current = {
      navigation: {
        state: {
          routeName: 'StoreLocator'
        }
      }
    };
    const titleKey = 'SIDE_MENU__TRUE_SHOP';
    const receivedVal = getPaymentStatusHeader(current);
    expect(shallow(receivedVal.headerLeft).type()).toEqual(CustomBorderedTouchable);
    expect(receivedVal.title).toBe(translate(titleKey));
    expect(shallow(receivedVal.headerRight).type()).toEqual(CustomBorderedTouchable);
  });
});
