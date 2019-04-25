import React, { Component } from 'react';

import { ScreenBurnLine } from 'react-screen-burn';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>React Screen Burn</h1>
        <p>React component to help prevent screen burn in on wall panels</p>
        <ScreenBurnLine />
      </React.Fragment>
    );
  }
}
