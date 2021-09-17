const runner = async (
    prepare,
    run,
    postpare,
) => {
    const preparation = await prepare();
    const result = await run(preparation);
    await postpare(preparation, result);
}



module.exports.default = runner;
