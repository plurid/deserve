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
    padding: 1rem 1.5rem;
    font-size: 1.2rem;
`;


export const StyledDataSelect = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
`;


export interface IStyledDataSelectItem {
    theme: Theme;
    active: boolean;
}

export const StyledDataSelectItem = styled.div<IStyledDataSelectItem>`
    padding: 0.5rem 1.2rem;
    border-radius: 25px;
    cursor: pointer;
    user-select: none;

    background-color: ${
        ({
            theme,
            active,
        }: IStyledDataSelectItem) => {
            if (active) {
                return theme.backgroundColorTertiary;
            }

            return 'initial';
        }
    };
    box-shadow: ${
        ({
            theme,
            active,
        }: IStyledDataSelectItem) => {
            if (active) {
                return theme.boxShadowUmbra;
            }

            return 'initial';
        }
    };
`;


export const StyledData = styled.div`
    padding: 1rem;
`;
// #region module
