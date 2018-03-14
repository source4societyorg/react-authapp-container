import PropTypes from 'prop-types';
import propTypes from '../src/propTypes';

test('App container propTypes are properly defined', () => {
  const expectedPropTypes = {
    jwt: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    userRoles: PropTypes.object,
    userId: PropTypes.string,
    username: PropTypes.string,
    expires: PropTypes.number,
    loadedAuthFromLocalStorage: PropTypes.bool,
    loadAuthFromLocalStorage: PropTypes.func,
    shellComponent: PropTypes.func.isRequired,
    loadingIndicatorComponent: PropTypes.func.isRequired,
  };
  expect(propTypes).toEqual(expectedPropTypes);
});
