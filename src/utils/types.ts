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
  bombed: boolean;
};

export enum GameStatus {
  lose,
  win,
  live,
}
export enum GameTheme {
  light,
  dark,
}

export type WinnerType = { 
  name: string,
  timer: number,
  moves: number,
  bombs: number,
  size: number,
}