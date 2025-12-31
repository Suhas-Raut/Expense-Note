const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ---------- ENV ---------- */
const MONGO_URI =
  process.env.MONGODB_URI || process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ No MongoDB URI found. Set MONGODB_URI or MONGO_URI");
  process.exit(1);
}

/* ---------- MIDDLEWARE ---------- */
app.use(cors({ origin: "*" }));
app.use(express.json());

/* ---------- DATABASE ---------- */
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

/* ---------- ROUTES ---------- */
const expenseRoutes = require("./routes/expenses");
const transactionRoutes = require("./routes/transactions");

app.use("/api/expenses", expenseRoutes);
app.use("/api/transactions", transactionRoutes);

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
