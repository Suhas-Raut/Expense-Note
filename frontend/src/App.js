import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import API_URL from "./api";

ChartJS.register(ArcElement, Tooltip, Legend);

const API = `${API_URL}/api/transactions`;

// Predefined titles with emojis for autocomplete
const expenseTitles = [
  "🍔 Groceries", "🍕 Pizza", "☕ Coffee", "🍿 Snacks", "🍩 Donuts",
  "🛍️ Clothes", "👗 Apparel", "👠 Shoes", "💄 Perfume", "👜 Bags",
  "🚗 Cab", "🚌 Bus", "🚕 Auto", "✈️ Air Ticket", "⛽ Fuel",
  "🎬 Movies", "🎵 Concert", "🏟️ Sports Event", "🎮 Games", "🎤 Music",
  "🏠 Rent", "💡 Utilities", "📱 Phone Bill", "💊 Medicines", "🧴 Healthcare",
  "🐾 Pet Supplies", "🎁 Gifts", "🍷 Party", "🛋️ Home Decor", "🖥️ Electronics",
  "📝 Stationery", "📚 Books", "🎨 Art Supplies", "🛠️ Repair", "🧰 Tools",
  "💻 Software", "📦 Online Shopping", "🛒 Supermarket", "🧹 Cleaning", "🛏️ Bedding",
  "🛀 Spa", "🏋️ Gym", "🪪 Membership", "🚿 Water", "🌐 Internet",
  "🎓 Education", "💼 Office Supplies", "📷 Photography", "🎟️ Tickets", "🎲 Board Games",
  "🍔 Burger", "🍕 Pizza", "🥪 Sandwich", "🥗 Salad", "🍣 Sushi", "🍜 Noodles",
  "🍝 Pasta", "🥟 Momos", "🌮 Taco", "🍩 Donuts", "☕ Coffee", "🍵 Tea", "🧋 Bubble Tea",
  "🍪 Cookies", "🍫 Chocolate", "🧃 Juice", "🥛 Milkshake", "🍷 Wine", "🍺 Beer",
  "🛵 Zomato", "📦 Blinkit", "🛒 Swiggy", "🍱 Domino's", "🥡 McDonald's", "🍔 KFC",
  "🏠 Home Cooked", "🍽️ Restaurant", "☕ Cafe", "🍹 Bar", "🍷 Lounge",
  "🚗 Cab", "🚕 Auto", "🚌 Bus", "🚖 Ola", "🚘 Uber", "✈️ Flight", "⛽ Fuel", "🚉 Train",
  "🛍️ Mall", "👗 Clothes", "👠 Shoes", "💄 Perfume", "👜 Bag", "📱 Electronics",
  "🛋️ Home Decor", "🏠 Furniture", "🧴 Toiletries", "🧹 Cleaning Supplies", "📚 Books",
  "🎮 Games", "🎨 Art Supplies", "🎁 Gifts", "💊 Medicines",
  "🧾 Bills", "💡 Electricity", "🌐 Internet", "🏋️ Gym", "🎟️ Tickets", "🛏️ Bedding",
  "🛀 Spa", "🎓 Education", "🖌️ Design", "📦 Online Shopping",
  "🛒 Amazon", "🛍️ Flipkart", "👗 Myntra", "🛒 Ajio", "📦 Nykaa", "🛍️ BigBasket",
  "📺 Netflix", "🎬 Amazon Prime Video", "📺 Hotstar", "🎥 Disney+", "📺 SonyLIV",
];

const incomeTitles = [
  "💰 Salary", "🖋️ Freelance", "📈 Investments", "🎁 Gifts", "💸 Bonus",
  "🏦 Interest", "🏠 Rental Income", "🛒 Cashback", "🪙 Crypto", "🧾 Dividend",
  "🎨 Art Sale", "🎤 Performance", "💻 Consulting", "📊 Trading", "🚀 Startup Profit",
  "📝 Writing", "📷 Photography", "🎬 Film Project", "🎮 Gaming", "🛍️ Reselling",
  "🏆 Prize Money", "🎟️ Ticket Sale", "💳 Refund", "🏝️ Travel Reimbursement", "📚 Teaching",
  "🎓 Workshop", "🖌️ Design", "📦 eCommerce", "🛠️ Freelance Work", "🎵 Music",
  "🎮 Stream", "📱 App Revenue", "🏢 Contract Work", "🪄 Magic Show", "🎁 Donations",
  "🪙 NFT Sale", "🎨 Digital Art", "🏀 Sports Coaching", "🎬 Acting", "🎤 Singing",
  "📖 Publishing", "🖥️ Software Dev", "🛒 Dropshipping", "🏡 Property Sale", "💼 Part-time Job",
  "🧩 Miscellaneous"
];

function App() {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState("");
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("🍔 Food");
  const [type, setType] = useState("expense");

  const expenseCategories = [
    "🍔 Food",
    "🛍️ Shopping",
    "🚗 Transport",
    "🎬 Entertainment",
    "🗂️ Other"
  ];

  const incomeCategories = [
    "💰 Salary",
    "🖋️ Freelance",
    "📈 Investments",
    "🎁 Gifts",
    "🗂️ Other"
  ];

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(API);
      setTransactions(res.data);
    } catch (err) {
      console.error("GET error:", err);
    }
  };

  const addTransaction = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    try {
      await axios.post(API, { title, amount: +amount, category, type });
      setTitle("");
      setFilteredTitles([]);
      setAmount("");
      setCategory(type === "income" ? "💰 Salary" : "🍔 Food");
      setType("expense");
      fetchTransactions();
    } catch (err) {
      console.error("POST error:", err);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("DELETE error:", err);
    }
  };

  // Autocomplete filter for title
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);

    const source = type === "income" ? incomeTitles : expenseTitles;
    const filtered = source.filter((t) =>
      t.toLowerCase().includes(val.toLowerCase())
    ).slice(0, 10); // show top 10 suggestions
    setFilteredTitles(filtered);
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
      <div className="grid summary" style={{ justifyContent: "center", gap: "1rem" }}>
        <div className="card total-income glass">
          <h3>Total Income</h3>
          <h2>₹{totalIncome}</h2>
        </div>
        <div className="card total-expense glass">
          <h3>Total Expense</h3>
          <h2>₹{totalExpense}</h2>
        </div>
        <div className="card balance glass">
          <h3>Balance</h3>
          <h2>₹{balance}</h2>
        </div>
      </div>

      {/* ADD FORM */}
      <form className="card form glass" onSubmit={addTransaction}>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setCategory(e.target.value === "income" ? "💰 Salary" : "🍔 Food");
            setTitle("");
            setFilteredTitles([]);
          }}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          list="title-suggestions"
        />
        <datalist id="title-suggestions">
          {filteredTitles.map((t, i) => (
            <option key={i} value={t} />
          ))}
        </datalist>

        <input
          type="number"
          placeholder="Amount ₹"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {(type === "income" ? incomeCategories : expenseCategories).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <button className="add">
          <FaPlus /> Add
        </button>
      </form>

      {/* LIST + CHART */}
      <div className="grid transactions-chart">
        <div className="card list glass">
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

        <div className="card chart glass">
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
