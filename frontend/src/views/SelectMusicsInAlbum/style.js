import styled, { keyframes } from 'styled-components';

export const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .albuns {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .albuns > figure {
        margin-top: 30px;
        box-shadow: 1px 1px 6px #707070;
        width: 450px;
        text-align: center;
        transition: 1s;
        background-color: #fff;
        cursor: pointer;
    }

    .albuns > figure > img {
        width: 100%;
    }

    .albuns > figure > figcaption {
        padding: 20px;
    }

    .albuns > figure > figcaption > small {
        color: #909090;
    }

    .albuns > figure:hover {
        width: 30%;
        transition: 1s;
    }
`;
