import { createSelector } from 'reselect';
import { valueOrDefault } from '@source4society/scepter-utility-lib';
const selectGlobal = (state) => state.get('app');
const selectRoute = (state) => state.get('route');
const selectStateByKey = (key) => (state) => state.get(key);

const makeSelectJwt = (injectedSelect) => {
  const selector = valueOrDefault(injectedSelect, selectGlobal);
  return createSelector(
    selector,
    (authStorageState) => authStorageState.get('jwt')
  );
};

const makeSelectAuthenticated = (injectedSelect) => {
  const selector = valueOrDefault(injectedSelect, selectGlobal);
  return createSelector(
    selector,
    (authStorageState) => authStorageState.get('isAuthenticated')
  );
};

const makeSelectUserId = (injectedSelect) => {
  const selector = valueOrDefault(injectedSelect, selectGlobal);
  return createSelector(
    selector,
    (authStorageState) => authStorageState.get('userId')
  );
};

const makeSelectUsername = (injectedSelect) => {
  const selector = valueOrDefault(injectedSelect, selectGlobal);
  return createSelector(
    selector,
    (authStorageState) => authStorageState.get('username')
  );
};

const makeSelectRoles = (injectedSelect) => {
  const selector = valueOrDefault(injectedSelect, selectGlobal);
  return createSelector(
    selector,
    (authStorageState) => authStorageState.get('userRoles')
  );
};

const makeSelectExpires = (injectedSelect) => {
  const selector = valueOrDefault(injectedSelect, selectGlobal);
  return createSelector(
    selector,
    (authStorageState) => authStorageState.get('expires')
  );
};

const makeSelectLoading = (injectedSelect) => {
  const selector = valueOrDefault(injectedSelect, selectGlobal);
  return createSelector(
    selector,
    (globalState) => globalState.get('loading')
  );
};

const makeSelectError = (injectedSelect) => {
  const selector = valueOrDefault(injectedSelect, selectGlobal);
  return createSelector(
    selector,
    (globalState) => globalState.get('error')
  );
};

const makeSelectLoadedAuthFromLocalStorage = (injectedSelect) => {
  const selector = valueOrDefault(injectedSelect, selectGlobal);
  return createSelector(
    selector,
    (globalState) => globalState.get('loadedAuthFromLocalStorage')
  );
};

const makeSelectLocation = (injectedSelect) => {
  const selector = valueOrDefault(injectedSelect, selectRoute);
  return createSelector(
    selector,
   (routeState) => routeState.get('location').toJS()
  );
};

const makeSelectMatch = (injectedSelect) => {
  const selector = valueOrDefault(injectedSelect, selectGlobal);
  return createSelector(
    selector,
    (routeState) => routeState.toJS()
  );
};

const makeSelectMessage = (injectedSelect) => {
  const selector = valueOrDefault(injectedSelect, selectGlobal);
  return createSelector(
    selector,
    (globalState) => globalState.get('message')
  );
};

const makeSelectDoubleCookie = (injectedSelect) => {
  const selector = valueOrDefault(injectedSelect, selectGlobal);
  return createSelector(
    selector,
    (globalState) => globalState.get('doubleCookie')
  );
};

const makeSelectFilter = (reducerKey, injectedSelect) => {
  const selector = valueOrDefault(injectedSelect, selectGlobal);
  return createSelector(
    selector(reducerKey),
    (keyedState) => keyedState.get('filter')
  );
};

const makeSelectJwtClaims = (injectedSelect) => {
  const selector = valueOrDefault(injectedSelect, selectGlobal);
  return createSelector(
    selector,
    (globalState) => globalState.get('jwtClaims')
  );
};

export {
  selectGlobal,
  selectRoute,
  selectStateByKey,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
  makeSelectJwt,
  makeSelectAuthenticated,
  makeSelectUserId,
  makeSelectUsername,
  makeSelectRoles,
  makeSelectExpires,
  makeSelectLoadedAuthFromLocalStorage,
  makeSelectMessage,
  makeSelectDoubleCookie,
  makeSelectFilter,
  makeSelectJwtClaims,
  makeSelectMatch,
};
