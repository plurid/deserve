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
        REGISTER_OWNER,
    } from '~kernel-services/graphql/mutate';

    import {
        getCurrentOwner,
    } from '~kernel-services/logic/queries';

    import {
        StyledPluridTextline,
    } from '~kernel-services/styled';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledRegisterView,
        StyledRegisterButtons,
        StyledRegisterButton,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface RegisterViewOwnProperties {
}

export interface RegisterViewStateProperties {
}

export interface RegisterViewDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>;
    dispatchSetViewType: typeof actions.view.setViewType;
    dispatchViewOwner: typeof actions.view.setViewOwner;
}

export type RegisterViewProperties = RegisterViewOwnProperties
    & RegisterViewStateProperties
    & RegisterViewDispatchProperties;

const RegisterView: React.FC<RegisterViewProperties> = (
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
    const register = async () => {
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
                mutation: REGISTER_OWNER,
                variables: {
                    input,
                },
            });

            const response = mutation.data.registerOwner;

            if (!response.status) {
                setError('something is wrong. try again.');
                return;
            }

            getCurrentOwner(dispatch);

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
            register();
        }
    }
    // #endregion handlers


    // #region render
    return (
        <StyledRegisterView>
            <div>
                <img
                    src={deserveLogo}
                    alt="deserve logo"
                    height={250}
                />
            </div>

            <h1>
                deserve registration
            </h1>

            <StyledRegisterButtons>
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
            </StyledRegisterButtons>

            <StyledRegisterButton>
                <PluridPureButton
                    text="Register"
                    atClick={() => register()}
                    level={2}
                />
            </StyledRegisterButton>

            <PluridLinkButton
                text="login"
                atClick={() => {
                    dispatchSetViewType({
                        type: 'indexView',
                        value: 'login',
                    });
                }}
                level={1}
            />
        </StyledRegisterView>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): RegisterViewStateProperties => ({
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): RegisterViewDispatchProperties => ({
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


const ConnectedRegisterView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(RegisterView);
// #endregion module



// #region exports
export default ConnectedRegisterView;
// #endregion exports
