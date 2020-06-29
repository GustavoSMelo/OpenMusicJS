import styled from 'styled-components/native';

export const Header = styled.View`
    background-color: ${(props) => props.theme.backgroundcolor};
    padding: 20px;
`;

export const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.backgroundcolor};
    padding: 10px;
    flex: 1;
    flex-direction: column;
`;

export const ArtistSection = styled.View`
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
`;

export const Figure = styled.Image`
    border-radius: 5px;
    width: 90%;
    height: 150px;
`;

export const TitleName = styled.Text`
    padding-top: 10px;
    padding-bottom: 10px;
    color: ${(props) => props.theme.color};
    font-size: 24px;
`;

export const MusicSection = styled.View`
    width: 90%;
    padding-right: 15px;
    elevation: 2;
    height: 100px;
    flex-direction: row;
    margin-top: 20px;
`;

export const MusicImage = styled.Image`
    width: 40%;
    border-radius: 10px;
    height: 100%;
`;

export const MusicButtons = styled.View`
    width: 60%;
    padding: 10px;
    flex-direction: column;
`;

export const TextMusic = styled.Text`
    color: ${(props) => props.theme.color};
    font-size: 18px;
`;

export const ListenButton = styled.TouchableOpacity`
    background-color: #e848e1;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    justify-content: center;
    align-items: center;
`;

export const RowContainer = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`;
