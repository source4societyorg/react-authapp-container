import React from 'react';
import { reducerInjector, sagaInjector } from '@source4society/scepter-webui-utilities';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { loadAuthFromLocalStorage } from './actions';
import propTypes from './propTypes';
import stateToProps from './states';
import reducer from './reducer';
import saga from './saga';

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    if (!this.props.loadedAuthFromLocalStorage) {
      this.props.loadAuthFromLocalStorage();
    }
  }

  render() {
    const ShellComponent = this.props.shellComponent;
    const LoadingIndicatorComponent = this.props.loadingIndicatorComponent;
    return this.props.loadedAuthFromLocalStorage ? (
      <ShellComponent
        isAuthenticated={this.props.isAuthenticated}
        userRoles={this.props.userRoles}
        userId={this.props.userId}
        username={this.props.username}
        expires={this.props.expires}
        jwt={this.props.jwt}
        appProps={this.props}
      />
    ) : (
      <LoadingIndicatorComponent />
    );
  }
}

App.propTypes = propTypes;

export const mapDispatchToProps = (dispatch) => ({
  loadAuthFromLocalStorage: () => dispatch(loadAuthFromLocalStorage()),
});

export const mapStateToProps = createStructuredSelector(stateToProps());
export const withReducer = reducerInjector({ key: 'app', reducer });
export const withSaga = sagaInjector({ key: 'app', saga });
export const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(compose(
  withReducer,
  withSaga,
  withConnect,
)(App));
