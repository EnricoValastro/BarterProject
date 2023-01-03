const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./src/routes/userRoutes')
const PORT = process.env.PORT;

const app = express();

mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log('Connected to database');
}).catch(err => {
    console.log(err.message);
});

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
routes(app);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





