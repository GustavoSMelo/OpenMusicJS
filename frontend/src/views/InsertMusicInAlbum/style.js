import styled from 'styled-components';

export const Container = styled.main`
    display: flex;
    flex-direction: row;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 10px;
    justify-content: space-between;
    align-items: center;

    aside,
    section,
    article {
        width: 45%;
    }

    .ControlButtonInsert {
        background-color: #00d932;
        border-radius: 120px;
        text-align: center;
        justify-content: center;
        color: #fff;
        border: none;
        padding: 15px;
        font-size: 16pt;
        width: 50px;
        height: 50px;
        cursor: pointer;
    }

    .ControlButtonDelete {
        background-color: #f01003;
        border-radius: 360px;
        text-align: center;
        justify-content: center;
        align-items: center;
        color: #fff;
        border: none;
        padding: 15px;
        font-size: 16pt;
        width: 50px;
        height: 50px;
        cursor: pointer;
    }
`;

export const Card = styled.article`
    width: 100%;
    border-radius: 5px;
    box-shadow: 1px 1px 9px #707070;
    height: 300px;
    align-items: flex-start;

    text-align: center;
`;

export const Pictures = styled.img`
    width: 100%;
    height: 150px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;
