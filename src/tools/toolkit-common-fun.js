const fs = require("fs-extra");
const moment = require("moment");
const prompt = require("./prompt-questions");
const packageJson = require('package-json');
const { spawnSync } = require("child_process");
const chalk = require("chalk")

const { CURRENT_PATH, TOOLKIT_PATH, BOOTSTRAP_FOLDERS, BOOTSTRAP_FILES, CONFIG_PATH, THEME_COMPONENT_MODULE, 
    THEME_COMPONENT_VERSION, ACTIVE_THEME_PATH, THEME_LOGS_PATH, THEME_LOGS_FILE_PATH, SASS_MODULE,
    SASS_VERSION, SASS_LOADER_MODULE, SASS_LOADER_VERSION } = require("./toolkit-common-vars");
const { has } = require("lodash");

// function to remove project's folders (used to revert changes on error)
const selfDestruction = (dir) => BOOTSTRAP_FOLDERS.forEach( file => fs.removeSync(`${dir}/${file}`));

// count items in dir, exclude hidden files
const filesCounter = (dir) => fs.readdirSync(dir).filter(item => !(/(^|\/)\.[^\/\.]/g).test(item)).length;

// check if folder contains all of bootstrapFolders
const isProjectsFolder = (dir) => fs.readdirSync(dir).filter( item => BOOTSTRAP_FILES.includes(item)).length === BOOTSTRAP_FILES.length;

// simple check if current folder is Project's folder, and give specific message
const shouldBeProjectFolder = (should) => {
    const isProjectFolder = isProjectsFolder(CURRENT_PATH);
    switch(true){
        case !should && isProjectFolder:
            console.error(chalk.red(` ERROR: Unable to perform requested action. Please navigate away from the project folder.`));
            process.exit(1);
        break;
        case should && !isProjectFolder:
            console.error(chalk.red(` ERROR: Unable to perform requested action. Please navigate to a project folder.`));
            process.exit(1);
        break;
    }
}

// simple check if current folder is Project's folder, and give specific message
const licenseAgreement = () => {
    return new Promise(
        async (resolve, reject) => {
            const userAnswer = await prompt.ask(["LicenseAgreement"]);
            if (userAnswer.LicenseAgreement !== "agree") {
                return reject()
            }
            return resolve();
        }
    );
}

// verify local version with npm.js version
const versionCheck = () => {
    return new Promise(
        async resolve => {
            const rawdata = fs.readFileSync(`${TOOLKIT_PATH}/package.json`);  
            const currentPackageJSON = JSON.parse(rawdata); 
            let watch = setTimeout(() => resolve(), 3000); // timeout for the function execution - 3 seconds
            try {
                const npmPackageJSON = await packageJson('@appdirect/sfb-toolkit');
                if(currentPackageJSON.version !== npmPackageJSON.version){
                    console.log(`\n Newer version of sfb-toolkit is available: \n\n  Your version: ${currentPackageJSON.version.red} \n  Latest version: ${npmPackageJSON.version} \n\n Run \`npm install -g @appdirect/sfb-toolkit\` to install the latest version\n`);
                }
            } catch (e) {}
            resolve(clearTimeout(watch));
        }
    )
}

// looks if folder is available to use or create and use
const getAvailableFolderWithPrompt = async (path, name, askFor, createIfNotExists = true, canBeEmpty = true) => {
    return new Promise(
        resolve => {
            fs.stat(`${path}/${name}`, async (err, stats) => {
                if (err && err.code === 'ENOENT') {
                    if (createIfNotExists) {
                        fs.mkdirSync(`${path}/${name}`);
                        console.log(chalk.green(` Folder ${path}/${name} created.`));
                    }
                    return resolve(`${path}/${name}`);
                } 
                if (canBeEmpty && filesCounter(`${path}/${name}`) === 0) {
                    // check if empty
                    return resolve(`${path}/${name}`);
                }
                console.error(chalk.red(` ERROR: Unable to use a path ${path}/${name}. Folder already exists and is not empty. Try different name or try removing existing folder.`));
                const userAnswer = await prompt.ask([askFor]);
                return resolve(getAvailableFolderWithPrompt(path, userAnswer[askFor], askFor, createIfNotExists, canBeEmpty));
            });
        }
    );
}

// gets config/index.js file
const getThemeConfig = (_dir = CURRENT_PATH) => {
    try { 
        return require(`${_dir}/${CONFIG_PATH}`)
    } catch (err) {
        return {};
    }
};

// create theme-logs folder if it does not exist
const createThemeLogsFolder = () => {
    if(!fs.existsSync(THEME_LOGS_PATH)){
        fs.mkdirSync(THEME_LOGS_PATH);
    }
}

const installSfbThemeComponents = () => {

    createThemeLogsFolder();

    // check if sfb-theme-components is installed otherwise install it
    spawnSync('npm',
    [`ls ${THEME_COMPONENT_MODULE} 2>&1 | (findstr ${THEME_COMPONENT_MODULE} || grep ${THEME_COMPONENT_MODULE}) > ${THEME_LOGS_FILE_PATH} 2>&1 || npm i -S ${THEME_COMPONENT_MODULE}@${THEME_COMPONENT_VERSION} --omit=dev --legacy-peer-deps`], {
        cwd: ACTIVE_THEME_PATH,
        stdio: "inherit",
        shell: true
    })
}

const createPackageJson = () => {
    // check if package.json exists otherwise create it
    if(!fs.existsSync(`${ACTIVE_THEME_PATH}/package.json`)) {
        spawnSync('npm',
        [`init -y`], {
            cwd: ACTIVE_THEME_PATH,
            stdio: "inherit",
            shell: true
        })
    }
}

const createCustomThemePacakgeJson = (themeName, themePackageName, createdBy) => {
    const toolkitPackageJson = JSON.parse(fs.readFileSync(`${TOOLKIT_PATH}/package.json`));
    const version = toolkitPackageJson.dependencies[`${themePackageName}`];
    const customThemePackageJson = {
        "name": themeName.toLocaleLowerCase(),
        "version": version,
        "description": "",
        "metadata": {
            "toolkitVersion": toolkitPackageJson.version,
            "themeTemplate": themePackageName,
            "themeVersion": version,
            "createdBy": createdBy,
            "createdAt": new Date()
        },
        "scripts": {},
        "keywords": [],
        "author": "",
        "license": "ISC",
        "dependencies": {}
    }
    return JSON.stringify(customThemePackageJson, null, 2);
}

const updateCustomComponentsMetadata = (data) => {
    const hasPackageJson = fs.existsSync(`${ACTIVE_THEME_PATH}/package.json`);
    if (hasPackageJson) {
        const themePackageJson = JSON.parse(fs.readFileSync(`${ACTIVE_THEME_PATH}/package.json`));
        const sfbThemeComponentsVersion = themePackageJson.dependencies['@appdirect/sfb-theme-components'];
        const customComponentsPath = `${ACTIVE_THEME_PATH}/customComponents`;
        const customComponents = fs.existsSync(customComponentsPath);
        if (customComponents && sfbThemeComponentsVersion) {
            data = data.replace('data-custom-components="false"', 'data-custom-components="true"');
        }
        if (!customComponents) {
            data = data.replace('data-custom-components="true"', 'data-custom-components="false"');
        }
        if(sfbThemeComponentsVersion) {
            data = data.replace(/data-sfb-theme-components-version=".*"/, `data-sfb-theme-components-version="${sfbThemeComponentsVersion}"`);
        }
    }
    return data;
}

const addMetadata = (metadata = {}, themePath) => {
    const sfbConfigPath = themePath || CURRENT_PATH;
    const currentTheme = JSON.parse(fs.readFileSync(`${sfbConfigPath}/.sfbconfig`)).current;
    const baseFilePath = `${sfbConfigPath}/themes/${currentTheme}/content/layout/base.html`;
    const baseFileData = fs.readFileSync(baseFilePath, 'utf8');
    const hasMetadata = baseFileData.includes('ad-theme');
    if (hasMetadata) {
        const updatedMetadata = updateCustomComponentsMetadata(baseFileData);
        fs.writeFileSync(baseFilePath, updatedMetadata);
        return;
    }
    const headElemIndex = baseFileData.indexOf('</head>');
    const providedMetadata = Object.keys(metadata).length;
    
    let themeTemplate;
    let themeVersion;
    let createdBy;
    let createdAt;
    let customComponents;
    let sfbThemeComponentsVersion;

    if (providedMetadata) {
        themeTemplate = metadata.themeTemplate;
        themeVersion = metadata.themeVersion;
        createdBy = metadata.createdBy;
        createdAt = metadata.createdAt;
        customComponents = metadata.customComponents;
        sfbThemeComponentsVersion = metadata.sfbThemeComponentsVersion;
    } else {
        const hasPackageJson = fs.existsSync(`${ACTIVE_THEME_PATH}/package.json`);
        const themePackageJson = hasPackageJson && JSON.parse(fs.readFileSync(`${ACTIVE_THEME_PATH}/package.json`));
        const hasPackageMetadata = themePackageJson && themePackageJson.metadata && Object.keys(themePackageJson.metadata).length;
        const hasPackageDependencies = themePackageJson && themePackageJson.dependencies && Object.keys(themePackageJson.dependencies).length;
        const customComponentsPath = `${ACTIVE_THEME_PATH}/customComponents`;
        customComponents = fs.existsSync(customComponentsPath);

        sfbThemeComponentsVersion = customComponents && hasPackageDependencies
            ? themePackageJson.dependencies['@appdirect/sfb-theme-components']
            : 'latest'

        if (hasPackageMetadata) {
            themeTemplate = themePackageJson.metadata.themeTemplate;
            themeVersion = themePackageJson.metadata.themeVersion;
            createdBy = themePackageJson.metadata.createdBy;
            createdAt = new Date(themePackageJson.metadata.createdAt).toString();
        } else {
            const hasSettingsSchema = fs.existsSync(`${ACTIVE_THEME_PATH}/settings-schema.json`);
            const isClassicTheme = baseFileData.includes('cloudflare') || !hasSettingsSchema;
            themeTemplate = isClassicTheme
                ? '@appdirect/sfb-theme-classic'
                : '@appdirect/sfb-theme-plaza'
        }
    }

    const output = baseFileData.substring(0, headElemIndex) 
    + `  <ad-theme`
    + (themeTemplate ? `\n    data-theme-template="${themeTemplate}"` : '')
    + (themeVersion ? `\n    data-theme-version="${themeVersion}"` : '')
    + (createdBy ? `\n    data-created-by="${createdBy}"` :'')
    + (createdAt ? `\n    data-created-at="${createdAt}"` : '')
    + `\n    data-custom-components="${customComponents}"`
    + `\n    data-sfb-theme-components-version="${sfbThemeComponentsVersion}">`
    + `\n  </ad-theme>\n`
    + baseFileData.substring(headElemIndex);

    fs.writeFileSync(baseFilePath, output);
}

const installSass = () => {
    // install sass and sass-loader
    spawnSync('npm',
    [`i -S ${SASS_MODULE}@${SASS_VERSION} ${SASS_LOADER_MODULE}@${SASS_LOADER_VERSION} --omit=dev --legacy-peer-deps`], {
        cwd: ACTIVE_THEME_PATH,
        stdio: "inherit",
        shell: true
    })
}

module.exports = {
    selfDestruction,
    filesCounter,
    shouldBeProjectFolder,
    getAvailableFolderWithPrompt,
    getThemeConfig,
    licenseAgreement,
    versionCheck,
    installSfbThemeComponents,
    createPackageJson,
    createThemeLogsFolder,
    createCustomThemePacakgeJson,
    updateCustomComponentsMetadata,
    addMetadata,
    installSass
}
