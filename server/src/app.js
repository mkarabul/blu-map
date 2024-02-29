const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const apiRoutes = require("./routes/apiRouter");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", apiRoutes);

module.exports = { app };
