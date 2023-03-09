const express = require('express');
const route = require('./router');
const cors= require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use('/chat',route);
app.listen(port,() => {
    console.log(`Server is running port ${port}`);
});