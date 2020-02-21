import game, {startNewGame, makeMove, processMove, calculateResult } from './gameSlice';
import * as cnsts from '../../constants';

describe('game reducer', () => {
  it('should START GAME', () => {
    expect(
      game({
        step: cnsts.STEP_WELCOME,
        size: 3,
        winLength: 3,
        cells: [],
        turns: 0,
        result: cnsts.RESULT_UNKNOWN
      }, {
        type: startNewGame.type,
        payload: {}
      })
    ).toEqual({
      step: cnsts.STEP_GAME,
      size: 3,
      winLength: 3,
      cells: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      turns: 0,
      result: cnsts.RESULT_UNKNOWN
    });
  });

  it('should PROCESS a MOVE: the first player', () => {
    expect(
      game({
        step: cnsts.STEP_GAME,
        size: 3,
        winLength: 3,
        cells: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
        turns: 0,
        result: cnsts.RESULT_UNKNOWN
      }, {
        type: processMove.type,
        payload: { i: 0, j: 0 }
      })
    ).toEqual({
      step: cnsts.STEP_GAME,
      size: 3,
      winLength: 3,
      cells: [
        [cnsts.SYMBOL_ZERO, null, null],
        [null, null, null],
        [null, null, null],
      ],
      turns: 1,
      result: cnsts.RESULT_UNKNOWN
    });
  });

  it('should PROCESS a MOVE: the second player', () => {
    expect(
      game({
        step: cnsts.STEP_GAME,
        size: 3,
        winLength: 3,
        cells: [
          [cnsts.SYMBOL_ZERO, null, null],
          [null, null, null],
          [null, null, null],
        ],
        turns: 1,
        result: cnsts.RESULT_UNKNOWN
      }, {
        type: processMove.type,
        payload: { i: 1, j: 1 }
      })
    ).toEqual({
      step: cnsts.STEP_GAME,
      size: 3,
      winLength: 3,
      cells: [
        [cnsts.SYMBOL_ZERO, null, null],
        [null, cnsts.SYMBOL_CROSS, null],
        [null, null, null],
      ],
      turns: 2,
      result: cnsts.RESULT_UNKNOWN
    });
  });

  it('should RESET GAME', () => {
    expect(
      game({
        step: cnsts.STEP_GAME,
        size: 3,
        winLength: 3,
        cells: [
          [cnsts.SYMBOL_ZERO, null, null],
          [null, null, null],
          [null, null, null],
        ],
        turns: 1,
        result: cnsts.RESULT_UNKNOWN
      }, {
        type: startNewGame.type,
        payload: {}
      })
    ).toEqual({
      step: cnsts.STEP_GAME,
      size: 3,
      winLength: 3,
      cells: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      turns: 0,
      result: cnsts.RESULT_UNKNOWN
    });
  });

  it('should CALCULATE no RESULTS if game is not finished', () => {
    expect(
      game({
        step: cnsts.STEP_GAME,
        size: 3,
        winLength: 3,
        cells: [
          [cnsts.SYMBOL_ZERO, cnsts.SYMBOL_ZERO, cnsts.SYMBOL_CROSS],
          [cnsts.SYMBOL_CROSS, cnsts.SYMBOL_CROSS, cnsts.SYMBOL_ZERO],
          [cnsts.SYMBOL_ZERO, cnsts.SYMBOL_CROSS, cnsts.NO_SYMBOL],
        ],
        turns: 8,
        result: cnsts.RESULT_UNKNOWN
      }, {
        type: calculateResult.type,
        payload: {}
      })
    ).toEqual({
      step: cnsts.STEP_GAME,
      size: 3,
      winLength: 3,
      cells: [
        [cnsts.SYMBOL_ZERO, cnsts.SYMBOL_ZERO, cnsts.SYMBOL_CROSS],
        [cnsts.SYMBOL_CROSS, cnsts.SYMBOL_CROSS, cnsts.SYMBOL_ZERO],
        [cnsts.SYMBOL_ZERO, cnsts.SYMBOL_CROSS, cnsts.NO_SYMBOL],
      ],
      turns: 8,
      result: cnsts.RESULT_UNKNOWN
    });
  });

  it('should CALCULATE ending with TIE', () => {
    expect(
      game({
        step: cnsts.STEP_GAME,
        size: 3,
        winLength: 3,
        cells: [
          [cnsts.SYMBOL_ZERO, cnsts.SYMBOL_ZERO, cnsts.SYMBOL_CROSS],
          [cnsts.SYMBOL_CROSS, cnsts.SYMBOL_CROSS, cnsts.SYMBOL_ZERO],
          [cnsts.SYMBOL_ZERO, cnsts.SYMBOL_CROSS, cnsts.SYMBOL_ZERO],
        ],
        turns: 9,
        result: cnsts.RESULT_UNKNOWN
      }, {
        type: calculateResult.type,
        payload: {}
      })
    ).toEqual({
      step: cnsts.STEP_RESULTS,
      size: 3,
      winLength: 3,
      cells: [
        [cnsts.SYMBOL_ZERO, cnsts.SYMBOL_ZERO, cnsts.SYMBOL_CROSS],
        [cnsts.SYMBOL_CROSS, cnsts.SYMBOL_CROSS, cnsts.SYMBOL_ZERO],
        [cnsts.SYMBOL_ZERO, cnsts.SYMBOL_CROSS, cnsts.SYMBOL_ZERO],
      ],
      turns: 9,
      result: cnsts.RESULT_TIE
    });
  });

  it('should CALCULATE RESULT: horizontal', () => {
    expect(
      game({
        step: cnsts.STEP_GAME,
        size: 3,
        winLength: 3,
        cells: [
          [cnsts.SYMBOL_ZERO, cnsts.SYMBOL_ZERO, cnsts.SYMBOL_ZERO],
          [cnsts.SYMBOL_CROSS, cnsts.SYMBOL_CROSS, cnsts.NO_SYMBOL],
          [cnsts.NO_SYMBOL, cnsts.NO_SYMBOL, cnsts.NO_SYMBOL],
        ],
        turns: 5,
        result: cnsts.RESULT_UNKNOWN
      }, {
        type: calculateResult.type,
        payload: {}
      })
    ).toEqual({
      step: cnsts.STEP_RESULTS,
      size: 3,
      winLength: 3,
      cells: [
        [cnsts.SYMBOL_ZERO, cnsts.SYMBOL_ZERO, cnsts.SYMBOL_ZERO],
        [cnsts.SYMBOL_CROSS, cnsts.SYMBOL_CROSS, cnsts.NO_SYMBOL],
        [cnsts.NO_SYMBOL, cnsts.NO_SYMBOL, cnsts.NO_SYMBOL],
      ],
      turns: 5,
      result: cnsts.RESULT_ZERO_WIN
    });
  });

  it('should CALCULATE RESULT: vertical', () => {
    expect(
      game({
        step: cnsts.STEP_GAME,
        size: 3,
        winLength: 3,
        cells: [
          [cnsts.SYMBOL_ZERO, cnsts.SYMBOL_CROSS, cnsts.SYMBOL_CROSS],
          [cnsts.SYMBOL_ZERO, cnsts.NO_SYMBOL, cnsts.NO_SYMBOL],
          [cnsts.SYMBOL_ZERO, cnsts.NO_SYMBOL, cnsts.NO_SYMBOL],
        ],
        turns: 5,
        result: cnsts.RESULT_UNKNOWN
      }, {
        type: calculateResult.type,
        payload: {}
      })
    ).toEqual({
      step: cnsts.STEP_RESULTS,
      size: 3,
      winLength: 3,
      cells: [
        [cnsts.SYMBOL_ZERO, cnsts.SYMBOL_CROSS, cnsts.SYMBOL_CROSS],
        [cnsts.SYMBOL_ZERO, cnsts.NO_SYMBOL, cnsts.NO_SYMBOL],
        [cnsts.SYMBOL_ZERO, cnsts.NO_SYMBOL, cnsts.NO_SYMBOL],
      ],
      turns: 5,
      result: cnsts.RESULT_ZERO_WIN
    });
  });

  it('should CALCULATE RESULT: diagonal', () => {
    expect(
      game({
        step: cnsts.STEP_GAME,
        size: 3,
        winLength: 3,
        cells: [
          [cnsts.SYMBOL_ZERO, cnsts.SYMBOL_CROSS, cnsts.SYMBOL_CROSS],
          [cnsts.SYMBOL_ZERO, cnsts.NO_SYMBOL, cnsts.NO_SYMBOL],
          [cnsts.SYMBOL_ZERO, cnsts.NO_SYMBOL, cnsts.NO_SYMBOL],
        ],
        turns: 5,
        result: cnsts.RESULT_UNKNOWN
      }, {
        type: calculateResult.type,
        payload: {}
      })
    ).toEqual({
      step: cnsts.STEP_RESULTS,
      size: 3,
      winLength: 3,
      cells: [
        [cnsts.SYMBOL_ZERO, cnsts.SYMBOL_CROSS, cnsts.SYMBOL_CROSS],
        [cnsts.SYMBOL_ZERO, cnsts.NO_SYMBOL, cnsts.NO_SYMBOL],
        [cnsts.SYMBOL_ZERO, cnsts.NO_SYMBOL, cnsts.NO_SYMBOL],
      ],
      turns: 5,
      result: cnsts.RESULT_ZERO_WIN
    });
  });
});
