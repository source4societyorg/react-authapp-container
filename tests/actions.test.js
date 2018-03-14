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
} from '../src/constants';

import {
  loadAuthFromLocalStorage,
  loadedAuthFromLocalStorage,
  fetchedLocalStorageItem,
  fetchLocalStorageItem,
  loadedLocalStorage,
  placedInLocalStorage,
  placeInLocalStorage,
  appClick,
  logoutUser,
  loginPosted,
  setApplicationAlert,
  resetApplicationAlert,
  fetchedDoubleCookie,
  postFilter,
  applicationError,
} from '../src/actions';

test('loadAuthFromLocalStorage returns an object of type LOAD_AUTH_FROM_LOCAL_STORAGE', () => {
  const action = loadAuthFromLocalStorage();
  expect(action.type).toEqual(LOAD_AUTH_FROM_LOCAL_STORAGE);
});

test('loadedAuthFromLocalStorage returns an object of type LOADED_AUTH_FROM_LOCAL_STORAGE with proper action values', () => {
  const mockJwt = 'mockJwt';
  const mockUserId = 'mockUserId';
  const mockUsername = 'mockUsername';
  const mockUserRoles = 'mockUserRoles';
  const mockExpires = 'mockExpires';
  const mockJwtClaims = 'mockJwtClaims';
  const action = loadedAuthFromLocalStorage(mockJwt, mockUserId, mockUsername, mockUserRoles, mockExpires, mockJwtClaims);
  expect(action.type).toEqual(LOADED_AUTH_FROM_LOCAL_STORAGE);
  expect(action.jwt).toEqual(mockJwt);
  expect(action.userId).toEqual(mockUserId);
  expect(action.username).toEqual(mockUsername);
  expect(action.userRoles).toEqual(mockUserRoles);
  expect(action.expires).toEqual(mockExpires);
  expect(action.jwtClaims).toEqual(mockJwtClaims);
});

test('fetchedLocalStorageItem returns action of type FETCHED_LOCAL_STORAGE_ITEM with key,value pair passed in to creator', () => {
  const mockKey = 'mockKey';
  const mockValue = 'mockValue';
  const action = fetchedLocalStorageItem(mockKey, mockValue);
  expect(action.type).toEqual(FETCHED_LOCAL_STORAGE_ITEM);
  expect(action.key).toEqual(mockKey);
  expect(action.value).toEqual(mockValue);
});

test('fetchLocalStorageItem return action of type FETCH_LOCAL_STORAGE_ITEM with key and default value', () => {
  const mockKey = 'mockKey';
  const mockDefaultValue = 'mockDefaultValue';
  const action = fetchLocalStorageItem(mockKey, mockDefaultValue);
  expect(action.type).toEqual(FETCH_LOCAL_STORAGE_ITEM);
  expect(action.key).toEqual(mockKey);
  expect(action.defaultValue).toEqual(mockDefaultValue);
});

test('loadedLocalStorage returns action of type LOADED_LOCAL_STORAGE', () => {
  const action = loadedLocalStorage();
  expect(action.type).toEqual(LOADED_LOCAL_STORAGE);
});

test('placedInLocalStorage returns action of type PLACED_IN_LOCAL_STORAGE with key and value properties properly defined', () => {
  const mockKey = 'mockKey';
  const mockValue = 'mockValue';
  const action = placedInLocalStorage(mockKey, mockValue);
  expect(action.type).toEqual(PLACED_IN_LOCAL_STORAGE);
  expect(action.key).toEqual(mockKey);
  expect(action.value).toEqual(mockValue);
});

test('placeInLocalStorage returns action of type PLACE_IN_LOCAL_STORAGE with key and value propertes properly defined', () => {
  const mockKey = 'mockKey';
  const mockValue = 'mockValue';
  const action = placeInLocalStorage(mockKey, mockValue);
  expect(action.type).toEqual(PLACE_IN_LOCAL_STORAGE);
  expect(action.key).toEqual(mockKey);
  expect(action.value).toEqual(mockValue);
});

test('appClick returns action of type APP_CLICK with the event property', () => {
  const mockEvent = { hasProperties: 'mockEvent' };
  const action = appClick(mockEvent);
  expect(action.type).toEqual(APP_CLICK);
  expect(action.event).toEqual(mockEvent);
});

test('logoutUser returns action of type LOGOUT_POSTED', () => {
  const action = logoutUser();
  expect(action.type).toEqual(LOGOUT_POSTED);
});

test('loginPosted returns action of type LOGIN_POSTED with properties properly defined', () => {
  const mockJwt = 'mockJwt';
  const mockUserId = 'mockUserId';
  const mockUsername = 'mockUsername';
  const mockUserRoles = 'mockUserRoles';
  const mockExpires = 'mockExpires';
  const mockJwtClaims = 'mockJwtClaims';
  const mockData = 'mockData';
  const action = loginPosted(mockJwt, mockUserId, mockUsername, mockUserRoles, mockExpires, mockJwtClaims, mockData);
  expect(action.type).toEqual(LOGIN_POSTED);
  expect(action.jwt).toEqual(mockJwt);
  expect(action.userId).toEqual(mockUserId);
  expect(action.username).toEqual(mockUsername);
  expect(action.userRoles).toEqual(mockUserRoles);
  expect(action.expires).toEqual(mockExpires);
  expect(action.jwtClaims).toEqual(mockJwtClaims);
  expect(action.data).toEqual(mockData);
});

test('setApplicationAlert returns action of type SET_APPLICATION_ALERT and the message', () => {
  const mockMessage = 'mockMessage';
  const action = setApplicationAlert(mockMessage);
  expect(action.type).toEqual(SET_APPLICATION_ALERT);
  expect(action.message).toEqual(mockMessage);
});

test('resetApplicationAlert returns action of type RESET_APPLICATION_ALERT', () => {
  const action = resetApplicationAlert();
  expect(action.type).toEqual(RESET_APPLICATION_ALERT);
});

test('fetchedDoubleCookie returns action of type FETCHED_DOUBLE_COOKIE with the doubleCookie property', () => {
  const mockDoubleCookie = 'mockDoubleCookie';
  const action = fetchedDoubleCookie(mockDoubleCookie);
  expect(action.type).toEqual(FETCHED_DOUBLE_COOKIE);
  expect(action.doubleCookie).toEqual(mockDoubleCookie);
});

test('postFilter returns action of type POST_FILTER with properties properly set', () => {
  const mockReducerKey = 'mockReducerKey';
  const mockApiCall = 'mockApiCall';
  const mockFormTitle = 'mockFormTitle';
  const mockFilter = 'mockFilter';
  const mockFormValues = 'mockFormValues';
  const action = postFilter(mockReducerKey, mockApiCall, mockFormTitle, mockFilter, mockFormValues);
  expect(action.type).toEqual(POST_FILTER);
  expect(action.reducerKey).toEqual(mockReducerKey);
  expect(action.apiCall).toEqual(mockApiCall);
  expect(action.formTitle).toEqual(mockFormTitle);
  expect(action.filter).toEqual(mockFilter);
  expect(action.formValues).toEqual(mockFormValues);
});

test('applicationError returns action of type APPLICATION_ERROR and the error object', () => {
  const mockError = new Error('mockError');
  const action = applicationError(mockError);
  expect(action.type).toEqual(APPLICATION_ERROR);
  expect(action.error).toEqual(mockError);
});
