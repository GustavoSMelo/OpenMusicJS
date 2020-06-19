import styled from 'styled-components/native';

// DarkMode

export const ContainerDark = styled.View`
	background-color: #303030;
	flex: 1;
	align-items: center;
`;

export const HeaderDark = styled.View`
	padding: 15px;
	background-color: #303030;
`;

// LightMode

export const ContainerLight = styled.View`
	flex: 1;
	background-color: #fafafa;
`;

export const HeaderLight = styled.View`
	padding: 15px;
	background-color: #fafafa;
`;

// without theme

export const Figure = styled.Image`
	border-radius: 5px;
	margin: 15px;
	width: 85%;
	height: 40%;
`
export const NameMusic = styled.Text`
	color: ${props => props.theme.color};
	font-size: 26px;
	text-transform: capitalize;
`;

export const Control = styled.View`
	padding: 15px;
	flex-direction:row;
	justify-content:space-evenly;
	background-color: ${props => props.theme.backgroundcolor};
`;

export const StatusMusicText = styled.Text`
	color: ${props => props.theme.color};
	font-size: 26px;
	text-align: center;
`;
