// #region imports
    // #region libraries
    import Docker from 'dockerode';
    // #endregion libraries
// #endregion imports



// #region module
const docker = new Docker();


export const findDockerImagene = async (
    name: string,
) => {
    const images = await docker.listImages();

    for (const image of images) {
        if (!image.RepoTags) {
            continue;
        }

        for (const repoTag of image.RepoTags) {
            if (repoTag.startsWith(name)) {
                return image;
            }
        }
    }

    return;
}
// #endregion module



// #region exports
export default docker;
// #endregion exports
