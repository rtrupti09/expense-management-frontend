
import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './slices/expensesSlice';
// import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
  // middleware: [thunk],
});

export default store;
