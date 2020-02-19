import {
  GAME_START,
  GAME_RESET,
  GAME_MOVE,
  GAME_CALCULATE_RESULT
} from './types';

export const startGame = () => {
  return {
    type: GAME_START
  };
};

export const resetGame = () => {
  return {
    type: GAME_RESET
  };
};

export const makeMove = (i, j) => dispatch => {
  dispatch({type: GAME_MOVE, payload: {i, j}});
  dispatch({type: GAME_CALCULATE_RESULT});
};
