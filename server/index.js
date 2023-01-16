const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./src/routes/Routes');

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.static(__dirname + '/static'));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

routes(app);

mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log('Connected to database');
}).catch(err => {
    console.log(err.message);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





