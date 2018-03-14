import React from 'react';
import { mount } from 'enzyme';

import { App, mapDispatchToProps } from '../src/index';
import { loadAuthFromLocalStorage } from '../src/actions';

test('App container calls the loadAuthFromLocalStorage handler if the loadedAuthFromLocalStorage prop is true, otherwise does not ', () => {
  const mockShellComponent = () => <div>mockShell</div>;
  const mockLoadingIndicator = () => <div>mockLoadingIndicator</div>;
  let functionInvoked = false;
  let renderedAppContainer = mount(<App
    shellComponent={mockShellComponent}
    loadingIndicatorComponent={mockLoadingIndicator}
    loadAuthFromLocalStorage={() => { functionInvoked = true; }}
  />);
  renderedAppContainer.unmount();
  expect(functionInvoked).toBeTruthy();
  renderedAppContainer = mount(<App
    shellComponent={mockShellComponent}
    loadingIndicatorComponent={mockLoadingIndicator}
    loadedAuthFromLocalStorage
    loadAuthFromLocalStorage={() => { functionInvoked = false; }}
  />);
  renderedAppContainer.unmount();
  expect(functionInvoked).toBeTruthy();
});

test('mapDispatchToProps defines loading auth from local storage', (done) => {
  const mockDispatch = (action) => {
    expect(action).toEqual(loadAuthFromLocalStorage());
    done();
  };
  const dispatches = mapDispatchToProps(mockDispatch);
  dispatches.loadAuthFromLocalStorage();
});
