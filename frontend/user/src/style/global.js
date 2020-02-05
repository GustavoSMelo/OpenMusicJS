import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: Verdana, Geneva, Tahoma, sans-serif
    }

    html, border-style, #root{
        min-height: 100%;
    }
`;
