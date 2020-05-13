import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #303030;
    color: #fff;
    flex: 1;
    align-items: center;
    text-align: center;
`;

export const LogoContainer = styled.Image`
    width: 150px;
    height: 150px;
`;

export const TextTitle = styled.Text`
    color: #fff;
    font-size: 20px;
    font-weight: bold;
`;

export const LoginButton = styled.TouchableOpacity`
    background-color: #e848e1;
    border-radius: 5px;
    elevation: 2;
    border: none;
    align-items: center;
    width: 100px;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 20px;
`;

export const LoginText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    padding: 15px;
`;

export const LoginField = styled.TextInput`
    width: 300px;
    background-color: #303030;
    elevation: 3;
    border-bottom-width: 3px;
    border-bottom-color: #e848e1;
    padding: 5px;
    margin: 20px;
    font-size: 18px;
    color: #fff;
    margin-top: 35px;
`;

export const TouchRegister = styled.TouchableOpacity`
    background-color: #00000000;
`;

export const TextRegister = styled.Text`
    color: #e848e1;
    margin: 20px;
    margin-top: 0px;
    font-size: 14px;
    font-weight: bold;
    padding: 5px;
`;
