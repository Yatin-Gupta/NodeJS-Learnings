const fs = require('fs');

const fileContent = fs.readFileSync("./file-read.txt");
fs.writeFileSync('./file-write-sync.txt', fileContent);