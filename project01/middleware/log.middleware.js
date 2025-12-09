const fs = require('fs');

function logReqRes(filename) {
    return (req, res, next) => {
        if (req.url === '/favicon.ico') {
            next();
        }
        fs.appendFile(filename, `${new Date(Date.now()).toLocaleString()} : ${req.method} : ${req.path}\n`, (err) => {
            if (err) res.status(500).end(JSON.stringify(err));
            next();
        });
    }
}

module.exports = {logReqRes};