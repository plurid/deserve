// #region imports
    // #region libraries
    import {
        createGlobalStyle,
    } from 'styled-components';
    // #endregion libraries


    // #region external
    import {
        APPLICATION_ROOT,
    } from '~shared/data/constants';
    // #endregion external
// #endregion imports



// #region module
export const GlobalStyle = createGlobalStyle`
    *, *::after, *::before {
        box-sizing: border-box;
    }

    html {
        height: 100%;
    }

    body {
        height: 100%;
        overflow: hidden;
        margin: 0;
        padding: 0;
        font-family: 'Ubuntu', 'Work Sans', -apple-system, BlinkMacSystemFont, 'Roboto',
            'Droid Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: white;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    #${APPLICATION_ROOT} {
        height: 100%;
        overflow: auto;
    }
`;
// #endregion module
