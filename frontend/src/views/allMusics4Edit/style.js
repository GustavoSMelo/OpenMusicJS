import styled, { keyframes } from 'styled-components';

const animationButton = keyframes`
    0%{
        transform: translateX(0%);
    }

    50%{
        transform: translateX(-30%);
    }

    100%{
        transform: translateX(0%);
    }
`;

export const ComeBack = styled.button`
    margin: 50px;
    border: none;
    font-size: 26pt;
    cursor: pointer;
    padding: 5px;
    animation: ${animationButton} infinite 1s;
`;

export const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    section {
        display: flex;
        background-color: #60606085;
        color: #fff;
        width: 60%;
        margin-top: 35px;
        padding: 15px;
        border-radius: 5px;
        transition: 0.3s;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    h1 {
        font-size: 24pt;
        font-weight: bold;
        margin-top: 60px;
    }

    section:hover {
        background-color: #60606099;
        box-shadow: 2px 2px 6px #101010;
        transition: 0.3s;
    }

    section > figure > img {
        width: 250px;
        margin: 30px;
        border-radius: 10px;
    }

    section > article {
        padding: 10px;
    }

    section > span > .btnLink {
        background-color: #e37649;
        padding: 20px;
        font-weight: bold;
        text-align: center;
        border-radius: 10px;
        border: none;
        cursor: pointer;
        color: #fff;
        width: 100px;
        text-decoration: none;
    }
`;
