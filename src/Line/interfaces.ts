export interface Props {
  colors?: React.CSSProperties['color'][];
  retriggerTime?: number;
  triggerTime?: number;
}

export interface State {
  backgroundColor: React.CSSProperties['color'];
  lineSize: number;
  top: number;
  triggered: boolean;
}
