// #region imports
    // #region libraries
    import { AnyAction } from 'redux';
    import { ThunkDispatch } from 'redux-thunk';

    import {
        graphql,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import client from '~kernel-services/graphql/client';
    import {
        GET_CURRENT_OWNER,
    } from '~kernel-services/graphql/query';

    import actions from '~kernel-services/state/actions';
    // #endregion external
// #endregion imports



// #region module
/**
 * Get current owner and return true if set.
 *
 * @param setViewOwner
 */
const getCurrentOwner = async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
    const dispatchSetViewOwner: typeof actions.view.setViewOwner = (
        owner,
    ) => dispatch(
        actions.view.setViewOwner(owner),
    );

    const dispatchSetCores: typeof actions.data.setCores = (
        cores,
    ) => dispatch(
        actions.data.setCores(cores),
    );


    const query = await client.query({
        query: GET_CURRENT_OWNER,
        fetchPolicy: 'no-cache',
    });

    const response = query.data.getCurrentOwner;

    if (response.status) {
        const owner = graphql.deleteTypenames(
            response.data,
        );

        dispatchSetViewOwner({
            id: owner.id,
            identonym: owner.identonym,
            cores: [],
        });

        dispatchSetCores(
            owner.cores,
        );

        return true;
    }

    return;
}
// #endregion module



// #region exports
export {
    getCurrentOwner,
};
// #endregion exports
