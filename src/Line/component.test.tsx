import * as React from 'react';
import { render } from '@testing-library/react';

import ScreenBurnLine from './component';

describe('ScreenBurnLine', (): void => {
  it('exists', (): void => {
    expect(ScreenBurnLine).toBeTruthy();
  });

  it('renders without crashing', (): void => {
    render(<ScreenBurnLine />);

    render(
      <ScreenBurnLine
        colors={['pink', 'yellow', 'rebeccablue']}
        retriggerTime={0}
        triggerTime={0}
      />,
    );
  });

  it('has the right style', (): void => {
    const { getByTestId } = render(
      <ScreenBurnLine
        colors={['blue']}
        data-testid='background'
        retriggerTime={0}
        size={1}
        triggerTime={0}
      />,
    );

    expect(getByTestId('background')).toHaveStyle('top: 0px');
    expect(getByTestId('background')).toHaveStyle('height: 1px');
    expect(getByTestId('background')).toHaveStyle('background-color: blue');
  });
});
