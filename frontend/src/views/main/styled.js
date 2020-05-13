import styled from 'styled-components';

export const Container = styled.div`
    background-color: #fff;

    header > img {
        margin-top: 30px;
        margin-left: 100px;
        width: 120px;
    }

    header > h1 {
        color: #000;
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

    main > a {
        color: #c200ff;
        font-size: 16pt;
        text-decoration: none;
        margin: 10px;
    }

    .link-button {
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
        color: #fff;
        text-decoration: none;
    }
`;

export const Image = styled.div`
    background-image: url(${(props) => props.img});
    flex-direction: column;
    background-size: unset;
    background-attachment: fixed;
    display: flex;

    h1 {
        font-size: 32pt;
        margin-top: 5%;
        margin-bottom: 5px;
    }

    h2 {
        font-size: 26pt;
        margin-bottom: 5%;
        margin-top: 5px;
    }

    h1,
    h2 {
        text-align: center;
        color: #fff;
    }

    .for-artists {
        display: flex;
        align-items: flex-start;
        margin-left: 5%;
        color: #fff;
        font-size: 32pt;
        text-align: justify;
        margin-top: 7%;
        width: 30%;
        flex-direction: column;
    }

    .for-mobile {
        max-width: 25%;
        margin-left: 65%;
        margin-bottom: 7%;
        color: #fff;
        font-size: 32pt;
        margin-top: 7%;
        text-align: right;
    }

    .link-button-img {
        background: linear-gradient(to right, #c200ff, #5d15ff);
        border: none;
        border-radius: 10px;
        padding: 30px;
        width: 100%;
        color: #fff;
        font-size: 50%;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
        margin: 15px;
    }

    a {
        color: #c200ff;
        font-size: 16pt;
        text-decoration: none;
        margin: 10px;
    }

    @media screen and (max-width: 780px) {
        .for-artists {
            padding-top: 50%;
            margin-left: 30%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        button {
            background: linear-gradient(to right, #c200ff, #5d15ff);
            border: none;
            margin: 0px;
            border-radius: 10px;
            padding: 30px;
            width: 270px;
            color: #fff;
            font-size: 50%;
            font-weight: bold;
            text-align: center;
            cursor: pointer;
        }

        a {
            margin: 0px;
        }

        .for-mobile {
            margin-left: 20%;
            margin-bottom: 7%;
            padding-top: 50%;
            color: #fff;
            font-size: 32pt;
            margin-top: 7%;
            text-align: center;
        }
    }
`;
