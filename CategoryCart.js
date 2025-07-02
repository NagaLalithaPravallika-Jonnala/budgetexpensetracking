// components/CategoryChart.js
import React, { useContext } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';
import { GlobalContext } from '../context/GlobalState';

const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28', '#FF6666', '#AA88FF'];

const CategoryChart = () => {
  const { transactions } = useContext(GlobalContext);

  // Aggregate expenses by category
  const categoryTotals = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});

  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value
  }));

  if (data.length === 0) return <p>No expense data to display.</p>;

  return (
    <div className="category-chart">
      <h3>Expenses by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
