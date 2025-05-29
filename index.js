const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

// middle ware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('The Traveler Server Runing');
});

app.listen(port, (req, res) => {
    console.log(`the traveler server running on: ${port}`);
});
