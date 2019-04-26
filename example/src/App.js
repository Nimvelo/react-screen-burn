import React, { Component } from 'react';

import { ScreenBurnLine } from 'react-screen-burn';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>React Screen Burn</h1>
        <p>
          React component to help prevent screen burn in (for example on wall
          panels)
        </p>
        <h2>Props</h2>
        <p>
          <code>colors: string[]</code> Array of CSS colors
        </p>
        <ScreenBurnLine />
      </div>
    );
  }
}
