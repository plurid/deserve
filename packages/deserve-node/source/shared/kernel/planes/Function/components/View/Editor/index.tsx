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
        StyledEditor,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface EditorOwnProperties {
    value: string;
    atChange: (value: string) => void;
}

export interface EditorStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
}

export interface EditorDispatchProperties {
}

export type EditorProperties = EditorOwnProperties
    & EditorStateProperties
    & EditorDispatchProperties;

const Editor: React.FC<EditorProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region own
        value,
        atChange,
        // #endregion own

        // #region state
        stateGeneralTheme,
        // stateInteractionTheme,
        // #endregion state

        // #region dispatch
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region references
    const editorRef = useRef<any | null>(null);
    // #endregion references


    // #region state
    const [
        editor,
        setEditor,
    ] = useState((<></>));
    // #endregion state

    // #region effects
    useEffect(() => {
        const load = async () => {
            if (typeof window === 'undefined') {
                return;
            }

            const Editor = (await import('react-ace')).default;

            const ace = (await import('ace-builds'));
            await import('ace-builds/src-noconflict/mode-text');
            await import('ace-builds/src-noconflict/theme-github');
            ace.config.set('basePath', '');

            const editor = (
                <Editor
                    ref={editorRef}
                    mode="text"
                    theme="github"
                    name={'code-123'}
                    editorProps={{
                        // $blockScrolling: true,
                    }}
                    setOptions={{
                        copyWithEmptySelection: true,
                        displayIndentGuides: false,
                        printMargin: false,
                    }}
                    tabSize={4}
                    fontSize={18}
                    showGutter={true}
                    width="100%"
                    height="400px"
                    placeholder={''}

                    value={value}
                    onChange={atChange}

                    className="code-editor"
                />
            );
            setEditor(editor);
        }

        load();
    }, []);
    // #endregion effects


    // #region render
    return (
        <StyledEditor
            theme={stateGeneralTheme}
        >
            {editor}
        </StyledEditor>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): EditorStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): EditorDispatchProperties => ({
});


const ConnectedEditor = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(Editor);
// #endregion module



// #region exports
export default ConnectedEditor;
// #endregion exports
