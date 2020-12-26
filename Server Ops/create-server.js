const http = require('http');

const server = http.createServer((request, response) => {
    console.log('Requested from: ', request.url);
    response.writeHead(200, {
        'Content-Type':'text/html'
    });
    // To write into multiple lines, you can use res.write as
    /**
     * res.write('<html>');
     * res.write('<body>');
     * res.write('Body Content');
     * res.write('</body>');
     * res.write('</html>');
     * // Finally
     * res.end();
     * if using res.end in if block then donot forget to write return res.end() as after end
     * no other logic should be executed.
     * We can also set status code as:
     * res.statusCode = 200
     * To do redirection following way header is set
     * res.writeHead(302, {
     *    'Location':'/redirect/to/location'
     * });
     * And then res.end()
     * To get request method we use req.method. It will be POST for POST request
     */
    response.end('<b>Yatin Gupta</b>');
});

server.listen(8080, '127.0.0.1');
console.log('Server is listening at port 8080');