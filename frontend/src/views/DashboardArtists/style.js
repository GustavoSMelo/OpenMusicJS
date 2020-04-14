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
    flex-direction: row;

    .a {
        width: 70%;
    }
    .a > span {
        width: 80%;
        border: solid black 1px;
        margin-left: 10px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    .inserts {
        width: 30%;
    }

    .inserts > section {
        border: 3px solid #5d15ff;
        padding: 30px;
        margin: 10px;
        border-radius: 5px;
        font-size: 16pt;
        font-weight: bold;
    }
`;
