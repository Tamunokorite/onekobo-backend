const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  accountId: { type: String },
  month: { type: Number },
  items: { type: Array }
});

module.exports = mongoose.model("budget", budgetSchema);