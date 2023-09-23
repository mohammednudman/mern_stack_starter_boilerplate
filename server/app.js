const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const { logger } = require("./middleware/logger");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

app.use(logger);
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api", require("./routes/indexRoutes.js"));

app.use(errorHandler);

module.exports = app;
