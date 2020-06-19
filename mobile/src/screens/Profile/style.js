import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: ${props => props.theme.backgroundcolor};
    flex: 1;
    align-items: center;
`;

export const Figure = styled.Image`
    width: 50%;
    height: 25%;
    border-radius: 5px;
    margin: 15px;
`;

export const CustomText = styled.Text`
    color: ${props => props.theme.color};
    font-size: 26px;
    text-align: center;
`;

export const ButtonControlls = styled.View`
    flex-direction:row;
    align-items: center;
    justify-content: space-evenly;
    margin: 20px;
`;

export const ExitButton = styled.TouchableOpacity`
    background-color: #3BC722;
    padding: 20px;
    border-radius: 40px;
    margin: 5px;
`;

export const EditButton = styled.TouchableOpacity`
    background-color: #D4EC26;
    padding: 20px;
    border-radius: 40px;
    margin: 5px;
`;

export const DeleteButton = styled.TouchableOpacity`
    background-color: #D4191B;
    padding: 20px;
    border-radius: 40px;
    margin: 5px;
`;

