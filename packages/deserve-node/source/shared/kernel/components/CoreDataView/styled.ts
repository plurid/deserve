// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #region libraries
// #region imports



// #region module
export interface IStyledCoreDataView {
    theme: Theme;
}

export const StyledCoreDataView = styled.div<IStyledCoreDataView>`
`;


export const StyledName = styled.div`
    padding: 1rem;
    font-size: 1.2rem;
`;


export const StyledDataSelect = styled.div`
    display: flex;
    padding: 1rem;
`;


export interface IStyledDataSelectItem {
    theme: Theme;
    active: boolean;
}

export const StyledDataSelectItem = styled.div<IStyledDataSelectItem>`
    margin: 1rem;
    cursor: pointer;
    user-select: none;

    background-color: ${
        ({
            theme,
            active,
        }: IStyledDataSelectItem) => {
            if (active) {
                return theme.backgroundColorSecondary;
            }

            return 'initial';
        }
    };
`;


export const StyledData = styled.div`
`;
// #region module
