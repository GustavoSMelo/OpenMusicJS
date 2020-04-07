import styled from 'styled-components';

export const Container = styled.main`
    background-color: #303030;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    height: 100vh;

    img {
        margin-top: 50px;
        width: 380px;
        height: 380px;
        border-radius: 360px;
        box-shadow: 1px 1px 3px #252525;
    }

    h1 {
        margin-top: 50px;
        font-weight: bold;
        text-transform: capitalize;
        font-size: 26pt;
    }

    h2 {
        margin-top: 30px;
        font-size: 18pt;
    }

    span {
        margin-top: 30px;
    }

    section {
        margin-bottom: 30px;
    }

    .btnEdit {
        border-radius: 30px;
        border: solid 3px #ffd53d;
        background-color: #303030;
        color: #ffd53d;
        width: 120px;
        margin: 10px;
        cursor: pointer;
        padding: 15px;
        font-weight: bold;
        transition: 0.3s;
        text-decoration: none;
    }

    .btnDelete {
        border-radius: 30px;
        border: solid 3px #ff6d6d;
        background-color: #303030;
        color: #ff6d6d;
        width: 120px;
        margin: 10px;
        cursor: pointer;
        padding: 15px;
        font-weight: bold;
        transition: 0.3s;
    }

    .btnExit {
        border-radius: 30px;
        border: solid 3px #fff;
        background-color: #303030;
        color: #fff;
        width: 120px;
        margin: 10px;
        cursor: pointer;
        padding: 15px;
        font-weight: bold;
        transition: 0.3s;
    }
    .btnExit:hover {
        background-color: #fff;
        border: solid 3px #303030;
        color: #303030;
        transition: 0.3s;
    }

    .btnEdit:hover {
        transition: 0.3s;
        background-color: #ffd53d;
        color: #303030;
        box-shadow: 1px 1px 1px #ffd53d;
    }

    .btnDelete:hover {
        transition: 0.3s;
        background-color: #ff6d6d;
        color: #303030;
        box-shadow: 1px 1px 1px #ff6d6d;
    }

    .ErrorBox {
        width: 100%;
        background-color: #ff6d6d;
        color: #ff3624;
        text-align: center;
        padding: 20px;
        border-radius: 5px;
    }

    @media screen and (max-width: 440px) {
        img {
            width: 100%;
            border-radius: 0px;
        }
    }
`;

export const PopupContainer = styled.section`
    overflow: hidden;
    margin: auto;
    position: fixed;
    z-index: 3;
    width: 60%;
    height: 60vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
    padding: 50px;

    input {
        width: 75%;
        margin-top: 100px;
        padding: 15px;
        border-radius: 5px;
        border: none;
        box-shadow: 1px 1px 3px #303030;
        font-size: 18pt;
        font-weight: bold;
    }

    .lastButtonDelete {
        background-color: #fff;
        border: solid 3px #ff3624;
        color: #ff3624;
        border-radius: 20px;
        padding: 20px;
        cursor: pointer;
        font-weight: bold;
        font-size: 14pt;
        margin: 10px;
        transition: 0.3s;
    }

    .lastButtonDelete:hover {
        background-color: #ff3624;
        border: solid 3px #fff;
        color: #fff;
        transition: 0.3s;
    }

    .Nevermind {
        background-color: #fff;
        border: solid 3px #a3ff99;
        color: #a3ff99;
        border-radius: 20px;
        padding: 20px;
        cursor: pointer;
        font-weight: bold;
        font-size: 16pt;
        margin: 10px;
        transition: 0.3s;
    }

    .Nevermind:hover {
        background-color: #a3ff99;
        border: solid 3px #fff;
        color: #fff;
        transition: 0.3s;
    }
`;

export const ContainerError = styled.div`
    background-color: #ff767b;
    color: #ff1000;
    padding: 50px;
    text-align: center;
    width: 75%;
    margin-top: 30px;
    border-radius: 10px;
    margin: auto;
`;
