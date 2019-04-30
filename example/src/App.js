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
          <code>size: number</code> Pixel height of line. This will scale on
          high DPI displays, e.g. value of 1 on a 3 device pixel ratio screen
          will render as 1/3 of a display pixel (1 physical pixel)
        </p>
        <p>
          <code>triggerTime: number</code> Milliseconds after render until line
          first starts
        </p>

        <ScreenBurnLine
          colors={['#ff0000', '#00ff00', '#0000ff']}
          retriggerTime={0}
          size={1}
          triggerTime={0}
        />
      </React.Fragment>
    );
  }
}
