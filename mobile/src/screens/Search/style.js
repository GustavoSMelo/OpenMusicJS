import styled from 'styled-components/native';

export const Header = styled.View`
    padding: 5px;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    background-color: ${(props) => props.theme.backgroundcolor};
    padding-bottom: 30px;
    padding-top: 10px;
`;

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    background-color: ${(props) => props.theme.backgroundcolor};
    padding: 5px;
    align-items: center;
`;

export const InputSearch = styled.TextInput`
    color: ${(props) => props.theme.color};
    padding: 5px;
    font-size: 16px;
    background-color: #00000000;
    border-bottom-width: 2px;
    border-bottom-color: #e848e1;
    width: 70%;
`;

export const ButtonSearch = styled.TouchableOpacity`
    background-color: #e848e1;
    padding: 15px;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
`;

export const Cards = styled.View`
    flex-direction: row;
    width: 90%;
    elevation: 4;
`;

export const Figure = styled.View`
    width: 40%;
    border-radius: 10px;
`;

export const CardImage = styled.Image`
    width: 100%;
    height: 100px;
`;

export const CardInfo = styled.View`
    width: 60%;
    height: 100%;
    padding: 5px;
`;

export const TextInfo = styled.TextInput`
    color: ${(props) => props.theme.color};
    font-size: 16px;
`;
