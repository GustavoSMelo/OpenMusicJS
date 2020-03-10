import styled from 'styled-components';

export const ContainerNotLogged = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #101010;
    width: 100vw;
    height: 100vh;
    color: #fff;

    .btnLogin {
        width: 17%;
        background: linear-gradient(to right, #c200ff, #5d15ff);
        margin: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        text-decoration: none;
        padding: 30px;
        border-radius: 5px;
        font-weight: bold;
        transition: 1s;
    }

    @media screen and (max-width: 780px) {
        .btnLogin {
            width: 45%;
        }
    }
`;
