import { put, takeEvery } from 'redux-saga/effects';
import {
  processMove,
  calculateResult,
  makeMove,
} from './features/game/gameSlice';

function* makeMoveHandler(action) {
  const { i, j } = action.payload;
  // use Selector ("reselect" library) here for checking permission for making a move.
  yield put({ type: processMove.type, payload: { i, j } });
  yield put({ type: calculateResult.type });
}

function* mySaga() {
  yield takeEvery(makeMove.type, makeMoveHandler);
}

export default mySaga;
