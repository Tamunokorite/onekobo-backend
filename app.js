require("dotenv").config();
require("./config/database").connect();
const express = require("express");
// const cors = require('cors');

const app = express();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { authRoutes } = require('./routes');

app.use(express.json());
// app.use(cors({origin: true}))

// Logic goes here
// importing user context

app.use('/auth/', authRoutes);

  const auth = require("./middleware/auth");

app.post("/welcome", auth, async (req, res) => {
    let email = req.user.email;
    const user = await User.findOne({ email });
    // res.status(200).send("Welcome 🙌 " + user.first_name + " " + user.last_name);
    res.status(200).send(user)
});

app.post("/fund", auth, async (req, res) => {
  res.status(200).send("Transaction successful!");
});

module.exports = app;