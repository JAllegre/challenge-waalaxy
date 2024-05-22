export interface SetColorRequestBody {
  value: string;
}

export interface SetSizeRequestBody {
  value: string;
}

export interface ActionItem {
  id: number;
  kind: string;
  data: string;
}

export interface Avatar {
  id: number;
  color: string;
  size: number;
}
