const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log('Received request from ', req.url);
    // response will be our write stream. We don't need to end response, when we use pipe with it.
    // It will be automatically done
    if (req.url === "/" || req.url === "/home") {
        res.writeHead(200, {
            'Content-Type':'text/html'
        });
        const readStream = fs.createReadStream('./index.html');
        // Note pipe can only be applied to readstream and in parameter, we always pass writestream or duplex stream.
        readStream.pipe(res);
    }
    else if (req.url === "/api/users") {
        res.writeHead(200, {
            'Content-Type':'application/json'
        });

        res.end(JSON.stringify({
            users:[{name:'Raj'}]
        }));
    }
    else {
        res.writeHead(404, {
            'Content-Type':'text/html'
        });

        const readStream = fs.createReadStream('./404.html');
        readStream.pipe(res);
    }
});

server.listen(8080);