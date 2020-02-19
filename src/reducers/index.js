import {combineReducers} from 'redux';
// import game from './game';
import gameSliceReducer from '../features/game/gameSlice';

export default combineReducers({
  game: gameSliceReducer
});
