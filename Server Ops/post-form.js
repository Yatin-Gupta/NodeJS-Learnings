const http = require('http');
const fs = require('fs');

const server = http.createServer((req,  res) => {
    const url = req.url;
    let method = req.method;

    if (['/', '/home'].includes(url)) {
        res.write("<html>");
        res.write("<body>");
        res.write("<form action='/message' method='POST'>");
        res.write("<input type='text' name='message' />");
        res.write("<input type='submit' value='Submit' />");
        res.write("</form>");
        res.write("</body>");
        res.write("</html>");
        return res.end();
    }
    else if (url === "/message" && method === "POST") {
        // req and res are io streams and they can be used as we use read/write streams
        // To take post take, first we collect all data in chunks
        const chunksData = [];
        req.on('data', (chunk) => {
            chunksData.push(chunk);
        });

        // When all chunks are transferred, then 'end' event trigger on request stream
        req.on('end', () => {
            // Now we need to concat these chunks and for that we will use buffer. 
            // Buffer can be directly converted to string using toString method.
            // In case of file data, we cannot directly apply toString method
            const concatChunks = Buffer.concat(chunksData);
            const stringData = concatChunks.toString();
            const message = stringData.split("=")[1];
            fs.writeFileSync('post-form-data', decodeURIComponent(message));
        });

        // For Redirection to home page, once action on POST informed
        res.writeHead(302, {
            'Location':'/'
        });
        res.end();
    }
});

server.listen(8080);