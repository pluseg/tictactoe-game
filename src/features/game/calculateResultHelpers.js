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
    const value = arr[i];
    if (value === null) {
      continue;
    }

    let repetitions = 0;
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

  // Check additional diagonals (excluding main ones as they were already checked above)
  let additionalDiagonals = [];
  for (let i = 1; i < size; i += 1) {
    // [1,0] -> [1, 0], [2, 1], [3, 2], ..., [size - 1, size - 1 - i]
    additionalDiagonals = [[], [], [], []];
    for (let j = 0; j < size - i; j += 1) {
      additionalDiagonals[0].push(cells[i + j][j]);
      additionalDiagonals[1].push(cells[j][i + j]);
      additionalDiagonals[2].push(cells[size - 1 - i - j][j]);
      additionalDiagonals[3].push(cells[size - 1 - j][i + j]);
    }

    for (let j = 0; j <= 3; j += 1) {
      let symbol = findRepeatedSymbolSequence(
        additionalDiagonals[j],
        requiredLength,
      );
      if (symbol !== null) {
        return symbol;
      }
    }
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
