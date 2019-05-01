# react-screen-burn

> React component to help prevent screen burn in (for example on wall panels)

[![NPM](https://img.shields.io/npm/v/react-screen-burn.svg)](https://www.npmjs.com/package/react-screen-burn)

## Install

```bash
npm install --save react-screen-burn
```

## Usage

```tsx
import * as React from 'react';

import { ScreenBurnLine } from 'react-screen-burn';

class Example extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>React Screen Burn</h1>
        <p>
          React component to help prevent screen burn in (for example on wall
          panels)
        </p>
        <ScreenBurnLine
          colors={['#ff0000', '#00ff00', '#0000ff']}
          retriggerTime={1000}
          size={1}
          triggerTime={2000}
        />
      </React.Fragment>
    );
  }
}
```

## Props

| Prop            | Type       | Default                             | Description                                                                                                                                                           |
| --------------- | ---------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `colors`        | `string[]` | `['#ff0000', '#00ff00', '#0000ff']` | Array of CSS colors                                                                                                                                                   |
| `retriggerTime` | `number`   | `3600000` (1 hour)                  | Milliseconds until line restarts after reaching end of viewport                                                                                                       |
| `size`          | `number`   | `1`                                 | Pixel height of line. This will scale on high DPI displays, e.g. value of 1 on a 3 device pixel ratio screen will render as 1/3 of a display pixel (1 physical pixel) |
| `triggerTime`   | `number`   | `3600000` (1 hour)                  | Milliseconds after render until line first starts                                                                                                                     |

## License

MIT © [Sipcentric Ltd.](https://nimvelo.com/)
