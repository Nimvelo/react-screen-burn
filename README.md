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
      <div>
        <h1>React Screen Burn</h1>
        <p>
          React component to help prevent screen burn in (for example on wall
          panels)
        </p>
        <ScreenBurnLine
          colors={['#ff0000', '#00ff00', '#0000ff']}
          retriggerTime={1000}
          triggerTime={2000}
        />
      </div>
    );
  }
}
```

## Props

| Prop            | Type       | Description                                                     |
| --------------- | ---------- | --------------------------------------------------------------- |
| `colors`        | `string[]` | Array of CSS colors                                             |
| `retriggerTime` | `number`   | Milliseconds until line restarts after reaching end of viewport |
| `triggerTime`   | `number`   | Milliseconds after render until line first starts               |

## License

MIT © [Nimvelo](https://nimvelo.com/)
