import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './reducers/boardSlice';

const store = configureStore({
  reducer: {
    board: boardReducer,
  },
});

export default store;