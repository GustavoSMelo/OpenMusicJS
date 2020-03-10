import styled from 'styled-components';

export const Container = styled.main`
    background-color: #303030;
    color: #fff;
    display: flex;
    flex-direction: column;
    height: 100vh;
    align-items: center;

    h1 {
        font-size: 24pt;
        font-weight: bold;
    }

    form {
        border-bottom: solid 2px #272727;
        width: 100%;
        margin-bottom: 30px;
    }

    form > input {
        margin: 50px;
        padding: 15px;
        width: 75%;
        background-color: #505050;
        color: #fff;
        border: none;
        font-weight: bold;
        font-size: 20pt;
        border-radius: 5px;
        box-shadow: 1px 1px 2px #707070;
    }

    form > button {
        background-color: #303030;
        width: 10%;
        padding: 20px;
        border: none;
        cursor: pointer;
        font-size: 24pt;
        color: #fff;
        transition: 0.5s;
    }

    button:hover {
        transition: 0.5s;
        color: #c200ff;
    }

    section {
        display: flex;
        align-items: center;
        width: 100%;
        flex-direction: column;
    }
    ul {
        width: 100%;
        display: flex;
    }
`;

export const ContainerError = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e88a89;
    color: #ff0500;
    padding: 30px;
    text-align: center;
    border-radius: 5px;
    font-size: 20pt;
    font-weight: bold;
    width: 50%;
    margin: 10px;
`;

export const ContainerAlbum = styled.li`
    list-style-type: none;
    background-color: #fff;
    color: #000;
    width: 780px;
    max-width: 780px;
    padding: 20px;
    margin: 20px auto;
    display: flex;

    .desc {
        color: #707070;
    }
    figure {
        width: 200px;
        height: 175px;
    }

    img {
        width: 200px;
        height: 175px;
    }

    span {
        font-size: 14pt;
        font-weight: bold;
    }
    figure {
        margin-right: 20px;
    }

    @media screen and (max-width: 500px) {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
`;
