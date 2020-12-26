const fs = require('fs');
const input = require('./take-user-input').input;

function createDirectorySynchronously(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        return true;
    }
    return false;
}

function createFileSynchronously(filePath, initialContent = "") {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, initialContent);
        return true;
    }
    return false;
}

function removeFileSynchronously(filePath) {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
    }
    return false;
}

function removeDirectorySynchronously(dirPath) {
    if (fs.existsSync(dirPath)) {
        // Only empty directory can be deleted directly, otherwise first files inside it has to be deleted
        fs.readdirSync(dirPath).forEach((file) => {
            const contentPath = `${dirPath}/${file}`;
            if (fs.lstatSync(contentPath).isDirectory()) {
                removeDirectorySynchronously(contentPath);
            }
            else {
                removeFileSynchronously(contentPath);
            }
        });
        fs.rmdirSync(dirPath);
        return true;
    }
    return false;
}

const testDirPath = "./test-dir";
createDirectorySynchronously(testDirPath);
createFileSynchronously(`${testDirPath}/1.txt`, "First file");
createFileSynchronously(`${testDirPath}/2.txt`, "Second file");
createFileSynchronously(`${testDirPath}/3.txt`, "Third file");
createDirectorySynchronously(`${testDirPath}/newdir`);
createFileSynchronously(`${testDirPath}/newdir/1.txt`, "First file");
createFileSynchronously(`${testDirPath}/newdir/2.txt`, "Second file");
createFileSynchronously(`${testDirPath}/newdir/3.txt`, "Third file");
input('Press ENTER to continue: ', (res) => {
    removeFileSynchronously(`${testDirPath}/3.txt`);
    console.log('File 3 Removed');
    removeDirectorySynchronously(testDirPath);
    console.log('Directory removed');
});
