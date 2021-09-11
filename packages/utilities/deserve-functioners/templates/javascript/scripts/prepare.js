const {
    promises: fs,
} = require('fs');

const {
    execSync,
} = require('child_process');

const database = require('@plurid/deserve-functioner-database').default;



const FUNCTION_FILE = 'function.js';
const FUNCTION_NAME = '$FUNCTION_NAME';
const TEMPLATE_FILE = '../index.template.js';
const INDEX_FILE = 'index.js';



const readFunctionData = async () => {
    return await database.getFunctionData();
}


const writeFunction = async (
    name,
    text,
) => {
    await fs.writeFile(`../${name}`, text);
}


const writeFunctions = async (
    functionData,
) => {
    const {
        text,
        addins,
    } = functionData;

    await writeFunction(FUNCTION_FILE, text);

    for (const addin of addins) {
        const {
            name,
            text,
        } = addin;

        await writeFunction(name, text);
    }
}


const editTemplate = async (
    functionData,
) => {
    const {
        name,
    } = functionData;

    const templateRaw = await fs.readFile(TEMPLATE_FILE, 'utf-8');
    const templateText = templateRaw.replace(FUNCTION_NAME, name);

    await writeFunction(
        INDEX_FILE,
        templateText,
    );
}


const writeExternals = async (
    functionData,
) => {
    if (!functionData.externals) {
        return;
    }

    const dependencies = [];

    for (const [name, version] of Object.entries(externals)) {
        const dependency = `${name}@${version}`;
        dependencies.push(dependency);
    }

    const externalInstall = 'yarn install ' + dependencies.join(' ');

    execSync(
        externalInstall,
        {
            cwd: '../',
        },
    );
}



const main = async () => {
    const functionData = await readFunctionData();
    if (!functionData) {
        return;
    }

    await writeFunctions(functionData);

    await editTemplate();

    await writeExternals(functionData);
}

main();