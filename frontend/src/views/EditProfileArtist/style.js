import styled from 'styled-components';

export const Container = styled.main`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Formy = styled.form`
    margin: 10%;
    width: 60%;
    border-radius: 10px;
    box-shadow: 1px 1px 4px #606060;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    justify-content: center;
    background-color: #404040;
    color: #fff;

    figure > img {
        text-align: center;
        margin: auto;
        border-radius: 120px;
        width: 85px;
    }

    figure {
        position: absolute;
        top: 20px;
        margin-bottom: 30px;
    }

    span {
        margin-top: 10px;
    }

    input {
        padding: 13px;
        margin: 10px;
        background-color: #303030;
        border: 3px #fff solid;
        border-radius: 5px;
        transition: 0.5s;
        color: #fff;
    }

    input:focus {
        background-color: #202020;
        transition: 0.5s;
        border-top: none;
        border-left: none;
        border-right: none;
        padding: 20px;
    }

    button {
        margin-top: 20px;
        padding: 10px;
        width: 240px;
        border: none;
        cursor: pointer;
        font-size: 16pt;
    }
`;
