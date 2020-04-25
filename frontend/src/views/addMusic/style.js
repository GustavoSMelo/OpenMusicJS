import styled from 'styled-components';

export const Container = styled.div`
    background-color: #5d15ff;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    main {
        background-color: #fff;
        color: #000;
        display: flex;
        flex-direction: column;
        padding: 35px;
        border-radius: 5px;
        box-shadow: 3px 3px 6px #303030;
    }

    main > .btnBack {
        font-size: 24pt;
        width: 60px;
        cursor: pointer;
        background-color: #00000000;
        border: none;
        margin-bottom: 30px;
    }

    main > input {
        padding: 15px;
        font-size: 16pt;
        margin: 10px;
        border-radius: 5px;
        border: none;
        box-shadow: 1px 1px 6px;
        transition: 0.2s;
    }

    main > input:focus {
        border: solid 5px #5d15ff;
        transition: 0.2s;
    }

    main > .btnAdd {
        background-color: #5d15ff;
        padding: 20px;
        color: #fff;
        font-size: 16pt;
        font-weight: bold;
        cursor: pointer;
        border-radius: 5px;
        border: none;
        margin-top: 15px;
    }
`;

export const ContainerError = styled.section`
    background-color: #ffb8ab;
    color: #f00;
    font-weight: bold;
    width: 45%;
    padding: 30px;
    text-align: center;
    margin: 30px;
    border-radius: 10px;
    box-shadow: 3px 3px 6px #303030;
    font-size: 20pt;
`;

export const ContainerSuccess = styled.section`
    background-color: #cfffd1;
    color: #0f0;
    font-weight: bold;
    width: 45%;
    padding: 30px;
    text-align: center;
    margin: 30px;
    border-radius: 10px;
    box-shadow: 3px 3px 6px #303030;
    font-size: 20pt;
`;
