import { takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import localStorageData, {
    makeApiCall,
    sagaHandler,
    handleDoubleCookieFunction,
    fetchLocalStorageData,
    putInLocalStorage,
    loadAuthDataFromLocalStorage,
    checkJwtExpiration,
    validateReducerKeyFunction,
    outputErrorLogFunction,
} from '../src/saga';
import {
  FETCH_LOCAL_STORAGE_ITEM,
  PLACE_IN_LOCAL_STORAGE,
  LOAD_AUTH_FROM_LOCAL_STORAGE,
} from '../src/constants';

test('makeApiCall returns a generator function and invoked method on api with jwt and double cookie values passed in', () => {
  const mockResult = { status: true, record: 'mockResult' };
  const mockParameters = { hasProperties: 'mockParameters' };
  const mockExtraParameters = { extraParameter: 'mockExtraParameter' };
  const mockMakeSelectJwt = () => () => 'mockSelectJwt';
  const mockMakeSelectExpires = () => () => 'mockSelectExpires';
  const mockMakeSelectDoubleCookie = () => () => 'mockSelectDoubleCookie';
  function* mockHandleDoubleCookie(result) {
    expect(result).toEqual(mockResult);
    yield 'mockHandleDoubleCookie';
  }
  const MockApiInterface = class mockApiInterface {
    mockApi() {
      return mockResult;
    }
  };
  const mockApiClass = new MockApiInterface();
  const apiCall = makeApiCall(MockApiInterface);
  const mockApiToCall = 'mockApi';
  expect(typeof apiCall).toEqual('function');
  const generator = apiCall(mockApiToCall, mockParameters, mockExtraParameters, mockMakeSelectJwt, mockMakeSelectExpires, mockMakeSelectDoubleCookie, mockHandleDoubleCookie);
  expect(generator.next().value.SELECT.selector()).toEqual(mockMakeSelectJwt()());
  expect(generator.next().value.SELECT.selector()).toEqual(mockMakeSelectExpires()());
  expect(generator.next().value.SELECT.selector()).toEqual(mockMakeSelectDoubleCookie()());
  const call = generator.next().value;
  expect(call.CALL.fn).toEqual(mockApiClass.mockApi);
  expect(call.CALL.args[0]).toEqual(mockParameters);
  expect(generator.next(mockResult).value).toEqual('mockHandleDoubleCookie');
  expect(generator.next().done).toBeTruthy();
});

test('sagaHandler tries to execute the callback and catches any error,performing error handling routines', (done) => {
  const mockReducerKey = 'mockReducerKey';
  const mockErrorObject = { message: 'mockError', type: 'error' };
  const mockError = new Error('mockError');
  const mockAction = { type: 'validAction', reducerKey: mockReducerKey };
  const mockDoubleCookie = { hasProperties: 'mockDoubleCookie' };
  const mockFetchedDoubleCookieAction = (action) => {
    expect(action).toEqual(mockDoubleCookie);
    return mockDoubleCookie;
  };
  const mockSetApplicationAlertAction = (err) => {
    expect(err).toEqual(mockErrorObject);
    return err;
  };
  const mockApplicationErrorAction = (err) => {
    expect(err).toEqual(mockError);
    return err;
  };
  const mockOutputErrorLog = (err) => { expect(err).toEqual(mockError); };
  const mockErrorCallback = () => { throw mockError; };
  const mockSuccessCallback = (action) => {
    expect(action).toEqual(mockAction);
    done();
  };
  const mockLocalStorage = {
    getItem: (key) => {
      expect(key).toEqual('doubleCookie');
      return mockDoubleCookie;
    },
  };
  const mockValidateReducerKeyValid = (action, reducerKey) => {
    expect(action).toEqual(mockAction);
    expect(reducerKey).toEqual(mockReducerKey);
    return true;
  };
  const mockValidateReducerKeyInvalid = (action, reducerKey) => {
    expect(action).toEqual(mockAction);
    expect(reducerKey).toEqual(mockReducerKey);
    return false;
  };
  window.localStorage = mockLocalStorage;
  let generator = sagaHandler(mockAction, mockErrorCallback, mockReducerKey, mockFetchedDoubleCookieAction, mockSetApplicationAlertAction, mockApplicationErrorAction, mockOutputErrorLog, mockValidateReducerKeyInvalid);
  expect(generator.next().done).toBeTruthy();
  generator = sagaHandler(mockAction, mockErrorCallback, mockReducerKey, mockFetchedDoubleCookieAction, mockSetApplicationAlertAction, mockApplicationErrorAction, mockOutputErrorLog, mockValidateReducerKeyValid);
  let put = generator.next().value;
  expect(put.PUT.action).toEqual(mockDoubleCookie);
  put = generator.next().value;
  expect(put.PUT.action).toEqual(mockErrorObject);
  put = generator.next().value;
  expect(put.PUT.action).toEqual(mockError);
  expect(generator.next().done).toBeTruthy();
  generator = sagaHandler(mockAction, mockSuccessCallback, mockReducerKey, mockFetchedDoubleCookieAction, mockSetApplicationAlertAction, mockApplicationErrorAction, mockOutputErrorLog, mockValidateReducerKeyValid);
  expect(generator.next().done).toBeTruthy();
});

test('handleDoubleCookieFunction adds cookie to local storage if it is passed into function', () => {
  const mockLocalStorage = {
    setItem: (key) => {
      expect(key).toEqual('doubleCookie');
    },
  };
  window.localStorage = mockLocalStorage;
  const mockDoubleCookie = { hasProperties: 'mockDoubleCookieAction', type: 'mockDoubleCookieAction' };
  const mockEmptyResult = { hasProperties: 'mockEmptyResult' };
  const mockResult = { results: { double_cookie: 'mockDoubleCookie' } };
  const mockDoubleCookieAction = (doubleCookie) => {
    expect(doubleCookie).toEqual('mockDoubleCookie');
    return mockDoubleCookie;
  };
  let generator = handleDoubleCookieFunction(mockResult, mockDoubleCookieAction);
  const put = generator.next().value;
  expect(put.PUT.action).toEqual(mockDoubleCookie);
  expect(generator.next().done).toBeTruthy();
  generator = handleDoubleCookieFunction(mockEmptyResult, mockDoubleCookieAction);
  expect(generator.next().done).toBeTruthy();
});

test('fetchLocalStorageData saga will retrieve a result from local storage', () => {
  const mockFetchedLocalStorageItemAction = { hasProperties: 'mockFetchedLocalStorageItemAction' };
  const mockAction = { key: 'mockKey', hasProperties: 'mockAction' };
  const mockLocalStorage = {
    getItem: (key) => {
      expect(key).toEqual(mockAction.key);
      return mockFetchedLocalStorageItemAction;
    },
  };
  window.localStorage = mockLocalStorage;
  const mockFetchedLocalStorageItem = (key, result) => {
    expect(key).toEqual(mockAction.key);
    expect(result).toEqual(mockFetchedLocalStorageItemAction);
    return mockFetchedLocalStorageItemAction;
  };
  const generator = fetchLocalStorageData(mockAction, mockFetchedLocalStorageItem);
  const put = generator.next().value;
  expect(put.PUT.action).toEqual(mockFetchedLocalStorageItemAction);
  expect(generator.next().done).toBeTruthy();
});

test('putInLocalStorage will place the key/value pair specified by the action into localStorage', () => {
  const mockKey = 'mockKey';
  const mockValue = 'mockValue';
  const mockAction = { key: mockKey, value: mockValue };
  const mockPlacedInLocalStorageActionCreator = (key, value) => {
    expect(key).toEqual(mockKey);
    expect(value).toEqual(mockValue);
    return mockAction;
  };
  const mockLocalStorage = {
    setItem: (key, value) => {
      expect(key).toEqual(mockKey);
      expect(value).toEqual(mockValue);
    },
  };
  window.localStorage = mockLocalStorage;
  const generator = putInLocalStorage(mockAction, mockPlacedInLocalStorageActionCreator);
  const put = generator.next().value;
  expect(put.PUT.action).toEqual(mockAction);
  expect(generator.next().done).toBeTruthy();
});

test('loadAuthDataFromLocalStorage pulls the authenticated properties from local storage and posts the event', () => {
  const mockLocalStorageResult = '["mockLocalStorageResult"]';
  const mockLocalStorage = {
    getItem: (key) => {
      if (['jwt', 'userId', 'username', 'userRoles', 'expires', 'jwtClaims'].indexOf(key) < 0) {
        throw new Error('unexpected key');
      }
      return mockLocalStorageResult;
    },
  };
  const mockActionCreated = { hasProperties: 'mockActionCreated' };
  const mockLoadedAuthFromLocalStorageActionCreator = (jwt, userId, username, userRoles, expires, jwtClaims) => {
    expect(jwt).toEqual(mockLocalStorageResult);
    expect(userId).toEqual(mockLocalStorageResult);
    expect(username).toEqual(mockLocalStorageResult);
    expect(userRoles).toEqual(JSON.parse(mockLocalStorageResult));
    expect(expires).toEqual(Number(mockLocalStorageResult));
    expect(jwtClaims).toEqual(JSON.parse(mockLocalStorageResult));
    return mockActionCreated;
  };
  window.localStorage = mockLocalStorage;
  const generator = loadAuthDataFromLocalStorage(mockLoadedAuthFromLocalStorageActionCreator);
  const put = generator.next().value;
  expect(put.PUT.action).toEqual(mockActionCreated);
  expect(generator.next().done).toBeTruthy();
});

test('saga action listener localStorageData listens for the right actions', () => {
  const generator = localStorageData();
  let fork = generator.next().value;
  expect(fork.FORK.fn.name).toEqual(takeLatest.name);
  expect(fork.FORK.args[0]).toEqual(FETCH_LOCAL_STORAGE_ITEM);
  expect(fork.FORK.args[1]).toBe(fetchLocalStorageData);
  fork = generator.next().value;
  expect(fork.FORK.fn.name).toEqual(takeLatest.name);
  expect(fork.FORK.args[0]).toEqual(PLACE_IN_LOCAL_STORAGE);
  expect(fork.FORK.args[1]).toBe(putInLocalStorage);
  fork = generator.next().value;
  expect(fork.FORK.fn.name).toEqual(takeLatest.name);
  expect(fork.FORK.args[0]).toEqual(LOAD_AUTH_FROM_LOCAL_STORAGE);
  expect(fork.FORK.args[1]).toBe(loadAuthDataFromLocalStorage);
  expect(generator.next().done).toBeTruthy();
});

test('checkJwtExpiration returns an empty jwt if it is expired', () => {
  const mockJwt = 'mockJwt';
  const mockExpired = '10000';
  const mockNotExpired = moment().unix() + 100000;
  const mockNeverExpires = 0;
  expect(checkJwtExpiration(mockJwt, mockExpired)).toEqual('');
  expect(checkJwtExpiration(mockJwt, mockNotExpired)).toEqual(mockJwt);
  expect(checkJwtExpiration(mockJwt, mockNeverExpires)).toEqual(mockJwt);
});

test('validateReducerKeyFunction returns false if the reducerKey provided does not match the action and true if there is no key provided or it matches the action', () => {
  const mockReducerKey = 'mockReducerKey';
  const mockInvalidAction = { reducerKey: 'notvalid' };
  const mockValidAction = { reducerKey: mockReducerKey };
  expect(validateReducerKeyFunction(mockInvalidAction, null)).toBeTruthy();
  expect(validateReducerKeyFunction(mockInvalidAction, mockReducerKey)).toBeFalsy();
  expect(validateReducerKeyFunction(mockValidAction, mockReducerKey)).toBeTruthy();
});

test('outputErrorLogFunction only logs to console when environment is set to production', () => {
  let mockEnvironment = 'production';
  const mockError = new Error('mockError');
  console = { // eslint-disable-line no-global-assign
    log: (err) => {
      expect(mockEnvironment).not.toEqual('production');
      expect(err).toEqual(mockError);
    },
  };

  outputErrorLogFunction(mockError, mockEnvironment);
  mockEnvironment = 'mockEnvironment';
  outputErrorLogFunction(mockError, mockEnvironment);
});
