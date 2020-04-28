import styled from 'styled-components';

export const Container = styled.div`
    background-image: url(${(props) => props.img});
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
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
        color: #000;
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
        transition: 0.2s;
        border-bottom: 6px solid #e37649;
        background-color: #00000000;
        color: #000;
    }

    main > input:focus {
        border: solid 5px #e37649;
        transition: 0.2s;
        padding-bottom: 25px;
        padding-top: 25px;
    }

    main > .btnAdd {
        background-color: #e37649;
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
