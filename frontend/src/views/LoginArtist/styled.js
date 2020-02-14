import styled from 'styled-components';

export const Container = styled.div`
    background-image: url(${props => props.img});
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    input {
        margin: 14px;
        width: 96%;
        padding: 10px;
        border: none;
        border-radius: 5px;
        font-size: 20pt;
        transition: 0.2s;
    }

    input:focus {
        border: solid #7159ac 4px;
        transition: 0.2s;
    }

    button {
        margin: 14px;
        background-color: #7159ac;
        border-radius: 10px;
        width: 30%;
        border: none;
        padding: 17px;
        color: #fff;
        cursor: pointer;
        font-weight: bold;
    }

    button:hover {
        background-color: #715999;
    }

    h1 {
        color: #fff;
        margin: 20px;
    }

    @media screen and (max-width: 860px) {
        input {
            width: 90%;
        }

        button {
            width: 50%;
        }
    }
`;
