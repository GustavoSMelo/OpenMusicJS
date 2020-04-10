import styled from 'styled-components';

export const Container = styled.main`
    text-align: center;
    margin: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
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

    .artistInfo > .liked {
        background-color: #ffa1a1;
        border: solid 3px #303030;
        color: #fff;
        transition: 0.3s;
    }

    .artistInfo > .liked:hover {
        background-color: #303030;
        border: solid 3px #ffa1a1;
        color: #fff;
        transition: 0.3s;
    }

    .artistInfo > .notLiked:hover {
        background-color: #ffa1a1;
        border: solid 3px #303030;
        color: #fff;
        transition: 0.3s;
    }

    figure > img {
        border-radius: 120px;
    }

    .artistMusic > article {
        margin: auto;
        background-color: #fff;
        width: 780px;
        color: #000;
        margin: 30px;
        display: flex;
        padding: 50px;
        text-align: left;
    }

    .artistMusic > article > figure > img {
        width: 175px;
        height: 175px;
        border-radius: 100px;
        margin-right: 50px;
    }

    .artistMusic h1 {
        font-size: 20pt;
    }
    .artistMusic h2 {
        text-transform: capitalize;
    }

    .artistMusic button {
        width: 300px;
        padding: 10px;
        margin-top: 30px;
        border: none;
        background-color: #b689e8;
        cursor: pointer;
        color: #fff;
        border-radius: 5px;
        border: solid 3px #fff;
        transition: 0.3s;
    }
    .artistMusic button:hover {
        transition: 0.3s;
        background-color: #fff;
        color: #b689e8;
        border: solid 3px #b689e8;
    }

    @media screen and (max-width: 790px) {
        .artistMusic > article {
            width: 100%;
            margin: 0px;
            margin-bottom: 30px;
            padding-top: 10px;
            padding-bottom: 10px;
        }

        .artistMusic > article > figure > img {
            margin-right: 10px;
        }

        .artistMusic > article {
            align-items: center;
            justify-content: center;
            display: flex;
            flex-direction: column;
        }
    }
`;

export const ContainerError = styled.article`
    margin: auto;
    background-color: #ff767b !important;
    color: #ff1000 !important;
    border-radius: 5px;
    margin-top: 30px;
    padding: 10px;
    text-align: center;
`;
