export interface Props {
  colors?: React.CSSProperties['color'][];
  retriggerTime?: number;
  triggerTime?: number;
}

export interface State {
  backgroundColor: string;
  lineSize: number;
  top: number;
  triggered: boolean;
}
