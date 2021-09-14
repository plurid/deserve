// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries
// #endregion imports



// #region module
export interface IStyledEditor {
    theme: Theme;
}

export const StyledEditor = styled.div<IStyledEditor>`
    font-family: 'Ubuntu', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        'Open Sans', 'Helvetica Neue', sans-serif;

    .code-editor {
        color: ${
            ({
                theme,
            }: IStyledEditor) => theme.colorPrimary
        };
        background-color: ${
            ({
                theme,
            }: IStyledEditor) => theme.backgroundColorTertiary
        };
        font-family: 'Source Code Pro', monospace;
        line-height: 2;
    }

    .code-editor .ace_scroller {
        box-shadow: inset 0px 4px 4px ${
            ({
                theme,
            }: IStyledEditor) => theme.boxShadowUmbraColor
        };
    }

    .code-editor .ace_gutter {
        color: ${
            ({
                theme,
            }: IStyledEditor) => theme.colorPrimary
        };
        background-color: ${
            ({
                theme,
            }: IStyledEditor) => theme.backgroundColorQuaternary
        };
    }

    .code-editor .ace_gutter-active-line {
        color: ${
            ({
                theme,
            }: IStyledEditor) => theme.colorPrimary
        };
        background-color: ${
            ({
                theme,
            }: IStyledEditor) => theme.backgroundColorPrimary
        };
    }

    .code-editor .ace_active-line {
        color: ${
            ({
                theme,
            }: IStyledEditor) => theme.colorSecondary
        };
        background-color: ${
            ({
                theme,
            }: IStyledEditor) => theme.backgroundColorSecondary
        } !important;
    }

    .code-editor .ace_selected-word {
        border: 1px solid ${
            ({
                theme,
            }: IStyledEditor) => theme.colorTertiary
        };
        background-color: ${
            ({
                theme,
            }: IStyledEditor) => theme.backgroundColorQuaternary
        } !important;
    }

    .code-editor .ace_cursor {
        color: ${
            ({
                theme,
            }: IStyledEditor) => theme.colorPrimary
        };
    }

    .code-editor .ace_selection {
        color: ${
            ({
                theme,
            }: IStyledEditor) => theme.colorSecondary
        };
        background-color: ${
            ({
                theme,
            }: IStyledEditor) => theme.backgroundColorPrimary
        };
    }

    .code-editor .ace_gutter-cell.ace_info {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABIGlDQ1BBcHBsZSBSR0IAACjPY2Bg0nB0cXJlEmBgyM0rKQpyd1KIiIxSYD/PwMbAzAAGicnFBY4BAT4gdl5+XioDKmBkYPh2DUQyMFzWBZnFQBrgSi4oKgHSf4DYKCW1OBlopAGQnVJeUgAUZ5wCZIskZYPZK0DsopAgZyB7D5DNlw5hnwGxkyDsOyB2EdATQPYbkPp0MJuJAWwOhC0CYpekVoDsZXDOL6gsykzPKFEwtLS0VHBMyU9KVQiuLC5JzS1W8MxLzi8qyC9KLElNATkK7D6Iux0LCnJSFYAhxkBdAAp/COtzIDhcGcXOIMQQILm0qAwWB4xnCfMRZlTuZWBwDGJgYNmJEAv7wcCwRp+BQZYZIaamxMAgVM/AsLEAAPOlUD4C4sIFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDEtMDFUMjE6NTA6NDErMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTEwLTA4VDA4OjQ0OjEyKzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTEwLTA4VDA4OjQ0OjEyKzAzOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IkFwcGxlIFJHQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyM2I2ODZiZS0yNTE1LTQ0ZDAtYTk0Yy0xYjQ2YmQ2OGNjZjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzMwZWE1ODItMTQ0Ny00ZjMwLWEyOWMtYWU4MjM2MDgwNGI2IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NzMwZWE1ODItMTQ0Ny00ZjMwLWEyOWMtYWU4MjM2MDgwNGI2Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MzBlYTU4Mi0xNDQ3LTRmMzAtYTI5Yy1hZTgyMzYwODA0YjYiIHN0RXZ0OndoZW49IjIwMjAtMDEtMDFUMjE6NTA6NDErMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozNmZjZGY0MC04MWIxLTQ5OTItYjE2My02ZGIxZDkyZjlhN2IiIHN0RXZ0OndoZW49IjIwMjAtMTAtMDhUMDg6NDM6MTYrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyM2I2ODZiZS0yNTE1LTQ0ZDAtYTk0Yy0xYjQ2YmQ2OGNjZjgiIHN0RXZ0OndoZW49IjIwMjAtMTAtMDhUMDg6NDQ6MTIrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlAIh6wAAAENSURBVDjLY/j//z8DGpYC4k4gvgPE/6D4HhD3ALEMunp0zRX/EWATEBdD8QYk8WpcBsyFKgDZzorFZSxA3AJVswTdgGqoRCCapiNAfAxNzAeqtgFmgAhUoAeLrY5A7IRFvBmqR5IBqvE/FkWEMAhMBTGeAPFOHIp2APFuHHLrgfglEwMDgzQQH2bADkByUjjkjgGxCAsDfvAJiJnwKQBJPgNiWwbSgRUQvwUZsByI3cgwIACI14ACQxQaot1YAuoCEF/CIt4I1SMFE6jBkZCOYklIXlC1TehJeT5UogNHUmaGpj4QWI4rM1UiZRpQBsoB4mwgXoMkXosvN4KwNDR13kfKzg+BuB+I5dDVAwCWc4C0bU+y2gAAAABJRU5ErkJggg==') !important;
        background-size: 14px 14px;
        background-position: 3px 5px;
    }

    .code-editor .ace_comment.ace_placeholder {
        color: ${
            ({
                theme,
            }: IStyledEditor) => theme.colorSecondary
        };
        font-style: normal;
        padding: 0 !important;
        font-family: 'Source Code Pro', monospace;
    }
`;
// #endregion module
