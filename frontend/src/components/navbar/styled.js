import styled from 'styled-components';

export const Container = styled.header`
    background-color: #101010;
    color: #404040;
    width: 100%;
    display: flex;
    height: 75px;
    flex-direction: row;
    justify-content: space-around;
    padding: 15px;

    img {
        width: 50px;
        height: 50px;
    }

    .link {
        text-decoration: none;
        color: #404040;
        margin: 15px;
        font-weight: bold;
        font-size: 20pt;
        transition: 0.5s;
    }

    .link:hover {
        color: #c200ff;
        transition: 0.5s;
    }

    @media screen and (max-width: 520px) {
        span {
            display: none;
        }

        .link {
            margin: none;
        }
    }
`;
