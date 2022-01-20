require("dotenv").config();
require("./config/database").connect();
const express = require("express");
// const cors = require('cors');

const app = express();
const { authRoutes, accountsRoutes } = require('./routes');

app.use(express.json());
// app.use(cors({origin: true}))

// Logic goes here
// importing user context

app.use('/auth/', authRoutes);
app.use('/accounts/', accountsRoutes);


const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

app.listen(port, () => console.log(`Server running at port ${port}`));