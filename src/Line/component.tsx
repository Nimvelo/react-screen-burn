import * as React from 'react';

import styles from './style.module.scss';

import { Props, State } from './interfaces';

export default class ScreenBurnLine extends React.Component<Props, State> {
  private getInitialColor = (): React.CSSProperties['color'] => {
    let backgroundColor = '#ff0000';
    const deduplicatedColors = Array.from(new Set(this.props.colors));

    if (deduplicatedColors.length) {
      backgroundColor = deduplicatedColors[0] as string;
    }

    return backgroundColor;
  };

  private triggerTimeout: number = 0;

  private trigger = (): void => {
    const updateTop = (top = 0): void => {
      if (this.triggerTimeout === -0) {
        return;
      }

      const step = this.state.size;

      // Move the current line down
      if (this.state.top < window.innerHeight - step) {
        this.setState({
          top,
        });

        window.requestAnimationFrame((): void => {
          updateTop(top + step);
        });

        return;
      }

      // Determine next line characteristics
      const deduplicatedColors = Array.from(new Set(this.props.colors));
      const currentIndex = deduplicatedColors.findIndex(
        (color): boolean => color === this.state.backgroundColor,
      );

      let nextColor = '#ff0000';
      if (deduplicatedColors.length) {
        nextColor = deduplicatedColors[
          (currentIndex + 1) % deduplicatedColors.length
        ] as string;
      }

      this.setState({
        backgroundColor: nextColor,
        top: 0,
        triggered: false,
      });

      window.clearTimeout(this.triggerTimeout);

      const retriggerTime = this.props.retriggerTime || 0;

      if (retriggerTime > 0) {
        this.triggerTimeout = window.setTimeout((): void => {
          this.setState({
            triggered: true,
          });
        }, this.props.retriggerTime);
      } else {
        this.setState({
          triggered: true,
        });
      }
    };

    window.requestAnimationFrame((): void => {
      updateTop();
    });
  };

  public static defaultProps: Props = {
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    retriggerTime: 60 * 60 * 1000,
    size: 1,
    triggerTime: 60 * 60 * 1000,
  };

  public readonly state: State = {
    backgroundColor: this.getInitialColor(),
    size: (this.props.size || 1) / (window.devicePixelRatio || 1),
    top: 0,
    triggered: this.props.triggerTime === 0,
  };

  public componentDidMount(): void {
    const triggerTime = this.props.triggerTime || 0;

    if (triggerTime > 0) {
      this.triggerTimeout = window.setTimeout((): void => {
        this.setState({ triggered: true });
      }, triggerTime);
    } else {
      this.trigger();
    }
  }

  public componentDidUpdate(prevProps: Props, prevState: State): void {
    if (prevState.triggered === false && this.state.triggered === true) {
      this.trigger();
    }
  }

  public componentWillUnmount(): void {
    this.setState({
      top: window.innerHeight,
    });

    window.clearTimeout(this.triggerTimeout);
    this.triggerTimeout = 0;
  }

  public render(): JSX.Element | null {
    if (!this.state.triggered) {
      return null;
    }

    return (
      <div
        className={styles.line}
        data-testid={this.props['data-testid']}
        style={{
          backgroundColor: this.state.backgroundColor,
          height: this.state.size,
          top: document.documentElement.scrollTop + this.state.top,
        }}
      />
    );
  }
}
