import styled from 'styled-components';

export const Container = styled.form`
    padding-top: 50px;
    display: flex;
    align-items: center;
    margin: auto;
    flex-direction: column;

    img {
        width: 300px;
        height: 300px;
        border-radius: 300px;
    }

    input {
        width: 500px;
        padding: 20px;
        margin-top: 30px;
        border-bottom: solid 3px #7159ac;
        background-color: #303030;
        border-top: none;
        border-left: none;
        border-right: none;
        color: #fff;
        box-shadow: 1px 1px 3px #404040;
        font-size: 16pt;
        transition: 0.6s;
        border-radius: 5px;
    }

    input:focus {
        width: 700px;
        transition: 0.6s;
        box-shadow: 3px 3px 1px #7159ac;
    }

    button {
        background-color: #ffdf9e;
        color: #000;
        width: 300px;
        margin-top: 30px;
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    @media screen and (max-width: 780px) {
        input {
            width: 70%;
        }
        input:focus {
            width: 90%;
        }
    }
`;

export const ContainerError = styled.article`
    background-color: #ff767b;
    color: #ff3624;
    font-weight: bold;
    padding: 50px;
    text-align: center;
    border-radius: 5px;
`;
