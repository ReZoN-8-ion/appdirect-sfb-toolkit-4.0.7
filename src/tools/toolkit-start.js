const NODEMON_PATH = "node_modules/nodemon/bin/nodemon.js"
const { spawn } = require("child_process")
const { TOOLKIT_PATH, COMPILERCSS_PATH } = require("./toolkit-common-vars")
const { shouldBeProjectFolder, versionCheck } = require("./toolkit-common-fun")
const currentPath = process.cwd() // used to get current dev folder
const config = require(`${currentPath}/config`)

const shouldIgnoreMessage = (data) => {
    if (process.env.verboseToolkitOutput) {
        return false;
    }
    
    const dataStr = `${data}`;
    return [
        'Browserslist: caniuse-lite is outdated.',
        '[BABEL] Note: The code generator has deoptimised',
        'localization file sfb-toolkit-assets not found'
    ].some(
        (token) => dataStr.startsWith(token)
    );
};

shouldBeProjectFolder(true);

(async () => {
    await versionCheck();

    const toolkitStartProcess = spawn('node',
        [`"${TOOLKIT_PATH}/${NODEMON_PATH}" "${TOOLKIT_PATH}/index.js" --watch themes/${config.theme}/ --ignore themes/${config.theme}/assets/js/`], {
            shell: true
        }
    );

    toolkitStartProcess.stdout.on('data', (data) => {
        if (!shouldIgnoreMessage(data)) {
            console.log(`${data}`);
        }
    });
    toolkitStartProcess.stderr.on('data', (data) => {
        if (!shouldIgnoreMessage(data)) {
            console.error(`${data}`);
        }
    });
    toolkitStartProcess.on('close', (code) => {
        console.log(`toolkit process exited with code ${code}`);
    });

    spawn('node', 
        [`"${TOOLKIT_PATH}/${COMPILERCSS_PATH}"  --ignore themes/${config.theme}/assets/js/*`], {
            stdio: "inherit",
            shell: true,
            env: {
                ...process.env,
                RUNDEVSERVER: "true"
            }
        }
    );
})();
