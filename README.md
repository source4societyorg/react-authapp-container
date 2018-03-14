# react-authapp-container
A boilerplate app container that contains authentication sagas (react-boilerplate)

[![scepter-logo](http://res.cloudinary.com/source-4-society/image/upload/v1519221119/scepter_hzpcqt.png)](https://github.com/source4societyorg/SCEPTER-core)

[![redux-logo](https://raw.githubusercontent.com/reactjs/redux/master/logo/logo-title-dark.png)](https://github.com/reactjs/redux)

[![react-boilerplate](https://github.com/react-boilerplate/brand/blob/master/assets/logo.png)](https://gihub.com/react-boilerplate)

[![airbnb-codestyle](https://camo.githubusercontent.com/1c5c800fbdabc79cfaca8c90dd47022a5b5c7486/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64652532307374796c652d616972626e622d627269676874677265656e2e7376673f7374796c653d666c61742d737175617265)](https://github.com/airbnb/javascript)

[![Build Status](https://travis-ci.org/source4societyorg/react-authapp-container.svg?branch=master)](https://travis-ci.org/source4societyorg/react-authapp-container)

[![codecov](https://codecov.io/gh/source4societyorg/react-authapp-container/branch/master/graph/badge.svg)](https://codecov.io/gh/source4societyorg/react-authapp-container)

## Installation

Using npm

  npm install @source4society/react-authapp-container

Using yarn

  yarn add @source4society/react-authapp-container

## Setup

  This container is intended to be used with [SCEPTER-webui](https://github.com/SCEPTER-webui) which is a slightly modified fork of [react-boilerplate](https://github.com/react-boilerplate). Many of the dependencies required by this module are defined in the webui project's `project.json`

## Example

Include this container in your base app container, and pass it a Shell and LoadingIndicator component as follows:

    <App shellComponent={Shell} loadingIndicatorComponent={LoadingIndicator} />

You can also pass custom props, which will be passed to the shell component as `appProps`

The shell will receive the following props from the App container:

  `isAuthenticated`
  `userRoles`
  `userId`
  `username`
  `expires`
  `jwt`
  `appProps`

Please see the `action.js`, `reducer.js`, `selectors.js` and `saga.js` files for an understanding of how to manipulate the value of these properties.
