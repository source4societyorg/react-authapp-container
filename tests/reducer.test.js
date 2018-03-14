import { fromJS, List as ImmutableList, Map as ImmutableMap } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import appReducer, {
  loginPostedReducerFunction,
  logoutPostedReducerFunction,
  loadedAuthFromLocalStorageReducerFunction,
  fetchedDoubleCookieReducerFunction,
  setApplicationAlertReducerFunction,
  resetApplicationAlertReducerFunction,
  initialState,
} from '../src/reducer';

import {
  LOGIN_POSTED,
  LOGOUT_POSTED,
  LOADED_AUTH_FROM_LOCAL_STORAGE,
  SET_APPLICATION_ALERT,
  RESET_APPLICATION_ALERT,
  FETCHED_DOUBLE_COOKIE,
} from '../src/constants';

const mockActionProperties = {
  jwt: 'mockJwt',
  userId: 'mockUserId',
  username: 'mockUsername',
  expires: 'mockExpires',
  userRoles: ['MOCK_USER_ROLE'],
  isAuthenticated: 'mockIsAuthenticated',
  jwtClaims: { hasProperties: 'mockJwtClaims' },
};

test('appReducer', () => {
  const mockState = fromJS({ hasProperties: 'mockState' });
  const mockAction = { hasProperties: 'mockAction' };
  const mockLoginPostedReducer = (state, action) => {
    expect(state).toEqual(mockState);
    expect(action).toEqual(mockAction);
    return 'mockLoginPostedReducerResponse';
  };
  const mockLogoutPostedReducer = (state, action) => {
    expect(state).toEqual(mockState);
    expect(action).toEqual(mockAction);
    return 'mockLogoutPostedReducerResponse';
  };
  const mockLoadedAuthFromLocalStorageReducer = (state, action) => {
    expect(state).toEqual(mockState);
    expect(action).toEqual(mockAction);
    return 'mockLoadedAuthFromLocalStorageReducerResponse';
  };
  const mockFetchedDoubleCookieReducer = (state, action) => {
    expect(state).toEqual(mockState);
    expect(action).toEqual(mockAction);
    return 'mockFetchedDoubleCookieReducerResponse';
  };
  const injectedSetApplicationAlertReducer = (state, action) => {
    expect(state).toEqual(mockState);
    expect(action).toEqual(mockAction);
    return 'injectedSetApplicationAlertReducerResponse';
  };
  const injectedResetApplicationAlertReducer = (state, action) => {
    expect(state).toEqual(mockState);
    expect(action).toEqual(mockAction);
    return 'injectedResetApplicationAlertReducerResponse';
  };

  mockAction.type = LOGIN_POSTED;
  let reducedState = appReducer(
    mockState,
    mockAction,
    mockLoginPostedReducer,
    mockLogoutPostedReducer,
    mockLoadedAuthFromLocalStorageReducer,
    mockFetchedDoubleCookieReducer,
    injectedSetApplicationAlertReducer,
    injectedResetApplicationAlertReducer
  );
  expect(reducedState).toEqual('mockLoginPostedReducerResponse');
  mockAction.type = LOGOUT_POSTED;
  reducedState = appReducer(
    mockState,
    mockAction,
    mockLoginPostedReducer,
    mockLogoutPostedReducer,
    mockLoadedAuthFromLocalStorageReducer,
    mockFetchedDoubleCookieReducer,
    injectedSetApplicationAlertReducer,
    injectedResetApplicationAlertReducer
  );
  expect(reducedState).toEqual('mockLogoutPostedReducerResponse');
  mockAction.type = LOADED_AUTH_FROM_LOCAL_STORAGE;
  reducedState = appReducer(
    mockState,
    mockAction,
    mockLoginPostedReducer,
    mockLogoutPostedReducer,
    mockLoadedAuthFromLocalStorageReducer,
    mockFetchedDoubleCookieReducer,
    injectedSetApplicationAlertReducer,
    injectedResetApplicationAlertReducer
  );
  expect(reducedState).toEqual('mockLoadedAuthFromLocalStorageReducerResponse');
  mockAction.type = SET_APPLICATION_ALERT;
  reducedState = appReducer(
    mockState,
    mockAction,
    mockLoginPostedReducer,
    mockLogoutPostedReducer,
    mockLoadedAuthFromLocalStorageReducer,
    mockFetchedDoubleCookieReducer,
    injectedSetApplicationAlertReducer,
    injectedResetApplicationAlertReducer
  );
  expect(reducedState).toEqual('injectedSetApplicationAlertReducerResponse');
  mockAction.type = RESET_APPLICATION_ALERT;
  reducedState = appReducer(
    mockState,
    mockAction,
    mockLoginPostedReducer,
    mockLogoutPostedReducer,
    mockLoadedAuthFromLocalStorageReducer,
    mockFetchedDoubleCookieReducer,
    injectedSetApplicationAlertReducer,
    injectedResetApplicationAlertReducer
  );
  expect(reducedState).toEqual('injectedResetApplicationAlertReducerResponse');
  mockAction.type = LOCATION_CHANGE;
  reducedState = appReducer(
    mockState,
    mockAction,
    mockLoginPostedReducer,
    mockLogoutPostedReducer,
    mockLoadedAuthFromLocalStorageReducer,
    mockFetchedDoubleCookieReducer,
    injectedSetApplicationAlertReducer,
    injectedResetApplicationAlertReducer
  );
  expect(reducedState).toEqual('injectedResetApplicationAlertReducerResponse');
  mockAction.type = FETCHED_DOUBLE_COOKIE;
  reducedState = appReducer(
    mockState,
    mockAction,
    mockLoginPostedReducer,
    mockLogoutPostedReducer,
    mockLoadedAuthFromLocalStorageReducer,
    mockFetchedDoubleCookieReducer,
    injectedSetApplicationAlertReducer,
    injectedResetApplicationAlertReducer
  );
  expect(reducedState).toEqual('mockFetchedDoubleCookieReducerResponse');
  mockAction.type = 'notinreducer';
  reducedState = appReducer(
    null,
    mockAction,
    mockLoginPostedReducer,
    mockLogoutPostedReducer,
    mockLoadedAuthFromLocalStorageReducer,
    mockFetchedDoubleCookieReducer,
    injectedSetApplicationAlertReducer,
    injectedResetApplicationAlertReducer
  );
  expect(reducedState).toEqual(initialState);
});

test('loginPostedReducer', () => {
  const mockState = fromJS({ hasProperties: 'mockState' });
  const mockAction = {
    type: LOGIN_POSTED,
    ...mockActionProperties,
  };
  const reducedState = loginPostedReducerFunction(mockState, mockAction);
  expect(reducedState.get('jwt')).toEqual(mockAction.jwt);
  expect(reducedState.get('userId')).toEqual(mockAction.userId);
  expect(reducedState.get('username')).toEqual(mockAction.username);
  expect(reducedState.get('expires')).toEqual(mockAction.expires);
  expect(reducedState.get('userRoles')).toEqual(ImmutableList(mockAction.userRoles));
  expect(reducedState.get('isAuthenticated')).toBeTruthy();
  expect(reducedState.get('jwtClaims')).toEqual(fromJS(mockAction.jwtClaims));
  expect(reducedState.get('hasProperties')).toEqual(mockState.get('hasProperties'));
});

test('logoutPostedReducer', () => {
  const mockState = fromJS({ hasProperties: 'mockState' });
  const mockAction = {
    type: LOGOUT_POSTED,
    ...mockActionProperties,
  };
  const reducedState = logoutPostedReducerFunction(mockState, mockAction);
  expect(reducedState.get('jwt')).toEqual(initialState.get('jwt'));
  expect(reducedState.get('userId')).toEqual(initialState.get('userId'));
  expect(reducedState.get('username')).toEqual(initialState.get('username'));
  expect(reducedState.get('userRoles')).toEqual(initialState.get('userRoles'));
  expect(reducedState.get('expires')).toEqual(initialState.get('expires'));
  expect(reducedState.get('isAuthenticated')).toBeFalsy();
  expect(reducedState.get('jwtClaims')).toEqual(initialState.get('jwtClaims'));
  expect(reducedState.get('hasProperties')).toEqual(mockState.get('hasProperties'));
});

test('loadedAuthFromLocalStorageReducer', () => {
  const mockState = fromJS({ hasProperties: 'mockState' });
  const mockAction = {
    type: LOADED_AUTH_FROM_LOCAL_STORAGE,
    ...mockActionProperties,
  };
  let reducedState = loadedAuthFromLocalStorageReducerFunction(mockState, mockAction);
  expect(reducedState.get('jwt')).toEqual(mockAction.jwt);
  expect(reducedState.get('userId')).toEqual(mockAction.userId);
  expect(reducedState.get('username')).toEqual(mockAction.username);
  expect(reducedState.get('userRoles')).toEqual(ImmutableList(mockAction.userRoles));
  expect(reducedState.get('expires')).toEqual(mockAction.expires);
  expect(reducedState.get('isAuthenticated')).toBeTruthy();
  expect(reducedState.get('jwtClaims')).toEqual(ImmutableMap(mockAction.jwtClaims));
  expect(reducedState.get('loadedAuthFromLocalStorage')).toBeTruthy();
  expect(reducedState.get('hasProperties')).toEqual(mockState.get('hasProperties'));
  mockAction.jwt = null;
  reducedState = loadedAuthFromLocalStorageReducerFunction(mockState, mockAction);
  expect(reducedState.get('loadedAuthFromLocalStorage')).toBeTruthy();
  expect(reducedState.get('hasProperties')).toEqual(mockState.get('hasProperties'));
  expect(reducedState.get('jwt', 'notset')).toEqual('notset');
  expect(reducedState.get('userId', 'notset')).toEqual('notset');
  expect(reducedState.get('username', 'notset')).toEqual('notset');
  expect(reducedState.get('userRoles', 'notset')).toEqual('notset');
  expect(reducedState.get('expires', 'notset')).toEqual('notset');
  expect(reducedState.get('isAuthenticated', 'notset')).toEqual('notset');
  expect(reducedState.get('jwtClaims', 'notset')).toEqual('notset');
});

test('fetchedDoubleCookieReducer', () => {
  const mockState = fromJS({ hasProperties: 'mockState' });
  const mockAction = {
    type: FETCHED_DOUBLE_COOKIE,
    ...mockActionProperties,
  };
  const reducedState = fetchedDoubleCookieReducerFunction(mockState, mockAction);
  expect(reducedState.get('doubleCookie')).toEqual(mockAction.doubleCookie);
  expect(reducedState.get('hasProperties')).toEqual(mockState.get('hasProperties'));
});

test('setApplicationAlertReducer', () => {
  const mockState = fromJS({ hasProperties: 'mockState' });
  const mockAction = {
    type: SET_APPLICATION_ALERT,
    message: { hasProperties: 'mockMessage' },
  };
  const reducedState = setApplicationAlertReducerFunction(mockState, mockAction);
  expect(reducedState.get('message')).toEqual(fromJS(mockAction.message));
  expect(reducedState.get('hasProperties')).toEqual(mockState.get('hasProperties'));
});

test('resetApplicationAlertReducer', () => {
  const mockState = fromJS({ hasProperties: 'mockState' });
  const mockAction = {
    type: RESET_APPLICATION_ALERT,
    message: { hasProperties: 'mockMessage' },
  };
  const reducedState = resetApplicationAlertReducerFunction(mockState, mockAction);
  expect(reducedState.get('message')).toEqual(initialState.get('message'));
  expect(reducedState.get('hasProperties')).toEqual(mockState.get('hasProperties'));
});
