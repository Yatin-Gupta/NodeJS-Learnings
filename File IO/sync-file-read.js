const fs = require('fs');

// Read file synchronously
let readmeFileContent = fs.readFileSync("./README.md");
// Print content in bytes
console.log(readmeFileContent);
// To get textual content, you have to provide encoding
readmeFileContent = fs.readFileSync("./README.md", "utf-8");
console.log(readmeFileContent);
