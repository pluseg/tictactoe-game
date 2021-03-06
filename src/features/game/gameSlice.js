import { createSlice, createAction } from '@reduxjs/toolkit';
import history from '../../history';
import calculateResultHelper from './calculateResultHelpers';

import {
  STEP_WELCOME,
  STEP_GAME,
  STEP_RESULTS,
  SYMBOL_CROSS,
  SYMBOL_ZERO,
  NO_SYMBOL,
  RESULT_UNKNOWN,
  SIZE,
} from '../../constants';

const INITIAL_STATE = {
  step: STEP_WELCOME,
  size: SIZE,
  winLength: 3, // for future flexability. For example, size 15x15 and winLength — 5 in row.
  cells: [],
  turns: 0,
  result: RESULT_UNKNOWN,
};

/* eslint no-param-reassign: 0 */
const gameSlice = createSlice({
  name: 'game',
  initialState: INITIAL_STATE,
  reducers: {
    startNewGame(state, action) {
      state.step = STEP_GAME;
      state.result = RESULT_UNKNOWN;
      state.size = action.payload || SIZE;
      state.winLength = state.size > 3 ? 5 : 3;
      state.turns = 0;
      state.cells = new Array(state.size)
        .fill(NO_SYMBOL)
        .map(() => new Array(state.size).fill(NO_SYMBOL));
      history.push('/game');
    },
    processMove: {
      reducer(state, action) {
        const { i, j } = action.payload;
        if (
          state.cells[i][j] === NO_SYMBOL &&
          state.result === RESULT_UNKNOWN
        ) {
          state.turns += 1;
          const currentSymbol = state.turns % 2 ? SYMBOL_ZERO : SYMBOL_CROSS;
          state.cells[i][j] = currentSymbol;
        }
      },
      prepare(i, j) {
        return { payload: { i, j } };
      },
    },
    calculateResult(state) {
      const result = calculateResultHelper(
        state.cells,
        state.turns,
        state.winLength,
      );
      if (result !== RESULT_UNKNOWN) {
        state.result = result;
        state.step = STEP_RESULTS;
        history.push('/results');
      }
    },
  },
});
/* eslint no-param-reassign: 2 */

gameSlice.actions.makeMove = createAction('game/makeMove', (i, j) => ({
  payload: { i, j },
}));

export const {
  startNewGame,
  processMove,
  makeMove,
  calculateResult,
} = gameSlice.actions;

export default gameSlice.reducer;
