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
    makeMove: {
      reducer(state, action) {
        const {i, j} = action.payload;

        if (state.result === RESULT_UNKNOWN && state.cells[i][j] === NO_SYMBOL) {
          state.turns += 1;
          const currentSymbol = state.turns % 2 ? SYMBOL_ZERO : SYMBOL_CROSS;
          state.cells[i][j] = currentSymbol;
        }
      },
      prepare(i, j) {
        return { payload: {i, j} };
      }
    },
    calculateResult(state, action) {
      const result = calculateResultHelper(state.cells, state.turns, state.winLength);
      if (result !== RESULT_UNKNOWN) {
        state.step = STEP_RESULTS;
        state.result = result;
      }
    }
  }
});

export const { startNewGame, makeMove, calculateResult } = gameSlice.actions;

export const processMove = (i, j) => dispatch => {
  dispatch(makeMove(i, j));
  dispatch(calculateResult());
};

export default gameSlice.reducer;
