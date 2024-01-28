import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { GameStatus, GameTheme } from '../utils/types';

export interface GameSlice {
  theme: GameTheme;
  gameStatus: GameStatus;
}

const initialState: GameSlice = {
  theme: GameTheme.light,
  gameStatus: GameStatus.live,
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
  },
});

export const { setTheme, setGameState } = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGameStatus = (state: RootState) => state.game;

export default gameSlice.reducer;
