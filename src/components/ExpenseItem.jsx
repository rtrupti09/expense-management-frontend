import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchExpenses } from '../slices/expensesSlice';
import axios from 'axios';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ExpenseItem = ({ expense, categories = [] }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    amount: expense.amount,
    description: expense.description,
    category: expense.category,
    date: new Date(expense.date),
  });

  // Define categories or fetch them from an API
  const categoryOptions = [
    { value: 'Travel', label: 'Travel' },
    { value: 'Food', label: 'Food' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Utilities', label: 'Utilities' },
    { value: 'Shopping', label: 'Shopping' },
    { value: 'Other', label: 'Other' },
  ];

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/expenses/${expense.id}`);
    dispatch(fetchExpenses());
  };
  
  const handleEdit = async () => {
    await axios.put(`http://localhost:5000/api/expenses/${expense.id}`, formData);
    setIsEditing(false);
    dispatch(fetchExpenses());
  };
  

  return (
    <>
      {/* Table Row */}
      <tr className="border-t border-b">
        <td className="px-4 py-5 border-l border-r">{expense.amount}</td>
        <td className="px-4 py-5 border-l border-r">{expense.description}</td>
        <td className="px-4 py-5 border-l border-r">{expense.category}</td>
        <td className="px-4 py-5 border-l border-r">{new Date(expense.date).toDateString()}</td>
        <td className="px-4 py-5 border-l border-r">
          <div className="space-x-5">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-purple-700 text-white px-6 py-2 rounded-lg gap-5"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      {/* Edit Modal */}
      {isEditing && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70"
          onClick={() => setIsEditing(false)}
        >
          <div
            className="bg-black p-6 rounded-lg w-[500px] h-[500px]"
            onClick={(e) => e.stopPropagation()} 
          >
            <h3 className="text-white font-bold text-3xl text-center mb-10">
              Edit Expense
            </h3>
            <div className="flex flex-col gap-6">
              <input
                type="number"
                placeholder="Amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="p-3 border rounded-full bg-black text-white placeholder-white"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="p-3 border rounded-full bg-black text-white placeholder-white"
                required
              />
               <Select
                options={categoryOptions} 
                value={categoryOptions.find((cat) => cat.value === formData.category)}
                onChange={(selectedOption) => setFormData({ ...formData, category: selectedOption.value })}
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
                selected={formData.date}
                onChange={(date) => setFormData({ ...formData, date })}
                className="p-3 border rounded-full w-[450px] bg-black text-white"
                dateFormat="yyyy/MM/dd"
                placeholderText="Select Date"
                required
              />
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-purple-600 text-white rounded-full"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpenseItem;