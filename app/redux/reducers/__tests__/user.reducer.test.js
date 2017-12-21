import user from '../user.reducer';
import * as actions from '../../actions/index.actions';

describe('User reducer', () => {
  const initialState = {language: 'th', profile: {}, accessToken: null};
  it('Should have the profile object set to {}', () => {
    expect(user(initialState, {}).profile).toEqual({});
  });
  it('Should have the initial preferred language set to th', () => {
    expect(user(initialState, {}).language).toEqual('th');
  });
  it('Should set the accessToken when login is valid', () => {
    const setAccessTokenAction = {
      type: actions.SET_ACCESS_TOKEN_AND_PROFILE,
      payload: {accessToken: 'xyzdjfbvkebvjef', profile: {name: 'apurva'}}
    };
    const result = {accessToken: 'xyzdjfbvkebvjef', language: 'th', profile: {name: 'apurva'}};
    expect(user(initialState, setAccessTokenAction)).toEqual(result);
  });
  it('Should change the profile object when login succeed', () => {
    const loginSuccessAction = {
      type: actions.LOGIN_SUCCESS,
      payload: {profile: {name: 'xyz', email: 'xyz@gmail.com'}, accessToken: 'xyzdjfbvkebvjef'}
    };
    const result = {accessToken: 'xyzdjfbvkebvjef', language: 'th', profile: {name: 'xyz', email: 'xyz@gmail.com'}};
    expect(user(initialState, loginSuccessAction)).toEqual(result);
  });
  it('Should change the profile object when login fails', () => {
    const loginFailureAction = {
      type: actions.LOGIN_FAILURE
    };
    const result = {accessToken: null, language: 'th', profile: {}};
    expect(user(initialState, loginFailureAction)).toEqual(result);
  });
  it('Should change the profile object on register success', () => {
    const registerSuccessAction = {
      type: actions.REGISTER_SUCCESS,
      payload: {profile: {name: 'xyz', email: 'xyz@gmail.com'}, accessToken: 'xyzdjfbvkebvjef'}
    };
    const result = {accessToken: 'xyzdjfbvkebvjef', language: 'th', profile: {name: 'xyz', email: 'xyz@gmail.com'}};
    expect(user(initialState, registerSuccessAction)).toEqual(result);
  });
  it('Should change the profile object on register failure', () => {
    const registerFailureAction = {
      type: actions.REGISTER_FAILURE
    };
    const result = {accessToken: null, language: 'th', profile: {}};
    expect(user(initialState, registerFailureAction)).toEqual(result);
  });
  it('Should reset the profile and accessToken on logout success', () => {
    const newState = {language: 'th', profile: {name: 'avrupa'}, accessToken: 'abcd'};
    const logoutSuccessAction = {
      type: actions.LOGOUT_SUCCESS
    };
    const result = {accessToken: null, language: 'th', profile: {}};
    expect(user(newState, logoutSuccessAction)).toEqual(result);
  });
  it('Should change the language when to a user selected one', () => {
    const changeLanguageAction = {
      type: actions.CHANGE_LANGUAGE,
      payload: {language: 'en'}
    };
    const result = {accessToken: null, language: 'en', profile: {}};
    expect(user(initialState, changeLanguageAction)).toEqual(result);
  });
  it('Should set the language to user default preferred one', () => {
    const setPreferenceAction = {
      type: actions.SET_PREFERENCES,
      payload: {language: 'en'}
    };
    const result = {accessToken: null, language: 'en', profile: {}};
    expect(user(initialState, setPreferenceAction)).toEqual(result);
  });
});
