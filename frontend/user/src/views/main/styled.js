import styled from 'styled-components';

export const Container = styled.div`
    background-color: #303030;

    header > img {
        margin-top: 30px;
        margin-left: 100px;
        width: 120px;
    }

    header > h1 {
        color: #fff;
        text-align: center;
        margin: 2%;
        font-weight: bold;
        font-size: 42pt;
    }

    main {
        margin: 5%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    main > button {
        background: linear-gradient(to right, #c200ff, #5d15ff);
        border: none;
        border-radius: 10px;
        padding: 30px;
        width: 270px;
        color: #fff;
        font-size: 100%;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
        margin: 15px;
    }
    main > a {
        color: #c200ff;
        font-size: 16pt;
        text-decoration: none;
        margin: 10px;
    }
`;
