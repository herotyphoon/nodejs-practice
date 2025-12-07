const express = require('express');
// const http = require('http');

const app = express();

app.get('/', (req, res) => {
    return res.send('Home page');
});

app.get('/about', (req, res) => {
    return res.send('Hello ' + req.query.name);
});

app.listen(3000, () => console.log('Listening on port http://localhost:3000!'));
// const myServer = http.createServer(app);
//
// myServer.listen(3000, () => {console.log('Listening on port http://localhost:3000!')});