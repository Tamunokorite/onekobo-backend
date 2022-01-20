const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  accountId: { type: String },
  transactionType: { type: String },
  amount: { type: String },
  date: { type: String },
  time: { type: String },
  status: { type: String }
});

module.exports = mongoose.model("transaction", transactionSchema);