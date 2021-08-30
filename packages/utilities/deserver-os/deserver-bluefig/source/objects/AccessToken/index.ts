// #region module
class AccessToken {
    private tokens: string[] = [];


    constructor() {
        this.cleanup();
    }


    private cleanup() {
        const WEEKLY = 1_000 * 60 * 60 * 24 * 7;

        setInterval(
            () => {
                this.tokens = [];
            },
            WEEKLY,
        );
    }


    public generate = () => {
        const token = Math.random() + '';
        this.tokens.push(token);

        return token;
    }

    public verify = (
        token: string,
    ) => {
        const verified = this.tokens.includes(token);

        return verified;
    }
}
// #endregion module



// #region exports
export default AccessToken;
// #endregion exports
