const {
    promises: fs,
} = require('fs');

const database = require('../services/database').database;



const readFunctionData = async () => {
    try {
        const data = await database.getFunctionData();

        return JSON.parse(data);
    } catch (error) {
        return;
    }
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

    await writeFunction('function.js', text);

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

    const templateRaw = await fs.readFile(`../index.template.js`, 'utf-8');
    const templateText = templateRaw
        .replace('$FUNCTION_NAME', name);

    await fs.writeFile(`../index.js`, templateText);
}



const main = () => {
    const functionData = await readFunctionData();

    await writeFunctions(functionData);

    await editTemplate();
}

main();
