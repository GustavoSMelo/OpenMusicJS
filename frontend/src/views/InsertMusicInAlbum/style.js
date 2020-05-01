import styled from 'styled-components';

export const Container = styled.main`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    figure {
        background-color: #70707030;
        padding: 15px;
        margin: 30px;
        border-radius: 30px;
        box-shadow: 1px 1px 4px #909090;
    }

    img {
        width: 300px;
        height: 180px;
    }

    section > figure > button {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ff0608;
        padding: 10px;
        border-radius: 120px;
        font-size: 16pt;
        border: none;
        height: 60px;
        width: 60px;
        color: #fff;
        position: absolute;
        cursor: pointer;
        transition: 0.5s;
        font-weight: bold;
    }

    section > figure > button:hover {
        background-color: #fff;
        border: solid 4px #ff0608;
        color: #ff0608;
        transition: 0.25s;
        box-shadow: 1px 1px 3px #606060;
    }

    section > figure {
        text-align: center;
    }

    article > figure > button {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #aae89b;
        padding: 10px;
        border-radius: 120px;
        font-size: 16pt;
        border: none;
        height: 60px;
        width: 60px;
        color: #fff;
        position: absolute;
        cursor: pointer;
        transition: 0.5s;
        font-weight: bold;
    }

    article > figure > button:hover {
        background-color: #fff;
        border: solid 4px #aae89b;
        color: #aae89b;
        transition: 0.25s;
        box-shadow: 1px 1px 3px #606060;
    }
`;
