const express = require("express");
const cors = require("cors");

const apiRoutes = require("./routes/apiRouter");

const app = express();
const port = process.env.port || 3000;

app.use(cors());

app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
