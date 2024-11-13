
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchExpensesStart: (state) => {
      state.loading = true;
    },
    fetchExpensesSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchExpensesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchExpensesStart,
  fetchExpensesSuccess,
  fetchExpensesFailure,
} = expensesSlice.actions;

export const fetchExpenses = () => async (dispatch) => {
  dispatch(fetchExpensesStart());
  try {
    const response = await axios.get('http://localhost:5000/api/expenses');
    dispatch(fetchExpensesSuccess(response.data));
  } catch (error) {
    dispatch(fetchExpensesFailure(error.message));
  }
};

export default expensesSlice.reducer;
