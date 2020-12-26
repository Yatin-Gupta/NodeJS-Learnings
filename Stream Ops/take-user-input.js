// To take user input, we need to use process.stdin. Stream operation can be bit complex,
// so there is package readline, that can be use to simplify it.
const readline = require('readline');

const readlineInterface = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

module.exports.input = (inputMsg, actionOnInputCb) => {
    readlineInterface.question(inputMsg, (response) => {
        actionOnInputCb(response);
        readlineInterface.close();
    })
}