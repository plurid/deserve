// #region imports
    // #region libraries
    import React from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';

    import {
        Theme,
    } from '@plurid/plurid-themes';

    import {
        PluridPlaneComponentProperty,
    } from '@plurid/plurid-react';
    // #endregion libraries


    // #region external
    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    // import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledBlob,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface BlobOwnProperties {
    plurid: PluridPlaneComponentProperty;
}

export interface BlobStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateBlobs: Record<string, any[] | undefined>;
}

export interface BlobDispatchProperties {
}

export type BlobProperties =
    & BlobOwnProperties
    & BlobStateProperties
    & BlobDispatchProperties;


const Blob: React.FC<BlobProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region own
        plurid,
        // #endregion own

        // #region state
        stateGeneralTheme,
        // stateInteractionTheme,
        stateBlobs,
        // #endregion state
    } = properties;

    const coreID = plurid.plane.parameters.core;
    const blobID = plurid.plane.parameters.id;
    const coreBlobs = stateBlobs[coreID];
    if (!coreBlobs) {
        return (<></>);
    }

    const blob = coreBlobs.find(blob => blob.id === blobID);
    if (!blob) {
        return (<></>);
    }

    const {
        mimetype,
        size,
        metadata,
    } = blob;
    // #endregion properties


    // #region render
    return (
        <StyledBlob
            theme={stateGeneralTheme}
        >
            <div>
                {coreID} · {blobID}
            </div>

            <div>
                {mimetype} · {size}
            </div>

            <pre>
                {metadata}
            </pre>
        </StyledBlob>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): BlobStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateBlobs: selectors.data.getBlobs(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): BlobDispatchProperties => ({
});


const ConnectedBlob = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(Blob);
// #endregion module



// #region exports
export default ConnectedBlob;
// #endregion exports
