import styled from 'styled-components';

export const Container = styled.div`
    background-color: #111111;
    background-image: url(${props => props.img});
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    background-size: cover;

    h2 {
        margin: 10px;
    }

    main {
        background-color: #000000dd;
        padding: 30px;
        border-radius: 5px;
    }

    main > h2 {
        color: #fff;
        font-weight: bold;
        font-size: 32pt;
    }

    input {
        border: none;
        border-bottom-color: #7159ac;
        border-bottom-style: solid;
        border-bottom-width: 2px;
        color: #fff;
        background-color: #ffffff00;
        margin: 10px;
        font-size: 26pt;
        padding: 10px;
        transition: 0.1s;
    }

    input:focus {
        border-bottom-width: 5px;
        transition: 0.1s;
    }

    button {
        background-color: #7159ac;
        width: 40%;
        border: none;
        border-radius: 5px;
        padding: 20px;
        margin: 10px;
        cursor: pointer;
        color: #fff;
    }

    button:hover {
        background-color: #715999;
    }

    @media screen and (max-width: 970px) {
        justify-content: center;
        flex-direction: column;

        input {
            font-size: 14pt;
        }
    }
`;
