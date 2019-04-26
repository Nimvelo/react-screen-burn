export interface Props {
  colors?: React.CSSProperties['color'][];
}

export interface State {
  backgroundColor: string;
  lineSize: number;
  top: number;
  triggered: boolean;
  triggerTime: number;
}
