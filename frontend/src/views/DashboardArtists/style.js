import styled from 'styled-components';

export const NavHeader = styled.header`
    width: 100%;
    height: 100px;

    background: linear-gradient(to right, #303030, #7159ac);
    text-decoration: none !important;

    .content {
        width: 100%;
        height: 90px;
        background-color: #fff;
        padding: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom-right-radius: 40px;
    }

    .link {
        text-decoration: none;
        font-weight: bold;
    }

    .link > figure {
        display: flex;
        align-items: center;
        color: #000;
        flex-direction: row;
    }

    .link > figure > img {
        margin-right: 10px;
        width: 80px;
        border-radius: 120px;
    }

    .logoff {
        cursor: pointer;
        background-color: #00000000;
        color: #ff9da1;
        font-size: 24pt;
        transition: 0.4s;
        border: none;
        margin-right: 10px;
    }

    .logoff:hover {
        font-size: 26pt;
        color: #f00;
        transition: 0.4s;
    }
`;

export const Container = styled.main`
    margin-top: 30px;
    display: flex;
    flex-direction: column;

    .Relevance {
        text-align: center;
        margin: 30px;
    }

    .inserts {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .icon-heart {
        font-size: 66pt;
        color: #f00;
    }

    .inserts > span {
        margin: 10px;
    }

    .inserts > span > .btnMenu {
        text-decoration: none;
        color: #5d15ff;
    }

    .inserts > span > .btnMenu > section {
        border: 3px solid #5d15ff;
        padding: 30px;
        margin: 10px;
        border-radius: 5px;
        font-size: 16pt;
        font-weight: bold;
        cursor: pointer;
        transition: 0.5s;
    }

    .inserts > span > .btnMenu > section:hover {
        background-color: #5d15ff;
        color: #fff;
        border: solid 3px #fff;
        transition: 0.5s;
    }

    @media screen and (max-width: 1600px) {
        flex-direction: column-reverse;

        .inserts {
            width: 70%;
            margin: auto;
        }

        .a {
            width: 80%;
        }

        .a > span {
            width: 95%;
        }
    }

    @media screen and (max-width: 1100px) {
        .a {
            width: 100%;
        }

        .a > span {
            width: 100%;
        }
        .a > span {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: auto;
        }

        .a > span > section {
            margin-top: 60px;
        }
    }
`;
