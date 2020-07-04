import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.backgroundcolor};
    padding: 20px;
    flex: 1;
    flex-direction: column;
`;

export const Title = styled.Text`
    color: ${(props) => props.theme.color};
    font-size: 22px;
    font-weight: bold;
`;

export const Card = styled.View`
    width: 95%;
    elevation: 1;
    border-radius: 5px;
    flex-direction: row;
    margin-top: 10px;
    height: 120px;
`;

export const CardImage = styled.Image`
    width: 50%;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
`;

export const CardInfo = styled.View`
    padding: 10px;
    flex-direction: column;
`;

export const InfoText = styled.Text`
    color: ${(props) => props.theme.color};
    font-size: 16px;
`;

export const CustomButton = styled.TouchableOpacity`
    background-color: #e848e1;
    padding: 10px;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-right: 10px;
`;

export const RowContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;
