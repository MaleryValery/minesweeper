import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { GameStatus, GameTheme, WinnerType } from '../utils/types';

export interface GameSlice {
  theme: GameTheme;
  gameStatus: GameStatus;
  audio: boolean;
  winner: WinnerType | null;
}

const initialState: GameSlice = {
  theme: GameTheme.light,
  gameStatus: GameStatus.live,
  audio: false,
  winner: null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<GameTheme>) => {
      state.theme = action.payload;
    },
    setGameState: (state, action: PayloadAction<GameStatus>) => {
      state.gameStatus = action.payload;
    },
    setWinner: (state, action: PayloadAction<WinnerType | null>) => {
      state.winner = action.payload;
    },
    setAudio: (state, action: PayloadAction<boolean>) => {
      state.audio = action.payload;
    },
  },
});

export const { setTheme, setGameState, setWinner,setAudio } = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGameStatus = (state: RootState) => state.game;

export default gameSlice.reducer;
