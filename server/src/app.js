const express = require("express");
const cors = require("cors");

const apiRoutes = require("./routes/apiRouter");

const app = express();

app.use(cors());

app.use("/api", apiRoutes);

module.exports = { app };
