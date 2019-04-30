export interface Props {
  colors?: React.CSSProperties['color'][];
  retriggerTime?: number;
  size?: number;
  triggerTime?: number;
}

export interface State {
  backgroundColor: React.CSSProperties['color'];
  size: number;
  top: number;
  triggered: boolean;
}
