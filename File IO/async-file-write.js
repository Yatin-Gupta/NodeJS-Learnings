const fs = require('fs');

// Here we readFile such that we get data in buffer bytes
// But to get text data use fs.readFile('path', 'utf-8', callback)
fs.readFile('./file-read.txt', (err, data) => {
    if (err) {
        throw new Error(err);
    }
    console.log('Read Content: ');
    console.log(data);
    fs.writeFile('./file-write-async.txt', data, (err) => {
        if (err) {
            throw new Error(err);
        }
        console.log('File Content written success');
    })
});