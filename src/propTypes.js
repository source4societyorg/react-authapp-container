import PropTypes from 'prop-types';

const propTypes = {
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

export default propTypes;
