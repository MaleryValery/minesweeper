export enum CellValue {
  none,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  bomb,
}

export enum CellState {
  hidden,
  visible,
  flagged,
}

export type CellType = {
  value: CellValue;
  state: CellState;
};

export enum GameState {
  fail,
  live,
  win,
}
