import {
  SYMBOL_CROSS,
  SYMBOL_ZERO,
  RESULT_TIE,
  RESULT_CROSS_WIN,
  RESULT_ZERO_WIN,
  RESULT_UNKNOWN,
} from '../../constants';

export const findRepeatedSymbolSequence = (arr, requiredLength) => {
  for (let i = 0; i < arr.length - requiredLength + 1; i += 1) {
    let repetitions = 0;
    const value = arr[i];
    for (let j = i; j < i + requiredLength; j += 1) {
      if (arr[j] !== value) {
        break;
      }
      repetitions += 1;
    }

    if (repetitions === requiredLength) {
      return value;
    }
  }

  return null;
};

export const findRepeatedSymbol = (cells, requiredLength) => {
  const size = cells[0].length;
  const diagonals = { leftUpper: [], rightUpper: [] };

  let symbol;
  for (let i = 0; i < size; i += 1) {
    // Check row
    symbol = findRepeatedSymbolSequence(cells[i], requiredLength);
    if (symbol !== null) {
      return symbol;
    }

    // Check column
    const column = [];
    for (let j = 0; j < size; j += 1) {
      column.push(cells[j][i]);
    }

    symbol = findRepeatedSymbolSequence(column, requiredLength);
    if (symbol !== null) {
      return symbol;
    }

    diagonals.leftUpper.push(cells[i][i]);
    diagonals.rightUpper.push(cells[i][size - i - 1]);
  }

  // Check diagonals
  symbol = findRepeatedSymbolSequence(diagonals.leftUpper, requiredLength);
  if (symbol !== null) {
    return symbol;
  }

  symbol = findRepeatedSymbolSequence(diagonals.rightUpper, requiredLength);
  if (symbol !== null) {
    return symbol;
  }

  return null;
};

export default (cells, turns, winLength) => {
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
};
