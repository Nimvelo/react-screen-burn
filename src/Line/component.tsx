import * as React from 'react';

import styles from './style.module.scss';

import { Props, State } from './interfaces';

export default class ScreenBurnLine extends React.Component<Props, State> {
  private determineInitialColor = (): React.CSSProperties['color'] => {
    let backgroundColor = '#ff0000';
    const deduplicatedColors = Array.from(new Set(this.props.colors));

    if (deduplicatedColors.length) {
      backgroundColor = deduplicatedColors[0] as string;
    }

    return backgroundColor;
  };

  private trigger = (): void => {
    const updateTop = (): void => {
      const step = this.state.lineSize;
      const top = this.state.top + step;

      // Move the current line down
      if (this.state.top < window.innerHeight - step) {
        this.setState({
          top,
        });

        window.requestAnimationFrame(updateTop);

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

      const retriggerTime = this.props.retriggerTime || 0;

      if (retriggerTime > 0) {
        setTimeout((): void => {
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

    window.requestAnimationFrame(updateTop);
  };

  public static defaultProps: Props = {
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    retriggerTime:
      process.env.NODE_ENV !== 'production' ? 1000 : 60 * 60 * 1000,
    triggerTime: process.env.NODE_ENV !== 'production' ? 2000 : 60 * 60 * 2000,
  };

  public readonly state: State = {
    backgroundColor: this.determineInitialColor(),
    lineSize: 1 / (window.devicePixelRatio || 1),
    top: 0,
    triggered: this.props.triggerTime === 0,
  };

  public componentDidMount(): void {
    const triggerTime = this.props.triggerTime || 0;

    if (triggerTime > 0) {
      setTimeout((): void => {
        this.setState({
          triggered: true,
        });
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

  public render(): JSX.Element {
    if (!this.state.triggered) {
      return <React.Fragment />;
    }

    return (
      <div
        className={styles.line}
        data-testid={this.props['data-testid']}
        style={{
          backgroundColor: this.state.backgroundColor,
          height: this.state.lineSize,
          top: this.state.top,
        }}
      />
    );
  }
}
