import styled from 'styled-components';

export const Container = styled.main`
    background: linear-gradient(to bottom, #fff6f3, #aaaca8);
    display: flex;
    flex-direction: column;
    align-items: center;
    section {
        display: flex;
        background-color: #60606085;
        color: #fff;
        width: 60%;
        margin-top: 35px;
        padding: 15px;
        border-radius: 5px;
        transition: 0.3s;
        flex-direction: row;
    }

    h1 {
        font-size: 24pt;
        font-weight: bold;
        margin-top: 60px;
    }

    section:hover {
        background-color: #60606099;
        box-shadow: 2px 2px 6px #101010;
        transition: 0.3s;
    }
`;
