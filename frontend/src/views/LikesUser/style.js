import styled from 'styled-components';

export const Container = styled.main`
    background-color: #303030;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;

    h1 {
        margin: 30px;
    }

    button {
        cursor: pointer;
    }

    article {
        color: #000;

        display: flex;
        flex-direction: column;
        width: 40%;
    }

    article > section > figure > img {
        width: 100%;
        height: 300px;
    }

    article > section > span {
        display: flex;
        flex-direction: row;
        padding: 30px;
        justify-content: space-between;
    }

    article > section {
        background-color: #fff;
        margin: 30px;
    }

    article > section > span > .classicButton {
        background-color: #e880d7;
        color: #fff;
        border: none;
        border-radius: 5px;
        height: 30px;
        padding: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16pt;
        font-weight: bold;
        text-decoration: none;
    }

    article > section > span > .heart {
        background-color: #00000000;
        color: #f00;
        font-size: 24pt;
        border: none;
        transition: 0.4s;
    }
    article > section > span > .heart:hover {
        background-color: #00000000;
        color: #ffa5a5;
        font-size: 20pt;
        transition: 0.4s;
    }

    .link {
        border: none;
        padding: 15px;
        cursor: pointer;
        font-size: 20pt;
        transition: 0.5s;
        margin: 5px;
        border-radius: 5px;
        color: #fff;
        background-color: #e880d7;
        text-decoration: none;
    }

    @media screen and (max-width: 1130px) {
        article > section > span {
            flex-direction: column;
        }
    }

    @media screen and (max-width: 920px) {
        article {
            width: 80%;
        }
    }

    @media screen and (max-width: 600px) {
        article {
            width: 100%;
        }

        article > section {
            margin-left: 0px;
            margin-right: 0px;
        }
    }
`;

export const ContainerError = styled.section`
    background-color: #ffa5a5 !important;
    color: #f00;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
`;
