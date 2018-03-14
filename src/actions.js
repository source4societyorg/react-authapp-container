import {
  LOGIN_POSTED,
  LOGOUT_POSTED,
  APP_CLICK,
  FETCH_LOCAL_STORAGE_ITEM,
  FETCHED_LOCAL_STORAGE_ITEM,
  LOADED_LOCAL_STORAGE,
  PLACED_IN_LOCAL_STORAGE,
  PLACE_IN_LOCAL_STORAGE,
  LOAD_AUTH_FROM_LOCAL_STORAGE,
  LOADED_AUTH_FROM_LOCAL_STORAGE,
  SET_APPLICATION_ALERT,
  RESET_APPLICATION_ALERT,
  FETCHED_DOUBLE_COOKIE,
  POST_FILTER,
  APPLICATION_ERROR,
} from './constants';

export function loadAuthFromLocalStorage() {
  return {
    type: LOAD_AUTH_FROM_LOCAL_STORAGE,
  };
}

export function loadedAuthFromLocalStorage(jwt, userId, username, userRoles, expires, jwtClaims) {
  return {
    type: LOADED_AUTH_FROM_LOCAL_STORAGE,
    jwt,
    userId,
    username,
    userRoles,
    expires,
    jwtClaims,
  };
}

export function fetchedLocalStorageItem(key, value) {
  return {
    type: FETCHED_LOCAL_STORAGE_ITEM,
    key,
    value,
  };
}

export function fetchLocalStorageItem(key, defaultValue) {
  return {
    type: FETCH_LOCAL_STORAGE_ITEM,
    key,
    defaultValue,
  };
}

export function loadedLocalStorage() {
  return {
    type: LOADED_LOCAL_STORAGE,
  };
}

export function placedInLocalStorage(key, value) {
  return {
    type: PLACED_IN_LOCAL_STORAGE,
    key,
    value,
  };
}

export function placeInLocalStorage(key, value) {
  return {
    type: PLACE_IN_LOCAL_STORAGE,
    key,
    value,
  };
}

export function appClick(event) {
  return {
    type: APP_CLICK,
    event,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_POSTED,
  };
}

export function loginPosted(jwt, userId, username, userRoles, expires, jwtClaims, data) {
  return {
    type: LOGIN_POSTED,
    jwt,
    userId,
    username,
    userRoles,
    expires,
    jwtClaims,
    data,
  };
}

export function setApplicationAlert(message) {
  return {
    type: SET_APPLICATION_ALERT,
    message,
  };
}

export function resetApplicationAlert() {
  return {
    type: RESET_APPLICATION_ALERT,
  };
}

export function fetchedDoubleCookie(doubleCookie) {
  return {
    type: FETCHED_DOUBLE_COOKIE,
    doubleCookie,
  };
}

export function postFilter(reducerKey, apiCall, formTitle, filter, formValues) {
  return {
    type: POST_FILTER,
    reducerKey,
    apiCall,
    formTitle,
    filter,
    formValues,
  };
}

export function applicationError(error) {
  return {
    type: APPLICATION_ERROR,
    error,
  };
}
