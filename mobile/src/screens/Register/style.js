import styled from 'styled-components/native';

export const Form = styled.View`
    background-color: #303030;
    flex: 1;
    align-items: center;
    color: #fff;
    flex-direction: column;
`;

export const ContainerForm = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    text-align: center;
    margin-bottom: 5px;
`;

export const TextField = styled.TextInput`
    background-color: #303030;
    color: #fff;
    border-bottom-color: #e85ace;
    border-bottom-width: 3px;
    elevation: 3;
    width: 75%;
    padding: 5px;
    font-size: 18px;
    font-weight: bold;
`;

export const TextTitleImage = styled.Text`
    margin: 20px;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
`;

export const Submit = styled.TouchableOpacity`
    background-color: #e85ace;
    padding: 20px;
    border-radius: 5px;
    margin: 20px;
    align-items: center;
    text-align: center;
`;

export const SubmitText = styled.Text`
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`;

export const Header = styled.View`
    padding: 30px;
    text-align: left;
    align-items: flex-start !important;
    background-color: #303030;
`;
