const express = require("express");
const cors = require("cors");
const { checkJwt } = require("./middleware/authMiddleware");

const apiRoutes = require("./routes/apiRouter");

const app = express();
const port = process.env.port || 3000;

app.use(cors());

app.use("/api", checkJwt, apiRoutes);

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
