const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const path = require("path")

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, "../frontend/build")))

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"))
})

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
