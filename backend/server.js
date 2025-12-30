const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// 🔥 Load environment variables from Render Secret File
// Replace '.env' with your actual secret file name if different
const secretPath = "/etc/secrets/.env"; // Render mounts secrets here
if (fs.existsSync(secretPath)) {
  require("dotenv").config({ path: secretPath });
} else {
  // fallback to local .env for development
  require("dotenv").config();
}

const app = express();

/* 🔥 MIDDLEWARE — MUST BE BEFORE ROUTES */
app.use(cors({ origin: "*" }));
app.use(express.json());

/* 🔥 DATABASE */
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

/* 🔥 ROUTES — MUST BE BEFORE app.listen */
const expenseRoutes = require("./routes/expenses");
const transactionRoutes = require("./routes/transactions");

app.use("/api/expenses", expenseRoutes);
app.use("/api/transactions", transactionRoutes);

/* 🔥 SERVER — ALWAYS LAST */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
