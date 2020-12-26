const fs = require('fs');

async function writeDataToFile(fileToWritePath, fileToReadPath, charEncoding="utf8") {
    if (!fs.existsSync(fileToReadPath)) {
        throw new Error('File to read not exists');
    }
    if (fs.existsSync(fileToWritePath)) {
        fs.unlinkSync(fileToWritePath);
    }
    const readStream = fs.createReadStream(fileToReadPath, charEncoding);
    const writeStream = fs.createWriteStream(fileToWritePath);
    readStream.on('data', (chunk) => {
        writeStream.write(chunk);
    });
}

function writeDataToFileUsingPipe(fileToWritePath, fileToReadPath, charEncoding="utf8") {
    if (!fs.existsSync(fileToReadPath)) {
        throw new Error('File to read not exists');
    }
    if (fs.existsSync(fileToWritePath)) {
        fs.unlinkSync(fileToWritePath);
    }
    const readStream = fs.createReadStream(fileToReadPath, charEncoding);
    const writeStream = fs.createWriteStream(fileToWritePath);
    // Note pipe can only be applied to readstream and in parameter, we always pass writestream or duplex stream.
    readStream.pipe(writeStream);
}

writeDataToFileUsingPipe('./stream-write.txt', './stream-read.txt');