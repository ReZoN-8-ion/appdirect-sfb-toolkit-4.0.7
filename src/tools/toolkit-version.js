const fs = require("fs")

const { TOOLKIT_PATH } = require("./toolkit-common-vars");

fs.readFile(`${TOOLKIT_PATH}/package.json`, (err, data) => {
    if (err) return console.log(' ERROR: Unable to read the file.');
    const packageJSON = JSON.parse(data);
    return console.log(packageJSON.version);
})
