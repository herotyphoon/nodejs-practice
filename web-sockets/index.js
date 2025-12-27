const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;

app.use(express.static('/public'));

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    socket.on('message', (message) => {
        io.emit('message', message);
    })
})

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});