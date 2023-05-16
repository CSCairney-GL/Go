import { combineReducers } from 'redux';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({
  game: gameReducer,
  // Add more reducers if needed
});

export default rootReducer;