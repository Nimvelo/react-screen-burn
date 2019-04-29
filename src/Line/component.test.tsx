import * as React from 'react';
import { render } from 'react-dom';

import ScreenBurnLine from './component';

describe('ScreenBurnLine', (): void => {
  it('is truthy', (): void => {
    expect(ScreenBurnLine).toBeTruthy();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');

    const component = <ScreenBurnLine />;

    render(component, div);
  });
});
