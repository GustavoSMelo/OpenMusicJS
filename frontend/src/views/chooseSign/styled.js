import styled from 'styled-components';

export const Container = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    background-color: #fff;

    .button {
        text-decoration: none;
        background: linear-gradient(to right, #c200ff, #5d15ff);
        border: none;
        border-radius: 10px;
        padding: 30px;
        width: 25%;
        color: #fff;
        font-size: 100%;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
        margin: 15px;
    }

    @media screen and (max-width: 970px) {
        .button {
            width: 75%;
        }
    }
`;
