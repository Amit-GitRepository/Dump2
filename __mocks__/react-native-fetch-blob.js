const mock = {
  DocumentDir: () => {},
  config: () => {
    const requestMock = {
      fetch: jest.fn()
    };
    return requestMock;
  },
  fetch: () => {},
  fs: {
    dirs: {}
  },
  android: {
    actionViewIntent: jest.fn()
  }
};
export default  mock;
