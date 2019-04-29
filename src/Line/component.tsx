import * as React from 'react';

import styles from './style.module.scss';

import { Props, State } from './interfaces';

export default class ScreenBurnLine extends React.Component<Props, State> {
  public static defaultProps: Props = {
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    retriggerTime:
      process.env.NODE_ENV !== 'production' ? 1000 : 60 * 60 * 1000,
    triggerTime: process.env.NODE_ENV !== 'production' ? 2000 : 60 * 60 * 2000,
  };

  private determineInitialColor = (): React.CSSProperties['color'] => {
    let backgroundColor = '#ff0000';
    const deduplicatedColors = Array.from(new Set(this.props.colors));

    if (deduplicatedColors.length) {
      backgroundColor = deduplicatedColors[0] as string;
    }

    return backgroundColor;
  };

  public readonly state: State = {
    backgroundColor: this.determineInitialColor(),
    lineSize: 1 / (window.devicePixelRatio || 1),
    top: 0,
    triggered: false,
  };

  public componentDidMount(): void {
    setTimeout((): void => {
      this.setState({
        triggered: true,
      });
    }, this.props.triggerTime);
  }

  public componentDidUpdate(prevProps: Props, prevState: State): void {
    if (prevState.triggered === false && this.state.triggered === true) {
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

        setTimeout((): void => {
          this.setState({
            triggered: true,
          });
        }, this.props.retriggerTime);
      };

      window.requestAnimationFrame(updateTop);
    }
  }

  public render(): JSX.Element | null {
    if (!this.state.triggered) {
      return null;
    }

    return (
      <div
        className={styles.line}
        style={{
          backgroundColor: this.state.backgroundColor,
          height: this.state.lineSize,
          top: this.state.top,
        }}
      />
    );
  }
}
