import styled, { keyframes } from 'styled-components';

const animationButton = keyframes`
    0%{
        transform: translate(0px, 0px);
    }
    50%{
        transform: translate(0px, 15px);
    }

`;

export const Container = styled.main`
    background-color: #303030;
    color: #fff;

    button {
        cursor: pointer;
    }

    header {
        padding: 20px;
        margin-bottom: 30px;
        display: flex;
        flex-direction: row;
    }

    header > figure > img {
        width: 230px;
        border-radius: 10px;
    }

    header > figure {
        margin-right: 15px;
    }

    section {
        display: flex;
        margin-bottom: 30px;
        justify-content: left;
        margin-left: 20%;
    }

    section > figure > img {
        width: 300px;
        height: 100%;
        margin-right: 10px;
        border-radius: 10px;
    }

    .buttonPlayer {
        background-color: #c200ff;
        color: #fff;
        border-radius: 10px;
        border: none;
        padding: 20px;
        font-weight: bold;
    }

    .like {
        color: #f00;
        font-size: 24pt;
        background-color: #00000000;
        border: none;
        transition: 0.4s;
    }

    .like:hover {
        color: #ffa89d;
        font-size: 20pt;
        transition: 0.4s;
    }

    .notLike {
        color: #ffa89d;
        font-size: 24pt;
        background-color: #00000000;
        border: none;
        transition: 0.4s;
    }

    .notLike:hover {
        color: #f00;
        transition: 0.4s;
        animation: ${animationButton} infinite 1s;
    }

    @media screen and (max-width: 850px) {
        header {
            flex-direction: column;
        }

        section {
            flex-direction: column;
            margin-left: 30px;
        }
    }
`;
