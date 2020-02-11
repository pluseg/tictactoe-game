import {
  STEP_WELCOME,
  STEP_GAME,
  STEP_RESULTS,
  SYMBOL_CROSS,
  SYMBOL_ZERO,
  RESULT_TIE,
  RESULT_CROSS_WIN,
  RESULT_ZERO_WIN,
  RESULT_UNKNOWN
} from '../actions/gameSteps';

import {
  GAME_START,
  GAME_RESET,
  GAME_MOVE
} from '../actions/types';

const INITIAL_STATE = {
  step: STEP_WELCOME,
  size: 3, // TODO: ask @sg if it's a proper place for such constant
  winLength: 3,
  cells: [],
  turns: 0,
  result: RESULT_UNKNOWN
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GAME_START:
    case GAME_RESET:
      return {
        ...INITIAL_STATE,
        step: STEP_GAME,
        cells: initializeCells(state.size),
      };
    case GAME_MOVE:
      // TODO: ask @sg about logic storage — reducers or components?
      const {i, j} = action.payload;

      if (state.cells[i][j] !== null || state.result !== RESULT_UNKNOWN) {
        return state;
      }

      const turns = state.turns + 1;
      const symbolOfMove = getSymbolByTurn(turns);

      let cells = Object.assign([...state.cells], {
        [i]: Object.assign([...state.cells[i]], {
          [j]: symbolOfMove
        })
      });

      const result = calculateResult(cells, turns, state.winLength);
      const step = result !== RESULT_UNKNOWN ? STEP_RESULTS : STEP_GAME;

      return {...state, turns, cells, step, result};
    default:
      return state;
  }
};

const initializeCells = (size) => {
  let cells = [];
  for (let i = 0; i < size; i++) {
    cells[i] = [];
    for(let j = 0; j < size; j++) {
      cells[i][j] = null;
    }
  }

  return cells;
}

const getSymbolByTurn = turnNumber => {
  return turnNumber % 2 ? SYMBOL_ZERO : SYMBOL_CROSS;
}

const calculateResult = (cells, turns, winLength) => {
  const symbol = findRepeatedSymbol(cells, winLength);

  switch (symbol) {
    case SYMBOL_ZERO:
      return RESULT_ZERO_WIN;
    case SYMBOL_CROSS:
      return RESULT_CROSS_WIN;
    default:
      if (turns === cells[0].length ** 2) {
        return RESULT_TIE;
      }
      return RESULT_UNKNOWN;
  }
}

const findRepeatedSymbol = (cells, requiredLength) => {
  const size = cells[0].length;
  let symbol, diagonals = {leftUpper: [], rightUpper: []};

  for (let i = 0; i < size; i++) {
    // Check row
    symbol = findRepeatedSymbolSequence(cells[i], requiredLength);
    if (symbol !== null) {
      return symbol;
    }

    // Check column
    let column = [];
    for (let j = 0; j < size; j++) {
      column.push(cells[j][i]);
    }

    symbol = findRepeatedSymbolSequence(column, requiredLength);
    if (symbol !== null) {
      return symbol;
    }

    diagonals['leftUpper'].push(cells[i][i]);
    diagonals['rightUpper'].push(cells[i][size - i - 1]);
  }

  // Check diagonals
  symbol = findRepeatedSymbolSequence(diagonals['leftUpper'], requiredLength);
  if (symbol !== null) {
    return symbol;
  }

  symbol = findRepeatedSymbolSequence(diagonals['rightUpper'], requiredLength);
  if (symbol !== null) {
    return symbol;
  }

  return null;
};

const findRepeatedSymbolSequence = (arr, requiredLength) => {
  for (let i = 0; i < arr.length - requiredLength + 1; i++) {
    let repetitions = 0;
    let value = arr[i];
    for (let j = i; j < i + requiredLength; j++) {
      if (arr[j] !== value) {
        break;
      }
      repetitions++;
    }

    if (repetitions === requiredLength) {
      return value;
    }
  }

  return null;
}
