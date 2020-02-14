import styled, { keyframes } from 'styled-components';

const animationStatus = keyframes`
    from{
        transform: translateX(-30deg) scale(-0.8);
    }
    to{
        transform: translateX(0deg) scale(0);
    }
`;

export const Container = styled.main`
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
        width: 160px;
    }

    form {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    input {
        width: 25%;
        padding: 7px;
        margin: 15px;
        font-size: 20pt;
        border-radius: 5px;
        border: #909090 1px solid;
    }

    input:focus {
        border: #7159ac 1px solid;
        transition: 0.2s;
    }

    h2 {
        margin-top: 60px;
    }

    button {
        border: none;
        border-radius: 5px;
        background-color: #7159ac;
        color: #fff;
        width: 15%;
        margin: 5px;
        padding: 25px;
        cursor: pointer;
    }

    button:hover {
        background-color: #715999;
    }

    @media screen and (max-width: 970px) {
        button {
            width: 50%;
        }

        input {
            width: 75%;
        }
    }
`;

export const ContainerError = styled.section`
    width: 50%;
    background-color: #e88a89;
    color: #ff0500;
    padding: 30px;
    font-weight: bold;
    text-align: center;
    border-radius: 5px;
    animation: ${animationStatus} 2s linear;
`;

export const ContainerSuccess = styled.section`
    width: 50%;
    background-color: #d8fade;
    color: #00ff05;
    padding: 30px;
    font-weight: bold;
    text-align: center;
    border-radius: 5px;
`;
