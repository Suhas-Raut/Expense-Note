import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://YOUR-BACKEND.onrender.com"
    : "http://localhost:5000";

const API = `${API_BASE}/api/transactions`;

function App() {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState("expense");

  const fetchTransactions = async () => {
    const res = await axios.get(API);
    setTransactions(res.data);
  };

  const addTransaction = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    await axios.post(API, { title, amount: +amount, category, type });
    setTitle("");
    setAmount("");
    setCategory("Food");
    setType("expense");
    fetchTransactions();
  };

  const deleteTransaction = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ---------- Totals ----------
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // ---------- Chart (Expense Only) ----------
  const expenseTotals = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});

  const chartData = {
    labels: Object.keys(expenseTotals),
    datasets: [
      {
        data: Object.values(expenseTotals),
        backgroundColor: [
          "#F87171", "#FB923C", "#FACC15",
          "#4ADE80", "#2DD4BF", "#60A5FA",
          "#A78BFA", "#F472B6"
        ],
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="app">
      <h1>💰 Expense & Income Tracker</h1>

      {/* SUMMARY CARDS */}
      <div className="grid summary">
        <div className="card total-income">
          <h3>Total Income</h3>
          <h2>₹{totalIncome}</h2>
        </div>
        <div className="card total-expense">
          <h3>Total Expense</h3>
          <h2>₹{totalExpense}</h2>
        </div>
        <div className="card balance">
          <h3>Balance</h3>
          <h2>₹{balance}</h2>
        </div>
      </div>

      {/* ADD FORM */}
      <form className="card form" onSubmit={addTransaction}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount ₹"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
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

      {/* LIST + CHART SIDE BY SIDE */}
      <div className="grid transactions-chart">
        <div className="card list">
          <h3>All Transactions</h3>
          {transactions.map((t) => (
            <div key={t._id} className="row">
              <span className={t.type}>{t.type.toUpperCase()}</span>
              <span>{t.title}</span>
              <span>₹{t.amount}</span>
              <span className="cat">{t.category}</span>
              <FaTrash onClick={() => deleteTransaction(t._id)} />
            </div>
          ))}
        </div>

        <div className="card chart">
          <h3>Spending Breakdown</h3>
          {Object.keys(expenseTotals).length ? (
            <Doughnut data={chartData} />
          ) : (
            <p>No expense data yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
