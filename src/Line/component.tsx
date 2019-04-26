import * as React from 'react';

import styles from './style.module.scss';

import { Props, State } from './interfaces';

export default class ScreenBurnLine extends React.Component<Props, State> {
  readonly defaultProps: Props = {
    colors: ['#ff0000', '#00ff00', '#0000ff'],
  };

  determineInitialColor = () => {
    let backgroundColor = '#ff0000';
    const deduplicatedColors = Array.from(new Set(this.props.colors));

    if (deduplicatedColors.length) {
      backgroundColor = deduplicatedColors[0] as string;
    }

    return backgroundColor;
  };

  readonly state: State = {
    backgroundColor: this.determineInitialColor(),
    lineSize: 1 / (window.devicePixelRatio || 1),
    top: 0,
    triggered: false,
    // Development: 2 seconds, Production: 60 minutes
    triggerTime: process.env.NODE_ENV !== 'production' ? 2000 : 60 * 60 * 1000,
  };

  public componentDidMount() {
    setTimeout(() => {
      this.setState({
        triggered: true,
      });
    }, this.state.triggerTime);
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.triggered === false && this.state.triggered === true) {
      const updateTop = () => {
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
          (color) => color === this.state.backgroundColor,
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

        setTimeout(() => {
          this.setState({
            triggered: true,
          });
        }, this.state.triggerTime / 2);
      };

      window.requestAnimationFrame(updateTop);
    }
  }

  public render(): JSX.Element {
    if (!this.state.triggered) {
      return <React.Fragment />;
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
