import styled from 'styled-components/native';

export const Header = styled.View`
    background-color: ${props => props.theme.backgroundcolor};
    padding: 10px;
`;

export const Container = styled.View`
    background-color: ${props => props.theme.backgroundcolor};
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 15px;
`;

export const Form = styled.View`
    flex-direction: row;
    justify-content: space-around;
`;

export const Input = styled.TextInput`
    padding: 10px;
    border-radius: 5px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom-style: solid;
    border-bottom-color: '#e848e1';
    border-bottom-width: 2px;

`;

export const DeleteButton = styled.TouchableOpacity`
    background-color: #D4191B;
    padding: 20px;
    border-radius: 40px;
    margin: 5px;
`;
