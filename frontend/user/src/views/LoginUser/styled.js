import styled from 'styled-components';

export const Container = styled.div`
    background-image: url(${props => props.img});
    height: 100vh;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    input {
        width: 90%;
        margin: 15px;
        padding: 15px;
        border: none;
        border-radius: 5px;
        font-size: 20pt;
        transition: 0.2s;
    }

    button {
        background-color: #7159ac;
        width: 50%;
        padding: 17px;
        border: none;
        border-radius: 10px;
        color: #fff;
        cursor: pointer;
        margin: 20px;
    }

    input:focus {
        border: solid #7159ac 4px;
        transition: 0.2s;
    }

    button:hover {
        background-color: #715999;
    }

    h1 {
        margin: 20px;
        color: #fff;
    }
`;
