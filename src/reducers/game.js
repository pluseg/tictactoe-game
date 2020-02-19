import {
  STEP_WELCOME,
  STEP_GAME,
  STEP_RESULTS,
  SYMBOL_CROSS,
  SYMBOL_ZERO,
  RESULT_UNKNOWN
} from '../constants';

import {
  GAME_START,
  GAME_RESET,
  GAME_MOVE,
  GAME_CALCULATE_RESULT
} from '../actions/types';

import calculateResult from './helpers/calculateResult';

const INITIAL_STATE = {
  step: STEP_WELCOME,
  size: 3, // TODO: ask @sg if it's a proper place for such constant
  winLength: 3, // for future flexability. For example, size 15x15 and winLength — 5 in row.
  cells: [],
  turns: 0,
  result: RESULT_UNKNOWN
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GAME_START:
    case GAME_RESET:
      const initialStateOfCells = new Array(state.size).fill(null).map(
        () => new Array(state.size).fill(null)
      );

      return {
        ...INITIAL_STATE,
        step: STEP_GAME,
        cells: initialStateOfCells,
      };

    case GAME_MOVE:
      const {i, j} = action.payload;

      if (state.result !== RESULT_UNKNOWN || state.cells[i][j] !== null) {
        return state;
      }

      const turns = state.turns + 1;
      const currentSymbol = turns % 2 ? SYMBOL_ZERO : SYMBOL_CROSS;

      let cells = Object.assign([...state.cells], {
        [i]: Object.assign([...state.cells[i]], {
          [j]: currentSymbol
        })
      });
      return {...state, turns, cells};

    case GAME_CALCULATE_RESULT:
      const result = calculateResult(state.cells, state.turns, state.winLength);
      if (result === RESULT_UNKNOWN) {
        return state;
      }
      return {...state, step: STEP_RESULTS, result};

    default:
      return state;
  }
};
