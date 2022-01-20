const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  userEmail: { type: String, unique: true },
  balance: { type: Number, default: 0.00 },
  cards: { type: Array, default: [] }
//   add budget if applicable
});

module.exports = mongoose.model("account", accountSchema);