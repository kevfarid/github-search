export default interface ITable {
  cols: ICol[];
  rows: IRow[];
}

export interface ICol {
  id: number;
  label: string;
  type: string;
  key: string;
}

export interface IRow {
  id: number;
  [key: string]: string | number;
}
