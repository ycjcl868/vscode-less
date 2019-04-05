export interface themeMappingTypes {
  [key: string]: {
    value?: string;
    comment?: string;
  };
}

export interface TipType {
  value: string;
  comment?: string;
}

export type IType = 'less' | 'scss';
export interface IConfig {
  type: IType;
  theme: string;
}
