import { fromJS, List as ImmutableList } from 'immutable';
import { valueOrDefault, isEmpty } from '@source4society/scepter-utility-lib';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  LOGIN_POSTED,
  LOGOUT_POSTED,
  LOADED_AUTH_FROM_LOCAL_STORAGE,
  SET_APPLICATION_ALERT,
  RESET_APPLICATION_ALERT,
  FETCHED_DOUBLE_COOKIE,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  jwt: '',
  userId: '',
  username: '',
  isAuthenticated: false,
  userRoles: [],
  expires: 0,
  loadedAuthFromLocalStorage: false,
  message: {},
  doubleCookie: '',
  jwtClaims: {},
});

export const loginPostedReducerFunction = (state, action) =>
  state
    .set('jwt', action.jwt)
    .set('userId', action.userId)
    .set('username', action.username)
    .set('expires', action.expires)
    .set('userRoles', ImmutableList(action.userRoles))
    .set('isAuthenticated', true)
    .set('jwtClaims', fromJS(action.jwtClaims));

export const logoutPostedReducerFunction = (state) =>
  state
    .set('jwt', initialState.get('jwt'))
    .set('userId', initialState.get('userId'))
    .set('username', initialState.get('username'))
    .set('userRoles', initialState.get('userRoles'))
    .set('expires', initialState.get('expires'))
    .set('isAuthenticated', false)
    .set('jwtClaims', initialState.get('jwtClaims'));

export const loadedAuthFromLocalStorageReducerFunction = (state, action) => {
  if (!isEmpty(action.jwt)) {
    return state
    .set('jwt', action.jwt)
    .set('userId', action.userId)
    .set('username', action.username)
    .set('userRoles', ImmutableList(action.userRoles))
    .set('expires', action.expires)
    .set('isAuthenticated', true)
    .set('jwtClaims', fromJS(action.jwtClaims))
    .set('loadedAuthFromLocalStorage', true);
  }
  return state
    .set('loadedAuthFromLocalStorage', true);
};

export const fetchedDoubleCookieReducerFunction = (state, action) =>
  state
    .set('doubleCookie', action.doubleCookie);

export const setApplicationAlertReducerFunction = (state, action) =>
  state
    .set('message', fromJS(action.message));

export const resetApplicationAlertReducerFunction = (state) =>
  state
    .set('message', initialState.get('message'));

export default function appReducer(
  injectedState,
  action,
  injectedLoginPostedReducer,
  injectedLogoutPostedReducer,
  injectedLoadedAuthFromLocalStorageReducer,
  injectedFetchedDoubleCookieReducer,
  injectedSetApplicationAlertReducer,
  injectedResetApplicationAlertReducer
) {
  const state = valueOrDefault(injectedState, initialState);
  const loginPostedReducer = valueOrDefault(injectedLoginPostedReducer, loginPostedReducerFunction);
  const logoutPostedReducer = valueOrDefault(injectedLogoutPostedReducer, logoutPostedReducerFunction);
  const loadedAuthFromLocalStorageReducer = valueOrDefault(injectedLoadedAuthFromLocalStorageReducer, loadedAuthFromLocalStorageReducerFunction);
  const fetchedDoubleCookieReducer = valueOrDefault(injectedFetchedDoubleCookieReducer, fetchedDoubleCookieReducerFunction);
  const setApplicationAlertReducer = valueOrDefault(injectedSetApplicationAlertReducer, setApplicationAlertReducerFunction);
  const resetApplicationAlertReducer = valueOrDefault(injectedResetApplicationAlertReducer, resetApplicationAlertReducerFunction);
  switch (action.type) {
    case LOGIN_POSTED:
      return loginPostedReducer(state, action);
    case LOGOUT_POSTED:
      return logoutPostedReducer(state, action);
    case LOADED_AUTH_FROM_LOCAL_STORAGE:
      return loadedAuthFromLocalStorageReducer(state, action);
    case FETCHED_DOUBLE_COOKIE:
      return fetchedDoubleCookieReducer(state, action);
    case SET_APPLICATION_ALERT:
      return setApplicationAlertReducer(state, action);
    case LOCATION_CHANGE:
    case RESET_APPLICATION_ALERT:
      return resetApplicationAlertReducer(state, action);
    default:
      return state;
  }
}
