import styled, { keyframes } from 'styled-components';

const HeartAnimation = keyframes`
    0%{
        transform: translate(0, 0);
    }

    50%{
        transform: translate(0, 20);
    }

    100%{
        transform: translate(0, 0);
    }
`;

export const Container = styled.main`
    background-color: #303030;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        font-size: 24pt;
        font-weight: bold;
    }

    .form {
        border-bottom: solid 2px #272727;
        width: 100%;
        margin-bottom: 30px;
    }

    .form > input {
        margin: 50px;
        padding: 15px;
        width: 75%;
        background-color: #505050;
        color: #fff;
        border: none;
        font-weight: bold;
        font-size: 20pt;
        border-radius: 5px;
        box-shadow: 1px 1px 2px #707070;
    }

    .form > button {
        background-color: #303030;
        width: 10%;
        padding: 20px;
        border: none;
        cursor: pointer;
        font-size: 24pt;
        color: #fff;
        transition: 0.5s;
    }

    .form > button:hover {
        transition: 0.5s;
        color: #c200ff;
    }

    section {
        display: flex;
        align-items: center;
        width: 100%;
        flex-direction: column;
    }
    ul {
        width: 100%;
    }

    .liked {
        background: #00000000;
        color: #e82a10;
        width: 30px !important;
        border: none;
        margin: 30px;
    }

    .liked:hover {
        border: none;
        color: #ffa1a1;
    }

    .notLiked {
        width: 30px !important;
        background: #00000000;
        color: #ffa1a1;
        margin: 30px;
    }

    .notLiked:hover {
        border: none;
        color: #e82a10;
        animation: ${HeartAnimation} 1s infinite;
    }

    @media screen and (max-width: 580px) {
        .form > input {
            margin: 5px;
        }

        .form > button {
            margin: 5px;
        }
    }
`;

export const ContainerError = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e88a89;
    color: #ff0500;
    padding: 30px;
    text-align: center;
    border-radius: 5px;
    font-size: 20pt;
    font-weight: bold;
    width: 50%;
    margin: 10px;
`;

export const ContainerCard = styled.li`
    list-style-type: none;
    background-color: #fff;
    color: #000;
    width: 780px;
    max-width: 780px;
    padding: 20px;
    margin: 20px auto;
    display: flex;
    text-align: left;

    .desc {
        color: #707070;
    }
    figure {
        width: 200px;
        height: 175px;
    }

    img {
        width: 200px;
        height: 175px;
    }

    span {
        font-size: 14pt;
        font-weight: bold;
    }
    figure {
        margin-right: 20px;
    }

    button,
    .link {
        border: none;
        padding: 15px;
        cursor: pointer;
        font-size: 20pt;
        transition: 0.5s;
        margin: 5px;
        border-radius: 5px;
        color: #fff;
        background: linear-gradient(to right, #c200ff, #5d15ff);
        text-decoration: none;
    }

    button:hover,
    .link:hover {
        border: solid 1px #c200ff;
        color: #c200ff;
        background: #fff;
        transition: 0.5s;
    }

    @media screen and (max-width: 780px) {
        display: flex;
        flex-direction: column;
        width: 100%;

        button,
        .link {
            width: 100%;
        }

        figure > img {
            width: 100% !important;
        }
    }
`;
