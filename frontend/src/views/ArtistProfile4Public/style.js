import styled from 'styled-components';

export const Container = styled.main`
    text-align: center;

    .artistInfo {
        margin-top: 60px;
    }

    .artistInfo > button {
        width: 300px;
        margin: 10px;
        padding: 12px;
        background-color: #303030;
        border: solid 3px #ffa1a1;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16pt;
        color: #fff;
        font-weight: bold;
        transition: 0.3s;
    }

    .artistInfo > h1 {
        font-size: 24pt;
        margin: 15px;
    }

    .artistInfo > button > .icon-hearth {
        color: #ffa1a1;
        transition: 0.3s;
    }

    .artistInfo > button:hover {
        transition: 0.3s;
        border: solid 3px #303030;
        background-color: #ffa1a1;
        color: #fff;
    }

    .artistInfo > button:hover > .icon-hearth {
        color: #fff;
        transition: 0.3s;
    }

    figure > img {
        border-radius: 120px;
    }
`;
