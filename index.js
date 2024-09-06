const { getICS } = require('./utils');

const express = require('express');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    console.log(`[${new Date().toUTCString()}] [SERVER] Receveived ICS request`);
    try {
        const ics = await getICS();
        res.status(200).send(ics);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});