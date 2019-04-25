import * as React from 'react';

import styles from './style.module.scss';

import { Props, State } from './interfaces';

export default class ScreenBurnLine extends React.Component<Props, State> {
  static defaultProps: Props = {
    colors: ['#ff0000', '#00ff00', '#0000ff'],
  };

  constructor(props: Props) {
    super(props);

    let backgroundColor = '#ff0000';
    const deduplicatedColors = Array.from(new Set(this.props.colors));

    if (deduplicatedColors.length) {
      backgroundColor = deduplicatedColors[0] as string;
    }

    this.state = {
      backgroundColor,
      top: 0,
      triggered: false,
      triggerTime:
        process.env.NODE_ENV === 'production' ? 30 * 60 * 1000 : 1000,
    };
  }

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
        const top = this.state.top + 1;

        // Move the current line down
        if (this.state.top < window.innerHeight - 1) {
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
        }, this.state.triggerTime);
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
          top: this.state.top,
        }}
      />
    );
  }
}
