const fs = require('fs');

const filePath = "./stream-read.txt";
const readStream = fs.createReadStream(filePath, 'utf8');

readStream.on('data', function(chunk) {
    console.log('CHUNK RECEIVED:');
    console.log(chunk);
});