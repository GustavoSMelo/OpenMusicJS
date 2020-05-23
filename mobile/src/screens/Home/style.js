import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: ${(props) => props.theme.backgroundcolor};
    color: ${(props) => props.theme.color};
    flex: 1;
`;

export const ActionContainer = styled.View`
    width: 50%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const MusicContainer = styled.View`
    width: 100%;
    padding: 10px;
    align-items: center;
`;

export const Figure = styled.Image`
    width: 75%;
    height: 200px;
    border-radius: 10px;
`;

export const TextDark = styled.Text`
    color: #fff;
    margin: 2px;
    font-size: 20px;
    font-weight: bold;
`;

export const ButtonListen = styled.TouchableOpacity`
    background-color: #eb5bf5;
    padding: 10px;
    border-radius: 5px;
`;
