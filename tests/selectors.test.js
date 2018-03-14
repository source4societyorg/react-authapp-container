import { fromJS, Map } from 'immutable';

import {
  selectGlobal,
  selectRoute,
  selectStateByKey,
  makeSelectJwt,
  makeSelectAuthenticated,
  makeSelectUserId,
  makeSelectUsername,
  makeSelectRoles,
  makeSelectExpires,
  makeSelectLoading,
  makeSelectError,
  makeSelectLoadedAuthFromLocalStorage,
  makeSelectLocation,
  makeSelectMatch,
  makeSelectMessage,
  makeSelectDoubleCookie,
  makeSelectFilter,
  makeSelectJwtClaims,
} from '../src/selectors';

test('selectGlobal', () => {
  const mockGlobalState = { hasProperties: 'mockGlobal' };
  const mockState = fromJS({ app: mockGlobalState });
  expect(selectGlobal(mockState)).toEqual(fromJS(mockGlobalState));
});

test('selectRoute', () => {
  const mockRoute = { hasProperties: 'mockRoute' };
  const mockState = fromJS({ route: mockRoute });
  expect(selectRoute(mockState)).toEqual(fromJS(mockRoute));
});

test('selectStateByKey', () => {
  const mockKey = 'mockKey';
  const mockKeyedState = { hasProperties: 'mockKeyedState' };
  const mockStateWithKey = {};
  mockStateWithKey[mockKey] = mockKeyedState;
  const mockState = fromJS(mockStateWithKey);
  expect(selectStateByKey(mockKey)(mockState)).toEqual(fromJS(mockKeyedState));
});

test('makeSelectJwt', () => {
  const mockJwt = { hasProperties: 'mockJwt' };
  const mockJwtState = { jwt: mockJwt };
  const mockState = fromJS({ app: mockJwtState });
  const mockSelectGlobal = () => mockState.get('app');
  expect(makeSelectJwt(mockSelectGlobal)()).toEqual(Map(mockJwt));
});

test('makeSelectAuthenticated', () => {
  const mockAuthenticated = { hasProperties: 'mockAuthenticated' };
  const mockAuthenticatedState = { isAuthenticated: mockAuthenticated };
  const mockState = fromJS({ app: mockAuthenticatedState });
  const mockSelectGlobal = () => mockState.get('app');
  expect(makeSelectAuthenticated(mockSelectGlobal)()).toEqual(fromJS(mockAuthenticated));
});

test('makeSelectUserId', () => {
  const mockUserId = { hasProperties: 'userId' };
  const mockUserIdState = { userId: mockUserId };
  const mockState = fromJS({ app: mockUserIdState });
  const mockSelectGlobal = () => mockState.get('app');
  expect(makeSelectUserId(mockSelectGlobal)()).toEqual(fromJS(mockUserId));
});

test('makeSelectUsername', () => {
  const mockUsername = { hasProperties: 'mockUsername' };
  const mockUsernameState = { username: mockUsername };
  const mockState = fromJS({ app: mockUsernameState });
  const mockSelectGlobal = () => mockState.get('app');
  expect(makeSelectUsername(mockSelectGlobal)()).toEqual(fromJS(mockUsername));
});

test('makeSelectRoles', () => {
  const mockUserRoles = { hasProperties: 'mockUserRoles' };
  const mockUserRoleState = { userRoles: mockUserRoles };
  const mockState = fromJS({ app: mockUserRoleState });
  const mockSelectGlobal = () => mockState.get('app');
  expect(makeSelectRoles(mockSelectGlobal)()).toEqual(fromJS(mockUserRoles));
});

test('makeSelectExpires', () => {
  const mockExpires = { hasProperties: 'mockExpires' };
  const mockExpiresState = { expires: mockExpires };
  const mockState = fromJS({ app: mockExpiresState });
  const mockSelectGlobal = () => mockState.get('app');
  expect(makeSelectExpires(mockSelectGlobal)()).toEqual(fromJS(mockExpires));
});

test('makeSelectLoading', () => {
  const mockLoading = { hasProperties: 'mockLoading' };
  const mockLoadingState = { loading: mockLoading };
  const mockState = fromJS({ app: mockLoadingState });
  const mockSelectGlobal = () => mockState.get('app');
  expect(makeSelectLoading(mockSelectGlobal)()).toEqual(fromJS(mockLoading));
});

test('makeSelectError', () => {
  const mockError = { hasProperties: 'error' };
  const mockErrorState = { error: mockError };
  const mockState = fromJS({ app: mockErrorState });
  const mockSelectGlobal = () => mockState.get('app');
  expect(makeSelectError(mockSelectGlobal)()).toEqual(fromJS(mockError));
});

test('makeSelectLoadedAuthFromLocalStorage', () => {
  const mockLoadedAuth = { hasProperties: 'mockLoadedAuth' };
  const mockLoadedAuthState = { loadedAuthFromLocalStorage: mockLoadedAuth };
  const mockState = fromJS({ app: mockLoadedAuthState });
  const mockSelectGlobal = () => mockState.get('app');
  expect(makeSelectLoadedAuthFromLocalStorage(mockSelectGlobal)()).toEqual(fromJS(mockLoadedAuth));
});

test('makeSelectLocation', () => {
  const mockLocation = { hasProperties: 'mockLocation' };
  const mockRoute = { location: mockLocation };
  const mockRouteState = fromJS({ route: mockRoute });
  const mockRouteSelect = () => mockRouteState.get('route');
  expect(makeSelectLocation(mockRouteSelect)()).toEqual(mockLocation);
});

test('makeSelectMatch', () => {
  const mockMatch = { hasProperties: 'mockMatch' };
  const mockMatchState = { match: mockMatch };
  const mockState = fromJS({ app: mockMatchState });
  const mockSelectGlobal = () => mockState.get('app');
  expect(makeSelectMatch(mockSelectGlobal)()).toEqual(mockMatchState);
});

test('makeSelectMessage', () => {
  const mockMessage = { hasProperties: 'mockMessage' };
  const mockMessageState = { message: mockMessage };
  const mockState = fromJS({ app: mockMessageState });
  const mockSelectGlobal = () => mockState.get('app');
  expect(makeSelectMessage(mockSelectGlobal)()).toEqual(fromJS(mockMessage));
});

test('makeSelectDoubleCookie', () => {
  const mockDoubleCookie = { hasProperties: 'mockDoubleCookie' };
  const mockDoubleCookieState = { doubleCookie: mockDoubleCookie };
  const mockState = fromJS({ app: mockDoubleCookieState });
  const mockSelectGlobal = () => mockState.get('app');
  expect(makeSelectDoubleCookie(mockSelectGlobal)()).toEqual(fromJS(mockDoubleCookie));
});

test('makeSelectFilter', () => {
  const mockKey = 'mockKey';
  const mockFilter = { hasProperties: 'mockFilter' };
  const mockFilterState = { filter: mockFilter };
  const mockStateWithReducer = (key) => {
    expect(key).toEqual(mockKey);
    return () => fromJS(mockFilterState);
  };
  expect(makeSelectFilter(mockKey, mockStateWithReducer)()).toEqual(fromJS(mockFilter));
});

test('makeSelectJwtClaims', () => {
  const mockJwtClaims = { hasProperties: 'mockJwtClaims' };
  const mockJwtClaimsState = { jwtClaims: mockJwtClaims };
  const mockState = fromJS({ app: mockJwtClaimsState });
  const mockSelectGlobal = () => mockState.get('app');
  expect(makeSelectJwtClaims(mockSelectGlobal)()).toEqual(fromJS(mockJwtClaims));
});
