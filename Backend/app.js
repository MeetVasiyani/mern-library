require('dotenv').config({ path: './.config/.env' });
const connectDB = require('./.config/db');
const express = require('express');
const cors = require('cors');
const routes = require('./Routes/api/books');

connectDB();
const PORT = process.env.PORT;

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/books", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
