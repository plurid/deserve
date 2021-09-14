// #region imports
    // #region libraries
    import React, {
        useRef,
        useState,
        useEffect,
    } from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    // import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledView,
    } from './styled';

    import Editor from './Editor';
    // #endregion internal
// #endregion imports



// #region module
export interface ViewOwnProperties {
    // #region required
        // #region values
        view: string;
        text: string;
        language: string;
        // #endregion values

        // #region methods
        atChange: (value: any) => void;
        // #endregion methods
    // #endregion required
}

export interface ViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
}

export interface ViewDispatchProperties {
}

export type ViewProperties =
    & ViewOwnProperties
    & ViewStateProperties
    & ViewDispatchProperties;


const View: React.FC<ViewProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            view,
            text,
            language,
            // #endregion values

            // #region methods
            atChange,
            // #endregion methods
        // #endregion required

        // #region state
        stateGeneralTheme,
        // stateInteractionTheme,
        // #endregion state
    } = properties;
    // #endregion properties


    // #region references
    const mounted = useRef(false);
    // #endregion references


    // #region state
    const [
        refreshEditor,
        setRefreshEditor,
    ] = useState(true);
    // #endregion state


    // #region effects
    useEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
        }
    }, []);

    useEffect(() => {
        if (!mounted.current) {
            return;
        }

        setRefreshEditor(refresh => !refresh);

        setTimeout(() => {
            if (!mounted.current) {
                return;
            }

            setRefreshEditor(refresh => !refresh);
        }, 10);
    }, [
        view,
    ]);
    // #endregion effects


    // #region render
    return (
        <StyledView
            theme={stateGeneralTheme}
        >
            {refreshEditor && (
                <Editor
                    value={text}
                    language={language}

                    atChange={atChange}
                />
            )}
        </StyledView>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): ViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): ViewDispatchProperties => ({
});


const ConnectedView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(View);
// #endregion module



// #region exports
export default ConnectedView;
// #endregion exports
