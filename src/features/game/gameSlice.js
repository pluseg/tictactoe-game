import { createSlice } from '@reduxjs/toolkit';
import calculateResultHelper from './calculateResultHelpers';

import {
  STEP_WELCOME,
  STEP_GAME,
  STEP_RESULTS,
  SYMBOL_CROSS,
  SYMBOL_ZERO,
  NO_SYMBOL,
  RESULT_UNKNOWN,
  SIZE
} from '../../constants';

const INITIAL_STATE = {
  step: STEP_WELCOME,
  size: SIZE,
  winLength: 3, // for future flexability. For example, size 15x15 and winLength — 5 in row.
  cells: [],
  turns: 0,
  result: RESULT_UNKNOWN
}

const gameSlice = createSlice({
  name: 'game',
  initialState: INITIAL_STATE,
  reducers: {
    startNewGame(state, action) {
      state.step = STEP_GAME;
      state.result = RESULT_UNKNOWN;
      state.turns = 0;
      state.cells = new Array(state.size).fill(NO_SYMBOL).map(
        () => new Array(state.size).fill(NO_SYMBOL)
      );
    },
    processMove: {
      reducer(state, action) {
        state.turns += 1;
        const currentSymbol = state.turns % 2 ? SYMBOL_ZERO : SYMBOL_CROSS;
        const {i, j} = action.payload;
        state.cells[i][j] = currentSymbol;
      },
      prepare(i, j) {
        return { payload: {i, j} };
      }
    },
    calculateResult(state, action) {
      const result = calculateResultHelper(state.cells, state.turns, state.winLength);
      if (result !== RESULT_UNKNOWN) {
        state.result = result;
        state.step = STEP_RESULTS;
      }
    }
  }
});

gameSlice.actions.makeMove = (i, j) => (dispatch, getState) => {
  if (getState().game.result === RESULT_UNKNOWN && getState().game.cells[i][j] === NO_SYMBOL) {
    dispatch(processMove(i, j));
    dispatch(calculateResult());
  }
};

export const { startNewGame, processMove, makeMove, calculateResult } = gameSlice.actions;

export default gameSlice.reducer;
