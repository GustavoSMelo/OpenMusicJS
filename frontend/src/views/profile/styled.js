import styled from 'styled-components';

export const Container = styled.main`
    background-color: #303030;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;

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

    @media screen and (max-width: 440px) {
        img {
            width: 100%;
            border-radius: 0px;
        }
    }
`;