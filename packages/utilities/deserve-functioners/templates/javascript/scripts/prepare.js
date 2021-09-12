const path = require('path');
const fs = require('fs');
const {
    execSync,
} = require('child_process');

const database = require('@plurid/deserve-functioner-database').default;



const FUNCTION_FILE = 'function.js';
const FUNCTION_NAME = '$FUNCTION_NAME';
const TEMPLATE_FILE = 'index.template.js';
const INDEX_FILE = 'index.js';



const readFunctionData = async () => {
    return await database.getFunctionData();
}


const writeFunction = async (
    name,
    text,
) => {
    const filepath = path.join(
        __dirname,
        `../${name}`,
    );

    const dirname = path.dirname(filepath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, {
            recursive: true,
        });
    }

    await fs.promises.writeFile(filepath, text);
}


const writeFunctions = async (
    functionData,
) => {
    try {
        const {
            text,
            addins,
        } = functionData;

        await writeFunction(FUNCTION_FILE, text);

        if (addins) {
            for (const addin of Object.entries(JSON.parse(addins))) {
                const {
                    name,
                    text,
                } = addin;

                await writeFunction(name, text);
            }
        }
    } catch (error) {
        return;
    }
}


const editTemplate = async (
    functionData,
) => {
    const {
        name,
    } = functionData;

    const templateRaw = await fs.promises.readFile(TEMPLATE_FILE, 'utf-8');
    const templateText = templateRaw.replace(FUNCTION_NAME, name);

    await writeFunction(INDEX_FILE, templateText);
}


const writeExternals = async (
    functionData,
) => {
    try {
        const {
            externals,
        } = functionData;
        if (!externals) {
            return;
        }

        const dependencies = [];

        for (const [name, version] of Object.entries(JSON.parse(externals))) {
            const dependency = `${name}@${version}`;
            dependencies.push(dependency);
        }

        const externalInstall = 'yarn install ' + dependencies.join(' ');

        execSync(
            externalInstall,
            {
                cwd: './',
            },
        );
    } catch (error) {
        return;
    }
}



const main = async () => {
    const functionData = await readFunctionData();
    if (!functionData) {
        return;
    }

    await writeFunctions(functionData);

    await editTemplate(functionData);

    await writeExternals(functionData);
}

main();
