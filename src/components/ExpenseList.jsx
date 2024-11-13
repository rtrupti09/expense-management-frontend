import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ExpenseItem from './ExpenseItem';
import { fetchExpenses } from '../slices/expensesSlice';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

const ExpenseList = ({ expenses }) => {
  const dispatch = useDispatch();
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    amount: '',
    description: '',
    category: '',
    date: new Date(),
  });

  const categories = [
    { value: 'Food', label: 'Food' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Utilities', label: 'Utilities' },
    { value: 'Shopping',label:'Shopping'},
    { value: 'Others',label: 'Others'}
  ];

  const handleAddExpense = async () => {
    await axios.post('http://localhost:5000/api/expenses', newExpense);
    setIsAddExpenseModalOpen(false);
    dispatch(fetchExpenses());
  };

  const handleCloseModal = () => {
    setIsAddExpenseModalOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 ">
    <button
  onClick={() => {
    setNewExpense({
      amount: '',
      description: '',
      category: '',
      date: new Date(),
    });
    setIsAddExpenseModalOpen(true);
  }}
  className="absolute right-16 top-20   px-4 py-2 bg-purple-700 text-white rounded-full mb-8 "
>
  Add Expense
</button>



      {/* Add Expense Modal */}
      {isAddExpenseModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70"
          onClick={handleCloseModal}
        >
          <div
            className="bg-black p-6 rounded-lg w-[500px] h-[500px]"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleAddExpense}>
            <h3 className="text-white font-bold text-3xl text-center mb-10">
              Add Your Expenses Here
            </h3>
            <div className="flex flex-col gap-6">
              <input
                type="number"
                placeholder="Amount"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                className="p-3 border rounded-full bg-black text-white placeholder-white"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                className="p-3 border rounded-full bg-black text-white placeholder-white"
                required
              />
              <Select
                options={categories}
                value={categories.find((cat) => cat.value === newExpense.category)}
                onChange={(selectedOption) => setNewExpense({ ...newExpense, category: selectedOption.value })}
                className="p-2 border rounded-full bg-black text-white"
                required
                styles={{
                  control: (base) => ({
                    ...base,
                    border: 'none',
                    boxShadow: 'none',
                    backgroundColor: 'black',
                    color: 'white',
                  }),
                  singleValue: (base) => ({ ...base, color: 'white' }),
                  placeholder: (base) => ({ ...base, color: 'white' }),
                  option: (base) => ({
                    ...base,
                    backgroundColor: 'black',
                    color: 'white',
                    '&:hover': { backgroundColor: '#6b46c1' },
                  }),
                }}
                placeholder="Select Category"
              />
              <DatePicker
                selected={newExpense.date}
                onChange={(date) => setNewExpense({ ...newExpense, date })}
                className="p-3 border rounded-full w-[450px] bg-black text-white"
                dateFormat="yyyy/MM/dd"
                placeholderText="Select Date"
                required
              />
              <button
                // onClick={handleAddExpense} 
                type='submit'
                className="px-4 py-2 bg-purple-800 text-white rounded-full text-center"
              >
                Add Expense
              </button>
              
            </div>
            </form>
          </div>
        </div>
      )}

      {/* Expense Table */}
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-5 py-3 text-white bg-purple-700">Amount</th>
            <th className="px-5 py-3 text-white bg-purple-700">Description</th>
            <th className="px-5 py-3 text-white bg-purple-700">Category</th>
            <th className="px-5 py-3 text-white bg-purple-700">Date</th>
            <th className="px-5 py-3 text-white bg-purple-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length ? (
            expenses.map((expense) => (
              <ExpenseItem key={expense.id} expense={expense} />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-gray-500 text-center py-4">
                No expenses recorded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
