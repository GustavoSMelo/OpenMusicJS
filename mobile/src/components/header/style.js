import styled from 'styled-components/native';

export const Navigation = styled.View`
    background-color: ${(props) => props.backgroundcolor};
    color: ${(props) => props.color};
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
`;

export const Figure = styled.Image`
    width: 30px;
    height: 30px;
`;
