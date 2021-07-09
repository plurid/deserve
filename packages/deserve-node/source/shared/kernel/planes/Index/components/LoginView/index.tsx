// #region imports
    // #region libraries
    import React, {
        useState,
    } from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';
    // #endregion libraries


    // #region external
    import deserveLogo from '../../assets/deserve-logo.png';

    import {
        PluridPureButton,
        PluridLinkButton,
    } from '~kernel-services/styled';

    import client from '~kernel-services/graphql/client';
    import {
        LOGIN,
    } from '~kernel-services/graphql/mutate';

    import {
        getCurrentOwner,
    } from '~kernel-services/logic/queries';

    import {
        StyledPluridTextline,
    } from '~kernel-services/styled';

    import { AppState } from '~kernel-services/state/store';
    import selectors from '~kernel-services/state/selectors';
    import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledLoginView,
        StyledLoginButtons,
        StyledLoginButton,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface LoginViewOwnProperties {
}

export interface LoginViewStateProperties {
}

export interface LoginViewDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>;
    dispatchSetViewType: typeof actions.view.setViewType;
    dispatchViewOwner: typeof actions.view.setViewOwner;
}

export type LoginViewProperties = LoginViewOwnProperties
    & LoginViewStateProperties
    & LoginViewDispatchProperties;

const LoginView: React.FC<LoginViewProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region dispatch
        dispatch,
        dispatchSetViewType,
        dispatchViewOwner,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region state
    const [
        identonym,
        setIdentonym
    ] = useState('');
    const [
        key,
        setKey
    ] = useState('');
    const [
        error,
        setError
    ] = useState('');
    // #endregion state


    // #region handlers
    const login = async () => {
        try {
            setError('');

            if (!identonym || !key) {
                setError('identonym and key required.');
                return;
            }

            const input = {
                identonym,
                key,
            };

            const mutation = await client.mutate({
                mutation: LOGIN,
                variables: {
                    input,
                },
            });

            const response = mutation.data.login;

            if (!response.status) {
                setError('something is wrong. try again.');
                return;
            }

            getCurrentOwner(dispatch)

            const owner = response.data;

            dispatchViewOwner(owner);
            dispatchSetViewType({
                type: 'indexView',
                value: 'general',
            });
        } catch (error) {
            return;
        }
    }

    const handleEnter = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            login();
        }
    }
    // #endregion handlers


    // #region render
    return (
        <StyledLoginView>
            <div>
                <img
                    src={deserveLogo}
                    alt="deserve logo"
                    height={250}
                />
            </div>

            <h1>
                deserve
            </h1>

            <StyledLoginButtons>
                <StyledPluridTextline
                    text={identonym}
                    placeholder="identonym"
                    atChange={(event) => setIdentonym(event.target.value)}
                    atKeyDown={(event) => handleEnter(event)}
                    level={2}
                />

                <StyledPluridTextline
                    text={key}
                    placeholder="key"
                    type="password"
                    atChange={(event) => setKey(event.target.value)}
                    atKeyDown={(event) => handleEnter(event)}
                    level={2}
                />

                <div
                    style={{
                        minHeight: '30px'
                    }}
                >
                    {error}
                </div>
            </StyledLoginButtons>

            <StyledLoginButton>
                <PluridPureButton
                    text="Login"
                    atClick={() => login()}
                    level={2}
                />
            </StyledLoginButton>

            <PluridLinkButton
                text="register"
                atClick={() => {
                    dispatchSetViewType({
                        type: 'indexView',
                        value: 'register',
                    });
                }}
                level={1}
            />
        </StyledLoginView>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): LoginViewStateProperties => ({
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): LoginViewDispatchProperties => ({
    dispatch,
    dispatchSetViewType: (
        payload,
    ) => dispatch(
        actions.view.setViewType(payload),
    ),
    dispatchViewOwner: (
        payload,
    ) => dispatch(
        actions.view.setViewOwner(payload),
    ),
});


const ConnectedLoginView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(LoginView);
// #endregion module



// #region exports
export default ConnectedLoginView;
// #endregion exports
