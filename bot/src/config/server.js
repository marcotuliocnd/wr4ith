const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.send(`Running on port ${process.env.PORT}`);
});

module.exports = app;
