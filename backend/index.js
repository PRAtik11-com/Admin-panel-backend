const express = require("express");
require("dotenv").config()

const heroRouter = require("./routes/hero.routes");
const logger  = require("./middlewares/logger.middleware");

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api", heroRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  console.log("connected to server");
  
});
