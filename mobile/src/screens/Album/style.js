import styled from 'styled-components/native';

export const Header = styled.View`
    background-color: ${(props) => props.theme.backgroundcolor};
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
`;

export const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.backgroundcolor};
    padding: 20px;
    flex: 1;
    flex-direction: column;
`;

export const ImageAlbum = styled.Image`
    width: 90%;
    border-radius: 5px;
    margin: 10px;
    height: 200px;
`;

export const TextAlbum = styled.Text`
    font-size: 18px;
    color: ${(props) => props.theme.color};
    text-align: center;
`;

export const TextDescription = styled.Text`
    color: #707070;
    font-size: 14px;
    text-align: center;
`;

export const CardMusic = styled.View`
    margin-top: 10px;
    width: 95%;
    flex-direction: row;
    height: 100px;
    border-radius: 5px;
    elevation: 1;
`;

export const Figure = styled.View`
    width: 45%;
    margin-right: 10px;
`;

export const MusicImage = styled.Image`
    width: 100%;
    height: 100%;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
`;

export const CardInfo = styled.View`
    width: 55%;
    padding: 5px;
`;

export const InfoText = styled.Text`
    font-size: 16px;
    color: ${(props) => props.theme.color};
`;

export const RowView = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const CustomButton = styled.TouchableOpacity`
    background-color: #e848e1;
    padding: 10px;
    text-align: center;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-right: 15px;
`;
