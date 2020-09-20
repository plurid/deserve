// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
    } from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import {
        ClientCore,
    } from '#server/data/interfaces';

    import {
        addEntityMutation,
    } from '#kernel-services/logic/mutations';

    import {
        REGISTER_CORE,
    } from '#kernel-services/graphql/mutate';

    import {
        StyledPluridTextline,
        StyledPluridPureButton,
        StyledPluridLinkButton,
    } from '#kernel-services/styled';
    // #endregion external


    // #region internal
    import {
        StyledProject,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface ProjectProperties {
    // #region required
        // #region values
        theme: Theme;
        // #endregion values

        // #region methods
        action: (
            core: ClientCore,
        ) => void;
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        // #endregion values

        // #region methods
        cancel?: () => void;
        // #endregion methods
    // #endregion optional
}

const Project: React.FC<ProjectProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            theme,
            // #endregion values

            // #region methods
            action,
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            // #endregion values

            // #region methods
            cancel,
            // #endregion methods
        // #endregion optional
    } = properties;
    // #endregion properties


    // #region state
    const [
        register,
        setRegister,
    ] = useState('');
    const [
        identonym,
        setIdentonym,
    ] = useState('');
    const [
        key,
        setKey,
    ] = useState('');
    const [
        validCore,
        setValidCore,
    ] = useState(false);
    // #endregion state


    // #region handlers
    const registerCore = async () => {
        if (!validCore) {
            return;
        }

        const core: ClientCore | undefined = await addEntityMutation(
            {
                register,
                identonym,
                key,
            },
            REGISTER_CORE,
            'registerCore',
        );

        if (core) {
            action(core);
        }
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        if (
            register
            && identonym
            && key
        ) {
            setValidCore(true);
        } else {
            setValidCore(false);
        }
    }, [
        register,
        identonym,
        key,
    ]);
    // #endregion effects


    // #region render
    return (
        <StyledProject
            theme={theme}
        >
            <div>
                <h1>
                    register core
                </h1>

                <div>
                    <StyledPluridTextline
                        text={register}
                        placeholder="register"
                        atChange={(event) => setRegister(event.target.value)}
                        atKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                registerCore();
                            }
                        }}
                        spellCheck={false}
                        autoCapitalize="false"
                        autoComplete="false"
                        autoCorrect="false"
                        theme={theme}
                        level={2}
                    />
                </div>

                <div>
                    <StyledPluridTextline
                        text={identonym}
                        placeholder="identonym"
                        atChange={(event) => setIdentonym(event.target.value)}
                        atKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                registerCore();
                            }
                        }}
                        spellCheck={false}
                        autoCapitalize="false"
                        autoComplete="false"
                        autoCorrect="false"
                        theme={theme}
                        level={2}
                    />
                </div>

                <div>
                    <StyledPluridTextline
                        text={key}
                        type="password"
                        placeholder="key"
                        atChange={(event) => setKey(event.target.value)}
                        atKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                registerCore();
                            }
                        }}
                        spellCheck={false}
                        autoCapitalize="false"
                        autoComplete="false"
                        autoCorrect="false"
                        theme={theme}
                        level={2}
                    />
                </div>

                <div>
                    <StyledPluridPureButton
                        text="Register Core"
                        atClick={() => registerCore()}
                        level={2}
                        disabled={!validCore}
                    />
                </div>

                {cancel && (
                    <div>
                        <StyledPluridLinkButton
                            text="cancel"
                            atClick={() => cancel()}
                            theme={theme}
                            level={2}
                        />
                    </div>
                )}
            </div>
        </StyledProject>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Project;
// #endregion exports
