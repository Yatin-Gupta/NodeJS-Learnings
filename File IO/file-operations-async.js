const fs = require('fs');
const input = require('./take-user-input').input;

function handleError(err) {
    if (err) {
        throw new Error(err);
    }
}

async function createDirectory(dirPath) {
    // fs.access checks if directory exists
    fs.access(dirPath, (err) => {
        if (err) {
            // If directory not exists
            fs.mkdir(dirPath, (err) => {
                handleError(err);
                return true;
            })
        }
    });
    return false;
}

async function createFile(filePath, initialContent = "") {
    // fs.access checks if file exists
    fs.access(filePath, (err) => {
        if (err) {
            // If file not exists
            fs.writeFile(filePath, initialContent, (err) => {
                handleError(err);
                return true;
            })
        }
    });
    return false;
}

async function removeFile(filePath) {
    // fs.access checks if directory exists
    fs.access(filePath, (err) => {
        handleError(err);
        fs.unlink(filePath, (err) => {
            handleError(err);
            return true;
        })
    });
    return false;
}

// TODO: Not Able to remove directory recursively
async function removeDirectory(dirPath) {
    const promise = [];
    fs.access(dirPath, (err) => {
        handleError(err);
        fs.readdir(dirPath, (err, files) => {
            handleError(err);
            files.forEach((filePath) => {
                const contentPath = `${dirPath}/${filePath}`;
                fs.lstat(contentPath, async (err, stats) => {
                    handleError(err);
                    if (stats.isDirectory()) {
                        promise.push(removeDirectory(contentPath));
                    }
                    else {
                        promise.push(removeFile(contentPath));
                    }
                })
            });
            console.log(promise);
            Promise.all(promise).then(() => {
                fs.rmdir(dirPath, (err) => {
                    handleError(err);
                    console.log(`${dirPath} Removed`);
                });
            });
        });
    });
}

const testDirPath = "./test-dir";
createDirectory(testDirPath).then(() => {
    createFile(`${testDirPath}/1.txt`, "First file").then(() => {
        createFile(`${testDirPath}/2.txt`, "Second file").then(() => {
            createFile(`${testDirPath}/3.txt`, "Third file").then(() => {
                createDirectory(`${testDirPath}/newdir`).then(() => {
                    createFile(`${testDirPath}/newdir/1.txt`, "First file").then(() => {
                        createFile(`${testDirPath}/newdir/2.txt`, "Second file").then(() => {
                            createFile(`${testDirPath}/newdir/3.txt`, "Third file").then(() => {
                                input('Press ENTER to continue: ', (res) => {
                                    removeFile(`${testDirPath}/3.txt`).then(() => {
                                        console.log('File 3 Removed');
                                        removeDirectory(testDirPath).then(() => {
                                            console.log('Directory removed');
                                        })
                                    });
                                });
                            })
                        })
                    })
                })
            })
        });
    })
});
