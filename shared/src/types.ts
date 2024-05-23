export enum ActionType {
  'SetColor' = 1,
  'SetSize' = 2,
}

export interface ActionItem {
  id: number;
  type: ActionType;
  data: string;
}

export interface SetColorRequestBody {
  value: string;
}

export interface SetSizeRequestBody {
  value: string;
}

export interface Avatar {
  id: number;
  color: string;
  size: number;
}

export type RemainingCredits = Record<ActionType, number>;
