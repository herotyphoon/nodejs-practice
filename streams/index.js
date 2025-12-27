const fs = require('fs');
const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const stream = fs.createReadStream('file.txt', 'utf8');
    stream.on('data', (chunk) => {
        res.write(chunk);
    });
    stream.on('end', () => {
        res.end();
    })
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})