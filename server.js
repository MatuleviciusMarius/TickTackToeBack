const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDb');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
//Load config
dotenv.config({ path: './config/config.env' });

// Connect to Mongoose Database
connectDB();

//Routes
app.use('/api', require('./routes/api/logMoves'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
