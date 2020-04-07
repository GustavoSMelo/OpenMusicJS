import styled from 'styled-components';

export const Container = styled.main`
    background-color: #303030;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .cardBox {
        width: 40%;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        color: #000;
    }

    .cardBox > figure > img {
        width: 100%;
    }

    .cardBox > span {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 30px;
        align-items: center;
    }

    .listen {
        padding: 20px;
        height: 60px;
        border-radius: 5px;
        border: none;
        background-color: #e3b3e8;
        cursor: pointer;
        font-weight: bold;
    }

    .like {
        background-color: #00000000;
        color: #f00;
        font-weight: bold;
        font-size: 24pt;
        border: none;
        cursor: pointer;
        transition: 0.4s;
    }

    .like:hover {
        font-size: 20pt;
        color: #e89592;
        transition: 0.4s;
    }
`;

export const ContainerError = styled.section`
    padding: 50px;
    text-align: center;
    display: flex;
    align-items: center;
    font-weight: bold;
    background-color: #ffa9a9;
    color: #f40000;
    border-radius: 5px;
`;
