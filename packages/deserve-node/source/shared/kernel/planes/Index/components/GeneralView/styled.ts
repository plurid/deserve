// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries
// #endregion imports



// #region module
export interface IStyledGeneralView {
    compactSelectors: boolean;
}

export const StyledGeneralView = styled.div<IStyledGeneralView>`
    display: grid;
    grid-template-columns: ${
        ({
            compactSelectors,
        }: IStyledGeneralView) => compactSelectors
            ? '60px 4fr'
            : '1fr 4fr'
    };
    min-height: 700px;
`;


export interface IStyledGeneralSelectors {
    theme: Theme;
    compactSelectors: boolean;
    viewUsageType: string;
}

export const StyledGeneralSelectors = styled.div<IStyledGeneralSelectors>`
    display: grid;
    justify-content: space-between;
    grid-template-columns: 1fr;
    grid-template-rows: ${
        ({
            viewUsageType,
        }: IStyledGeneralSelectors) => {
            if (viewUsageType) {
                return '100px auto 80px';
            }

            return '100px auto 40px';
        }
    };

    background-color: ${
        ({
            theme,
        }: IStyledGeneralSelectors) => theme.backgroundColorTertiary
    };
    box-shadow: inset -3px 0px 3px 0px ${
        ({
            theme,
        }: IStyledGeneralSelectors) => theme.boxShadowUmbraColor
    };

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        cursor: pointer;
        padding: 0.7rem 1.4rem;
        user-select: none;
    }
`;


export interface IStyledGeneralSelectorItem {
    theme: Theme;
    selected: boolean;
    compactSelectors: boolean;
}

export const StyledGeneralSelectorItem = styled.li<IStyledGeneralSelectorItem>`
    background-color: ${
        ({
            theme,
            selected,
        }: IStyledGeneralSelectorItem) => selected
            ? theme.backgroundColorPrimary
            : 'initial'
    };

    :hover {
        background-color: ${
            ({
                theme,
            }: IStyledGeneralSelectorItem) => theme.backgroundColorPrimary
        };
    }

    display: grid;
    grid-template-columns: ${
        ({
            compactSelectors,
        }: IStyledGeneralSelectorItem) => compactSelectors
            ? '16px'
            : '16px auto'
    };
    grid-gap: 0.7rem;
    height: 42px;
    align-items: center;
`;


export interface IStyledGeneralSelected {
}

export const StyledGeneralSelected = styled.div<IStyledGeneralSelected>`
    padding: 2rem;
`;


export interface IStyledGeneralPeformer {
    compactSelectors: boolean;
}

export const StyledGeneralPeformer = styled.div<IStyledGeneralPeformer>`
    display: grid;
    place-content: center;
    grid-gap: 0.5rem;
    height: 100%;
    font-size: 0.9rem;
    text-align: center;
    user-select: none;

    img {
        cursor: pointer;
    }
`;

export const StyledGeneralHelp = styled.div`
    li {
        font-size: 0.9rem;
    }
`;


export interface IStyledGeneralHelpItem {
    compactSelectors: boolean;
}

export const StyledGeneralHelpItem = styled.li<IStyledGeneralHelpItem>`
    display: grid;
    align-items: center;
    grid-gap: 0.5rem;
    grid-template-columns: ${
        ({
            compactSelectors,
        }: IStyledGeneralHelpItem) => compactSelectors
            ? '16px'
            : '16px auto 16px'
    };
`;
// #endregion module
