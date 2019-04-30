import React, { Component } from 'react';

import { ScreenBurnLine } from 'react-screen-burn';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>React Screen Burn</h1>
        <p>
          React component to help prevent screen burn in (for example on wall
          panels)
        </p>

        <h2>Props</h2>
        <p>
          <code>colors: string[]</code> Array of CSS colors
        </p>
        <p>
          <code>retriggerTime: number</code> Milliseconds until line restarts
          after reaching end of viewport
        </p>
        <p>
          <code>triggerTime: number</code> Milliseconds after render until line
          first starts
        </p>

        <ScreenBurnLine
          colors={['#ff0000', '#00ff00', '#0000ff']}
          retriggerTime={0}
          triggerTime={0}
        />
      </React.Fragment>
    );
  }
}
