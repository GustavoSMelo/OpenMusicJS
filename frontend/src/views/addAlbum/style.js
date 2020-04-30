import styled, { keyframes } from 'styled-components';

const animationButton = keyframes`
    0%{
        transform: translateX(0%);
    }

    50%{
        transform: translateX(-20%);
    }

    100%{
        transform: translateX(0%);
    }
`;

export const Container = styled.main`
    background-image: url(${(props) => props.img});
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    section {
        padding: 30px;
        background-color: #303030d0;
        width: 50%;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        box-shadow: 1px 1px 6px #ffc7e4;
        height: 65%;
        align-items: center;
    }

    section > span {
        display: flex;
        width: 95%;
        align-items: center;
    }

    section > span > .icon {
        font-size: 24pt;
        font-weight: bold;
        color: #ffc7e4;
    }

    section > span > input {
        padding: 15px;
        margin: 15px;
        border-radius: 5px;
        background-color: #00000000;
        border: none;
        border-bottom: solid 5px #ffc7e4;
        color: #ffc7e4;
        font-size: 20pt;
        font-weight: bold;
        transition: 0.4s;
        width: 75%;
    }

    section > span > input:focus {
        width: 85%;
        transition: 0.4s;
        border-bottom: solid 10px #ffc7e4;
        border-left: solid 5px #ffc7e4;
    }

    section > button {
        background-color: #ffc7e4;
        border-radius: 5px;
        width: 265px;
        padding: 20px;
        font-size: 16pt;
        font-weight: bold;
        border: none;
        cursor: pointer;
        margin: 10px;
    }

    section > span > .btnComeBack {
        background-color: #00000000;
        color: #ffc7e4;
        text-align: left;
        align-items: flex-start;
        font-size: 24pt;
        border: none;
        padding: 15px;
        animation: ${animationButton} 1s infinite;
        cursor: pointer;
    }

    @media screen and (max-width: 920px) {
        section {
            width: 75%;
            margin-top: 15%;
        }
    }

    @media screen and (max-width: 720px) {
        section {
            width: 80%;
            margin-top: 15%;
        }
    }
`;

export const ContainerError = styled.article`
    background-color: #ffcfcf;
    color: #f00;
    font-size: 16pt;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    font-weight: bold;
    border-radius: 5px;
    padding: 25px;
    margin: 10px;
`;

export const ContainerSucess = styled.article`
    background-color: #cfe8d2;
    color: #0f0;
    font-size: 16pt;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    font-weight: bold;
    border-radius: 5px;
    padding: 25px;
    margin: 10px;
`;
