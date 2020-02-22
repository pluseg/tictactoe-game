import { put, takeEvery } from 'redux-saga/effects';
import { processMove, calculateResult, makeMove } from './features/game/gameSlice';

function* makeMoveHandler(action) {
  const {i, j} = action.payload;
  yield put({ type: processMove.type, payload: {i, j} });
  yield put({ type: calculateResult.type });
}

function* mySaga() {
  yield takeEvery(makeMove.type, makeMoveHandler);
}

export default mySaga;
