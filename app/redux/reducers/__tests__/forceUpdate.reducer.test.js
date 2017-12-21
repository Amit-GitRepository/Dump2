import forceUpdate from '../forceUpdate.reducer';
import {notifyAlertHidden, notifyAlertVisible} from '../../actions/index.actions';

describe('forceUpdate reducer', () => {
  const initialState = {
    isUpdateAlertVisible: false,
    forced: false,
    appLinks: {}
  };
  it('should have an initial state with isUpdateAlertVisible false', () => {
    expect(forceUpdate(undefined, {})).toEqual(initialState);
  });
  it('FORCE_UPDATE_ALERT_VISIBLE: should set forced to true, isUpdateAlertVisible to true and appLinks to the payloads appLinks', () => {
    const visibleAction = notifyAlertVisible({
      forced: true,
      appLinks: {
        playStoreUrl: 'dummyAndroidLink',
        appStoreUrl: 'dummyIosLink'
      }
    });
    expect(forceUpdate(initialState, visibleAction)).toEqual({...visibleAction.payload, isUpdateAlertVisible: true});
  });
  it('FORCE_UPDATE_ALERT_HIDDEN:should set isUpdateAlertVisible to false', () => {
    const hideAction = notifyAlertHidden();
    expect(forceUpdate(initialState, hideAction)).toEqual({...initialState, isUpdateAlertVisible: false});
  });
});