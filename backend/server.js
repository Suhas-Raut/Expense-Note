const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* MIDDLEWARE */
app.use(cors({ origin: "*" }));
app.use(express.json());

/* DATABASE */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

/* ROUTES */
const expenseRoutes = require("./routes/expenses");
const transactionRoutes = require("./routes/transactions");

app.use("/api/expenses", expenseRoutes);
app.use("/api/transactions", transactionRoutes);

/* SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
