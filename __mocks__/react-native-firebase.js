module.exports = {
  crash: () => ({
    setCrashCollectionEnabled: jest.fn()
  }),
  auth: () => ({
    signInAnonymously: jest.fn()
  }),
  database: () => ({
    ref: () => ({
      on: jest.fn()
    })
  }),
  config: () => ({
    fetch: jest.fn(),
    setDefaults: jest.fn(),
    getValue: jest.fn()
  }),
  messaging: jest.fn(() => ({
    requestPermissions: jest.fn(),
    subscribeToTopic: jest.fn(),
    getToken: jest.fn(Promise.resolve),
    onMessage: jest.fn(),
    getInitialNotification: jest.fn(Promise.resolve),
    onTokenRefresh: jest.fn()
  }))
};
