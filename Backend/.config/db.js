require('dotenv').config();
const mongoose = require("mongoose");

const connectionString = process.env.connectionString;

const connectDB = async () => {
  await mongoose
    .connect(connectionString)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((error) => {
      console.error("Database Connection Error:", error.message);
      process.exit(1);
    });
};

module.exports = connectDB;