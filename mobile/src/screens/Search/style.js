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

export const Container = styled.ScrollView`
    flex: 1;
    flex-direction: column;
    background-color: ${(props) => props.theme.backgroundcolor};
    padding: 5px;
`;

export const SectionLabel = styled.Text`
    color: ${(props) => props.theme.color};
    font-size: 26px;
    font-weight: bold;
    margin: 30px;
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

export const CustomButton = styled.TouchableOpacity`
    background-color: #e848e1;
    padding: 10px;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    width: 100px;
    height: 50px;
`;

export const Cards = styled.View`
    flex-direction: row;
    width: 90%;
    elevation: 4;
    margin-bottom: 20px;
    padding-left: 20px;
    padding-right: 15px;
`;

export const Figure = styled.View`
    width: 50%;
    border-radius: 10px;
    margin-right: 10px;
`;

export const CardImage = styled.Image`
    width: 100%;
    height: 100px;
    margin-right: 10px;
    border-radius: 5px;
`;

export const CardInfo = styled.View`
    width: 50%;
    height: 100%;
    padding: 5px;
`;

export const TextInfo = styled.Text`
    color: ${(props) => props.theme.color};
    font-size: 18px;
    text-transform: capitalize;
    font-weight: bold;
`;
