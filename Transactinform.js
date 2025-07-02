// components/TransactionForm.js
import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

const TransactionForm = ({ editItem = null, onComplete }) => {
  const { addTransaction, editTransaction } = useContext(GlobalContext);

  const [form, setForm] = useState({
    type: 'expense',
    category: '',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (editItem) setForm(editItem);
  }, [editItem]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newTransaction = {
      ...form,
      id: editItem ? form.id : Date.now(),
      amount: parseFloat(form.amount),
    };

    editItem ? editTransaction(newTransaction) : addTransaction(newTransaction);
    setForm({ type: 'expense', category: '', description: '', amount: '', date: new Date().toISOString().split('T')[0] });
    if (onComplete) onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <h3>{editItem ? 'Edit' : 'Add'} Transaction</h3>
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="income">Income</option>
        <optio
