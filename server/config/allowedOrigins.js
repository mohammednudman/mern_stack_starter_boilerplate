const dotenv = require("dotenv");
dotenv.config();

const allowedOrigins = [process.env.CLIENT_URL];

module.exports = allowedOrigins;
