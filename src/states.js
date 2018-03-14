import { valueOrDefault } from '@source4society/scepter-utility-lib';
import {
  makeSelectJwt,
  makeSelectAuthenticated,
  makeSelectRoles,
  makeSelectUserId,
  makeSelectUsername,
  makeSelectExpires,
  makeSelectLoadedAuthFromLocalStorage,
  makeSelectDoubleCookie,
} from './selectors';

export default (
  injectedMakeSelectJwt,
  injectedMakeSelectAuthenticated,
  injectedMakeSelectRoles,
  injectedMakeSelectUserId,
  injectedMakeSelectUsername,
  injectedMakeSelectExpires,
  injectedMakeSelectDoubleCookie,
  injectedMakeSelectLoadedAuthFromLocalStorage,
) => {
  const makeSelectJwtSelector = valueOrDefault(injectedMakeSelectJwt, makeSelectJwt);
  const makeSelectAuthenticatedSelector = valueOrDefault(injectedMakeSelectAuthenticated, makeSelectAuthenticated);
  const makeSelectRolesSelector = valueOrDefault(injectedMakeSelectRoles, makeSelectRoles);
  const makeSelectUserIdSelector = valueOrDefault(injectedMakeSelectUserId, makeSelectUserId);
  const makeSelectUsernameSelector = valueOrDefault(injectedMakeSelectUsername, makeSelectUsername);
  const makeSelectExpiresSelector = valueOrDefault(injectedMakeSelectExpires, makeSelectExpires);
  const makeSelectDoubleCookieSelector = valueOrDefault(injectedMakeSelectDoubleCookie, makeSelectDoubleCookie);
  const makeSelectLoadedAuthFromLocalStorageSelector = valueOrDefault(injectedMakeSelectLoadedAuthFromLocalStorage, makeSelectLoadedAuthFromLocalStorage);
  return {
    jwt: makeSelectJwtSelector(),
    isAuthenticated: makeSelectAuthenticatedSelector(),
    userRoles: makeSelectRolesSelector(),
    userId: makeSelectUserIdSelector(),
    username: makeSelectUsernameSelector(),
    expires: makeSelectExpiresSelector(),
    doubleCookie: makeSelectDoubleCookieSelector(),
    loadedAuthFromLocalStorage: makeSelectLoadedAuthFromLocalStorageSelector(),
  };
};
