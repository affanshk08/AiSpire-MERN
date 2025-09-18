const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// This line is the most important part for fixing the 404 error
app.use('/api/auth', require('./routes/authRoutes'));

// Make sure other routes are correct too, if you have them
app.use('/api/careers', require('./routes/careerRoutes')); 

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));