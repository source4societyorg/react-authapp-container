import moment from 'moment';
import {
  validateApiResult,
  isEmpty,
  valueOrDefault,
  notEmptyAt,
} from '@source4society/scepter-utility-lib';
import {
  put,
  select,
  call,
  takeLatest,
} from 'redux-saga/effects';
import {
  loadedAuthFromLocalStorage,
  fetchedLocalStorageItem,
  placedInLocalStorage,
  setApplicationAlert,
  fetchedDoubleCookie,
  applicationError,
} from './actions';
import {
  makeSelectDoubleCookie,
  makeSelectJwt,
  makeSelectExpires,
} from './selectors';
import {
  FETCH_LOCAL_STORAGE_ITEM,
  PLACE_IN_LOCAL_STORAGE,
  LOAD_AUTH_FROM_LOCAL_STORAGE,
} from './constants';

export const makeApiCall = (ApiInterface) => function* apiCall(
  apiToCall,
  parameters,
  injectedExtraParams,
  injectMakeSelectJwt,
  injectMakeSelectExpires,
  injectMakeSelectDoubleCookie,
  injectedHandleDoubleCookie,
) {
  const extraParams = valueOrDefault(extraParams, injectedExtraParams);
  const makeSelectJwtSelector = valueOrDefault(injectMakeSelectJwt, makeSelectJwt);
  const makeSelectExpiresSelector = valueOrDefault(injectMakeSelectExpires, makeSelectExpires);
  const makeSelectDoubleCookieSelector = valueOrDefault(injectMakeSelectDoubleCookie, makeSelectDoubleCookie);
  const handleDoubleCookie = valueOrDefault(injectedHandleDoubleCookie, handleDoubleCookieFunction);
  let jwt = yield select(makeSelectJwtSelector());
  const expires = yield select(makeSelectExpiresSelector());
  const doubleCookie = yield select(makeSelectDoubleCookieSelector());
  jwt = checkJwtExpiration(jwt, expires);
  const apiInterface = new ApiInterface(jwt, doubleCookie);
  const result = yield call([apiInterface, apiToCall], parameters, ...extraParams);
  validateApiResult(result);
  yield* handleDoubleCookie(result);
  return result;
};

export function* sagaHandler(
  action,
  callback,
  reducerKey,
  injectedFetchedDoubleCookie,
  injectedSetApplicationAlertAction,
  injectedApplicationErrorAction,
  injectedOutputErrorLog,
  injectedValidateReducerKey,
) {
  const fetchedDoubleCookieAction = valueOrDefault(injectedFetchedDoubleCookie, fetchedDoubleCookie);
  const setApplicationAlertAction = valueOrDefault(injectedSetApplicationAlertAction, setApplicationAlert);
  const applicationErrorAction = valueOrDefault(injectedApplicationErrorAction, applicationError);
  const outputErrorLog = valueOrDefault(injectedOutputErrorLog, outputErrorLogFunction);
  const validateReducerKey = valueOrDefault(injectedValidateReducerKey, validateReducerKeyFunction);
  try {
    if (!validateReducerKey(action, reducerKey)) {
      return;
    }
    yield* callback(action);
  } catch (err) {
    outputErrorLog(err);
    yield put(fetchedDoubleCookieAction(localStorage.getItem('doubleCookie')));
    yield put(setApplicationAlertAction({ message: valueOrDefault(err.message, 'An unexpected error'), type: 'error' }));
    yield put(applicationErrorAction(err));
  }
}

export function* handleDoubleCookieFunction(result, injectedFetchedDoubleCookie) {
  const fetchedDoubleCookieAction = valueOrDefault(injectedFetchedDoubleCookie, fetchedDoubleCookie);
  if (notEmptyAt(result, ['results', 'double_cookie'])) {
    const doubleCookie = result.results.double_cookie;
    localStorage.setItem('doubleCookie', doubleCookie);
    yield put(fetchedDoubleCookieAction(doubleCookie));
  }
}

export function* fetchLocalStorageData(action, injectedFetchedLocalStorageItem) {
  const fetchedLocalStorageItemAction = valueOrDefault(injectedFetchedLocalStorageItem, fetchedLocalStorageItem);
  const result = valueOrDefault(localStorage.getItem(action.key), action.defaultValue);
  yield put(fetchedLocalStorageItemAction(action.key, result));
}

export function* putInLocalStorage(action, injectedPlacedInLocalStorage) {
  const placedInLocalStorageAction = valueOrDefault(injectedPlacedInLocalStorage, placedInLocalStorage);
  localStorage.setItem(action.key, action.value);
  yield put(placedInLocalStorageAction(action.key, action.value));
}

export function* loadAuthDataFromLocalStorage(injectLoadedAuthFromLocalStorage) {
  const loadedAuthFromLocalStorageActionCreator = valueOrDefault(injectLoadedAuthFromLocalStorage, loadedAuthFromLocalStorage);
  const jwt = localStorage.getItem('jwt');
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  const userRoles = JSON.parse(localStorage.getItem('userRoles'));
  const expires = Number(localStorage.getItem('expires'));
  const jwtClaims = JSON.parse(localStorage.getItem('jwtClaims'));
  yield put(loadedAuthFromLocalStorageActionCreator(jwt, userId, username, userRoles, expires, jwtClaims));
}

export default function* localStorageData() {
  yield takeLatest(FETCH_LOCAL_STORAGE_ITEM, fetchLocalStorageData);
  yield takeLatest(PLACE_IN_LOCAL_STORAGE, putInLocalStorage);
  yield takeLatest(LOAD_AUTH_FROM_LOCAL_STORAGE, loadAuthDataFromLocalStorage);
}

export const checkJwtExpiration = (injectedJwt, expires) => {
  let jwt = injectedJwt;
  const nowTimestamp = moment().unix();
  if (expires !== 0 && (isEmpty(expires) || expires < nowTimestamp)) {
    jwt = '';
  }
  return jwt;
};

export const validateReducerKeyFunction = (action, reducerKey) => isEmpty(reducerKey) || (reducerKey === action.reducerKey);

export const outputErrorLogFunction = (err, injectedEnvironment) => {
  const environment = valueOrDefault(injectedEnvironment, process.env.NODE_ENV);
  if (environment !== 'production') {
    console.log(err); // eslint-disable-line no-console
  }
};
