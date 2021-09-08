// #region module
const notFoundPage = `
    <head>
        <meta name=”robots” content=”noindex,nofollow”>
        <meta name="description" content="own your data with deserve" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="deserve"/>
        <meta property="og:title" content="deserve"/>

        <title>deserve</title>
        <style>
            html, body {
                margin: 0;
                background: #242b33;
                color: #ddd;
                user-select: none;
                font-family: 'Ubuntu', -apple-system, system-ui, Roboto, sans-serif;
            }

            a {
                color: #aaa;
                text-decoration: none;
            }

            a:hover {
                color: #ddd;
                text-decoration: underline;
            }

            .deserve {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        </style>
    </head>
    <body>
        <div class="deserve">
            own your data with <a href="https://plurid.com/deserve">deserve</a>
        </div>
    </body>
`.replace(/\s+/g, ' ');
// #endregion module



// #region exports
export default notFoundPage;
// #endregion exports
