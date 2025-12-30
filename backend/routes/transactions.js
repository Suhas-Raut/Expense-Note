// transactions.js
const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

router.get("/", async (req, res) => {
  try {
    const data = await Transaction.find().sort({ date: -1 });
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: "Server error fetching transactions" });
  }
});

router.post("/", async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.json(transaction);
  } catch (e) {
    res.status(500).json({ message: "Server error adding transaction" });
  }
});

// ✅ Add DELETE route
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: "Server error deleting transaction" });
  }
});

module.exports = router;
