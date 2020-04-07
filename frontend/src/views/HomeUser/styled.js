import styled, { keyframes } from 'styled-components';

const animationHeart = keyframes`
    0%{
        transform: translate(0px, 0px);
    }50%{
        transform: translate(0px, -10px);
    }
    100%{
        transform: translate(0px, 0px);
    }
`;

export const Container = styled.main`
    padding: 30px;
    background-color: #303030;
    color: #fff;
    ul {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        list-style-type: none;
        margin-left: 10px;
        margin-right: 10px;
        grid-gap: 10px;
    }

    li {
        text-align: center;
        border-radius: 5px;
        width: 400px;
        box-shadow: 1px 1px 3px #606060;
    }

    li > span {
        padding: 10px;
    }

    li > h1 {
        text-transform: capitalize;
    }

    li > h2 {
        color: #e3b3e8;
        text-transform: capitalize;
    }

    li > figure > img {
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        width: 400px;
    }
    li > button {
        background-color: #c200ff;
        border: none;
        padding: 20px;
        border-radius: 10px;
        cursor: pointer;
        margin-bottom: 30px;
        margin-left: 30px;
        color: #fff;
        font-size: 12pt;
        font-weight: bold;
        transition: 0.3s;
    }

    li > button:hover {
        transition: 0.3s;
    }

    li > .liked {
        background-color: #00000000;
        color: #e82a10;
        font-size: 24pt;
        transition: 0.35s;
    }

    li > .liked:hover {
        color: #ffa1a1;
        font-size: 20pt;
        transition: 0.35s;
    }

    li > .notLiked {
        background-color: #00000000;
        color: #909090;
        font-size: 24pt;
        transition: 0.3s;
    }

    li > .notLiked:hover {
        animation: ${animationHeart} infinite 1s;
        color: #ffa1a1;
        transition: 0.3s;
    }

    @media screen and (max-width: 1300px) {
        ul {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media screen and (max-width: 860px) {
        ul {
            display: flex;
            align-items: center;
            flex-direction: column;
        }

        li {
            box-shadow: 0px 0px 0px;
            margin-top: 30px;
            width: 90%;
        }

        li > figure > img {
            width: 100%;
        }
    }
`;
