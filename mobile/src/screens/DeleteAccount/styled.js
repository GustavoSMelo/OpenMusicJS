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

export const PasswordInput = styled.TextInput`
    padding: 5px;
    border-radius: 5px;
    border-bottom-color: #e848e1;
    border-bottom-width: 2px;
    font-size: 16px;
    color: ${props => props.theme.color};
`;

export const CustomText = styled.TextInput`
    color: ${props => props.theme.color};
    font-size: 20px;
    text-align: center;
`;

export const DeleteButton = styled.TouchableOpacity`
    background-color: #D4191B;
    padding: 20px;
    border-radius: 40px;
    margin: 5px;
`;
