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
    background-image: url(${props => props.img});
    height: 100vh;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    input {
        width: 90%;
        margin: 15px;
        padding: 15px;
        border: none;
        border-radius: 5px;
        font-size: 20pt;
        transition: 0.2s;
    }

    button {
        background-color: #7159ac;
        width: 50%;
        padding: 17px;
        border: none;
        border-radius: 10px;
        color: #fff;
        cursor: pointer;
        margin: 20px;
    }

    input:focus {
        border: solid #7159ac 4px;
        transition: 0.2s;
    }

    button:hover {
        background-color: #715999;
    }

    h1 {
        margin: 20px;
        color: #fff;
    }
`;

export const ContainerError = styled.section`
    display: flex;
    width: 45%;
    background-color: #e88a89 !important;
    color: #ff0500 !important;
    padding: 30px;
    font-weight: bold;
    text-align: center;
    border-radius: 5px;
    animation: ${animationStatus} 2s;
    flex-direction: column;
    margin: 30px;

    @media screen and (max-width: 780px) {
        margin: 0px;
    }
`;
