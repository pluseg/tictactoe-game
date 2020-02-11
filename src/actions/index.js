import {
  GAME_START,
  GAME_RESET,
  GAME_MOVE
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

export const makeMove = (i, j) => {
  return {
    type: GAME_MOVE,
    payload: {i, j}
  };
};
