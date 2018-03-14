import statesToProps from '../src/states';

test('mapStateToProps maps selectors to specific props', () => {
  const mockJwtSelector = () => 'mockJwt';
  const mockIsAuthenticatedSelector = () => 'mockIsAuthenticated';
  const mockUserRoles = () => 'mockUserRoles';
  const mockUserId = () => 'mockUserId';
  const mockUsername = () => 'mockUsername';
  const mockExpires = () => 'mockExpires';
  const mockDoubleCookie = () => 'mockDoubleCookie';
  const mockLoadedAuthFromLocalStorage = () => 'mockLoadedAuthFromLocalStorage';
  expect(statesToProps(
    mockJwtSelector,
    mockIsAuthenticatedSelector,
    mockUserRoles,
    mockUserId,
    mockUsername,
    mockExpires,
    mockDoubleCookie,
    mockLoadedAuthFromLocalStorage,
  )).toEqual({
    jwt: 'mockJwt',
    isAuthenticated: 'mockIsAuthenticated',
    userRoles: 'mockUserRoles',
    userId: 'mockUserId',
    username: 'mockUsername',
    expires: 'mockExpires',
    doubleCookie: 'mockDoubleCookie',
    loadedAuthFromLocalStorage: 'mockLoadedAuthFromLocalStorage',
  });
});
