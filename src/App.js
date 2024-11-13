// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from './slices/expensesSlice';
import ExpenseList from './components/ExpenseList';
import './index.css';

function App() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-poppins font-bold text-center mb-20">Expense Management System</h1>
      {loading && <p>Loading expenses...</p>}
      {error && <p>Error: {error}</p>}
      <ExpenseList expenses={items} />
    </div>
  );
}

export default App;
