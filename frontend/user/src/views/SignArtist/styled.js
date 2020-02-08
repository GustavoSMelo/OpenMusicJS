import styled, { keyframes } from 'styled-components';

const animationInput = keyframes`
    from{
        transform: translateX(-30%) scale(0.9);
    }to{
        transform: translateX(0) scale(1);
    }
`;

const animationInput2 = keyframes`
    from{
        transform: translateX(-15%);
    }to{
        transform: translateX(0);
    }
`;

export const Container = styled.main`
    background-image: url(${props => props.img});
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    background-size: cover;

    h2 {
        margin: 10px;
    }

    article {
        background-color: #000000dd;
        padding: 30px;
        border-radius: 5px;
        animation: ${animationInput} 750ms;
    }

    article > h2 {
        color: #fff;
        font-weight: bold;
        font-size: 32pt;
    }

    input {
        border: none;
        border-bottom-color: #7159ac;
        border-bottom-style: solid;
        border-bottom-width: 2px;
        color: #fff;
        background-color: #ffffff00;
        margin: 10px;
        font-size: 26pt;
        padding: 10px;
        transition: 0.1s;
        animation: ${animationInput2} 500ms;
    }

    input:focus {
        border-bottom-width: 5px;
        transition: 0.1s;
    }

    button {
        background-color: #7159ac;
        width: 40%;
        border: none;
        border-radius: 5px;
        padding: 20px;
        margin: 10px;
        cursor: pointer;
        color: #fff;
    }

    button:hover {
        background-color: #715999;
    }

    section {
        background-color: #fff;
        padding: 30px;
        border-radius: 5px;
        animation: ${animationInput} 750ms;
    }

    .cancel {
        background-color: #f00;
    }

    .cancel:hover {
        background-color: #f00000;
    }

    @media screen and (max-width: 970px) {
        justify-content: center;
        flex-direction: column;

        input {
            font-size: 14pt;
        }
    }
`;
