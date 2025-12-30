import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const API = "http://localhost:5000/api/expenses";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const fetchExpenses = async () => {
    const res = await axios.get(API);
    setExpenses(res.data);
  };

  const addExpense = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    await axios.post(API, { title, amount, category });
    setTitle("");
    setAmount("");
    fetchExpenses();
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const totals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(totals),
    datasets: [
      {
        data: Object.values(totals),
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="app">
      <h1>💰 Expense Tracker</h1>

      <form className="card" onSubmit={addExpense}>
        <input
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount ₹"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Food</option>
          <option>Shopping</option>
          <option>Transport</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>

        <button className="add">
          <FaPlus /> Add
        </button>
      </form>

      <div className="grid">
        <div className="card list">
          <h3>Expenses</h3>
          {expenses.map((e) => (
            <div key={e._id} className="row">
              <span>{e.title}</span>
              <span>₹{e.amount}</span>
              <span className="cat">{e.category}</span>
              <FaTrash onClick={() => deleteExpense(e._id)} />
            </div>
          ))}
        </div>

        <div className="card chart">
          <h3>Spending Breakdown</h3>
          <Doughnut data={chartData} />
        </div>
      </div>
    </div>
  );
}

export default App;
