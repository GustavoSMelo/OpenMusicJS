import styled, { keyframes } from 'styled-components';

const btnAnimation = keyframes`
    0%{
        transform: translateX(0%);
    }

    50%{
        transform: translateX(-10%);
    }

    100%{
        transform: translateX(0%);
    }
`;

export const BtnGoBack = styled.button`
    background-color: transparent;
    color: #fff;
    font-size: 24pt;
    border: none;
    padding: 30px;
    margin: 10px;
    cursor: pointer;
    animation: ${btnAnimation} 1s infinite;
`;

export const Container = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    section {
        width: 70%;
        background-color: #fffffff0;
        margin: 30px;
        box-shadow: 1px 1px 4px #303030;
        display: flex;
    }

    section > figure > img {
        width: 300px;
        height: 100%;
        margin-right: 30px;
    }

    section > article {
        padding: 30px;
    }

    section > article > span > p {
        text-align: justify;
        margin-top: 15px;
        margin-bottom: 15px;
        color: #808080;
        font-size: 14pt;
    }

    section > article > .btn {
        width: 120px;
        padding: 10px;
        font-size: 16pt;
        cursor: pointer;
        border-radius: 10px;
        border: none;
        box-shadow: 2px 1px 6px #606060;
        text-decoration: none;
        margin-bottom: 30px;
        color: #000;
    }

    @media screen and (max-width: 970px) {
        section {
            flex-direction: column;
        }

        section > figure > img {
            width: 100%;
        }
    }
`;
