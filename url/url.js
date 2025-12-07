const http = require('http');
const fs = require('fs');
const url = require('url');

const myServer = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return res.end();
    const log = `${Date.now()} : ${req.url} New request received\n`;
    const myUrl = new URL(req.url, `http://${req.headers.host}`);
    console.log(myUrl);
    fs.appendFile('log.txt', log, (err, data) => {
        switch (myUrl.pathname) {
            case '/': res.end("HomePage");
                break;
            case '/about':
                const name = myUrl.searchParams.get('name');
                res.end(`I am ${name}`);
                break;
            default:
                res.end("404 Not Found");
        }
    });
});

myServer.listen(3000, () => console.log("Listening on port http://localhost:3000/"));