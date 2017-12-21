jest.mock('../localStorage.util.js', () => ({
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  updateItem: jest.fn()
}));

import localStorage from '../localStorage.util';
import versionControlConfig from '../../config/versionControl.config';
import {getAlertConfig, updateNotificationRetries} from '../forceUpdate.util';

describe('update notification retries', () => {
  it('should call the setItem with notificationRetries argument and currentVersion arg when notificationRetries is null', async () => {
    await updateNotificationRetries();
    expect(localStorage.setItem).toHaveBeenCalledWith('currentVersion', '1.5.6');
    expect(localStorage.setItem).toHaveBeenCalledWith('notificationRetries', 0);
  });

  it('should set the notfication retries only if currentVersion is not null', async () => {
    localStorage.getItem.mockImplementation((key) => {
      switch (key) {
      case 'currentVersion':
        return '1.5.6';
      case 'notificationRetries':
        return null;
      }
    });
    await updateNotificationRetries();
    expect(localStorage.setItem).toBeCalledWith('notificationRetries', 0);
  });

  it('should set notificationretries to 0 when current Item is not equal to current version on device', async () => {
    localStorage.getItem.mockImplementation((key) => {
      switch (key) {
      case 'currentVersion':
        return '1.0.0';
      case 'notificationRetries':
        return 0;
      }
    });
    await updateNotificationRetries();
    expect(localStorage.setItem).toHaveBeenCalledWith('notificationRetries', 0);
    expect(localStorage.setItem).toHaveBeenCalledWith('currentVersion', '1.5.6');
  });
});

describe('getAlertConfig', () => {
  it('should return a promise', () => {
    const result = getAlertConfig(versionControlConfig, true);
    expect(result).resolves;
  });
});