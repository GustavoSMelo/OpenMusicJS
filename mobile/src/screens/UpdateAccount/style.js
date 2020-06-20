import styled from 'styled-components/native';

export const Header = styled.View`
    padding: 20px;
    background-color: ${props => props.theme.backgroundcolor};
`;

export const Container = styled.View`
    background-color: ${props => props.theme.backgroundcolor};
    flex: 1;
    flex-direction: column;
    padding: 15px;
`;

export const Input = styled.TextInput`
    padding: 10px;
    font-size: 20px;
    color: ${props => props.theme.color};
    border-bottom-width: 2px;
    border-bottom-color: #e848e1;
    width: 85%;
    margin: 5px;
`;

export const ButtonUpdate = styled.TouchableOpacity`
    padding: 10px;
    align-items: center;
    justify-content: center;
    background-color: #D4EC26;
    margin: 30px;
    border-radius: 30px;
`;

export const RowView = styled.View`
    align-items: center;
    flex-direction: row;
`;

export const TextCustom = styled.Text`
    color: ${props => props.theme.color};
    font-size: 26px;
`;
