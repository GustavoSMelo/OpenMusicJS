import styled from 'styled-components';

export const Container = styled.main`
    display: flex;
    background-color: #202020;
    flex-direction: column;
    padding: 50px;
    color: #fff;

    ul {
        margin: 15px;
        display: flex;
        width: 50%;
        height: 75%;
        color: #000;
    }

    li {
        background-color: #fff;
        display: flex;
        flex-direction: column;
        font-weight: bold;
        font-size: 16pt;
        margin: 2%;
        width: 50%;
        list-style-type: none;
        border-radius: 5px;
        box-shadow: 2px 2px 4px #101010;
        height: 440px;
    }

    li > p {
        padding: 10px;
    }

    li > img {
        width: 100%;
        height: 100%;
        background-color: #7159ac;
        background-size: cover;
    }

    li > span {
        display: flex;
        width: 100%;
        justify-content: space-around;
        flex-direction: row;
        padding: 10px;
    }

    li > span > .listen {
        width: 55%;
        padding: 15px;
        cursor: pointer;
        background-color: #c200ff;
        border: none;
        border-radius: 5px;
        font-weight: bold;
        color: #fff;
        transition: 0.3s;
    }

    li > span > .listen:hover {
        background-color: #e054ff;
        transition: 0.3s;
    }

    .needlike {
        background-color: #ffffff00;
        border: none;
        width: 25%;
        cursor: pointer;
        font-size: 20pt;
        transition: 0.5s;
    }

    .liked {
        border: none;
        width: 25%;
        cursor: pointer;
        font-size: 20pt;
        transition: 0.5s;
        color: #c200ff;
    }

    .liked:hover {
        color: #000;
        transition: 0.5s;
    }

    .needlike:hover {
        color: #c200ff;
        transition: 0.5s;
    }

    @media screen and (max-width: 970px) {
        align-items: center;
        justify-content: center;

        ul {
            width: 100%;
            flex-direction: column;
        }

        li {
            width: 75%;
            height: 100%;
        }
    }

    @media screen and (max-width: 560px) {
        li {
            width: 100%;
        }
    }
`;
