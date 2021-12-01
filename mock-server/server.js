const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

const app = express();

//middlewares
app.use(morgan("dev"));
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
app.use(cookieParser());
app.use(cors());

//routes middleware
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
