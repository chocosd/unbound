export enum TooltipPosition {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
  Auto = 'auto',
}

export interface TooltipConfig {
  message: string;
  position?: TooltipPosition;
  offsetPx?: number;
}
