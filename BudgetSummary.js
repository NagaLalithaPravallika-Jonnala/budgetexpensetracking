// components/BudgetSummary.js
import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const BudgetSummary = () => {
  const { transactions } = useContext(GlobalContext);

  const income = transactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const expenses = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = income - expenses;

  return (
    <div className="budget-summary">
      <h3>Budget Summary</h3>
      <div>💰 Total Income: <strong>${income.toFixed(2)}</strong></div>
      <div>💸 Total Expenses: <strong>${expenses.toFixed(2)}</strong></div>
      <div>
        📊 Remaining Budget: <strong style={{ color: balance >= 0 ? 'green' : 'red' }}>
          ${balance.toFixed(2)}
        </strong>
      </div>
    </div>
  );
};

export default BudgetSummary;
