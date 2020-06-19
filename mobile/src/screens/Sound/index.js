import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import { 
	HeaderDark,
	HeaderLight,
	ContainerDark,
	ContainerLight, 
	Figure,
	NameMusic, 
	Control,
	StatusMusicText } from './style';
import Icons from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import getTheme from '../../utils/getTheme';
import DarkMode from '../../styles/themes/dark';
import LightMode from '../../styles/themes/light';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Audio } from 'expo-av'

export default function Sound(props) {
	const [theme, setTheme] = useState('');
	const [music, setMusic] = useState(Object);
	const [itsLoaded, setItsLoaded] = useState(false);
	const navigation = useNavigation();
	const [statusMusic, setStatusMusic] = useState(<></>);

	async function getThemeStorage(){
		try{
			const response = await getTheme();
			setTheme(response);
		}catch(err){
			setTheme('LightMode');
		}
	}

	useEffect(() => {
		setMusic(new Audio.Sound());
		getThemeStorage();
	}, []);

	async function handlerGoToBack(){
		await handlerMusic('stopAndUnloaded');

		return navigation.goBack();
	}

	async function handlerMusic(toPlay){
		
		if(!itsLoaded){
			await music.loadAsync({uri: `http://192.168.0.100:3333/music/${props.route.params.sound}`});
			await setItsLoaded(true);
			await music.setIsLoopingAsync(true);
		}
		//await music.loadAsync({uri: `http://192.168.0.104:3333/music/${props.route.params.sound}`});

		if(toPlay === 'play'){
			await music.playAsync();

			if(theme === 'DarkMode'){
				await setStatusMusic
				(
					<StatusMusicText theme={DarkMode}>
						<Icon name='hand-peace-o' color={'#e848e1'} size={32}/> 
						{' '} Now the music is playing... 
					</StatusMusicText>
				)
			}else{
				await setStatusMusic
				(
					<StatusMusicText theme={LightMode}>
						<Icon name='hand-peace-o' color={'#e848e1'} size={32}/> 
						{' '} Now the music is playing... 
					</StatusMusicText>
				)
			}

		}else if(toPlay === 'pause') {
			await music.pauseAsync();

			if(theme === 'DarkMode'){
				await setStatusMusic
				(
					<StatusMusicText theme={DarkMode}>
						<Icon name='hand-stop-o' color={'#e848e1'} size={32}/> 
						{' '} Now the music is pause 
					</StatusMusicText>
				)
			}else{
				await setStatusMusic
				(
					<StatusMusicText theme={LightMode}>
						<Icon name='hand-stop-o' color={'#e848e1'} size={32}/> 
						{' '} Now the music is pause 
					</StatusMusicText>
				)
			}
			
		}else if(toPlay === 'stop'){
			await music.stopAsync();

			if(theme === 'DarkMode'){
				await setStatusMusic
				(
					<StatusMusicText theme={DarkMode}>
						<Icon name='hand-rock-o' color={'#e848e1'} size={32}/> 
						{' '} Now the music is stop 
					</StatusMusicText>
				)
			}else{
				await setStatusMusic
				(
					<StatusMusicText theme={LightMode}>
						<Icon name='hand-rock-o' color={'#e848e1'} size={32}/> 
						{' '} Now the music is stop 
					</StatusMusicText>
				)
			}
		}else if(toPlay === 'stopAndUnloaded'){
			await music.stopAsync();
			await music.unloadAsync();
			await setItsLoaded(false);
		}
	}


	function Layout() {
		if (theme === 'DarkMode') {
			return (
			<>
				<HeaderDark>
					<TouchableOpacity onPress={() => handlerGoToBack()}>
						<Icons name='arrow-left'
							size={34}
							color={'#fff'}
							style={{margin: 10}}/>
					</TouchableOpacity>
				</HeaderDark>
				<ContainerDark>
					
					<Figure source={{ uri: `http://192.168.0.100:3333/img/${props.route.params.image}` }} 
						resizeMode="stretch" />
					<NameMusic theme={DarkMode}>
						{props.route.params.name}
					</NameMusic>
					<Control theme={DarkMode}>

						<TouchableOpacity onPress={() => handlerMusic('pause')}>
							<Icon name="pause" 
							size={36} 
							color={'#fff'}
							style={{margin: 20}}/>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => handlerMusic('play')}>
							<Icon name="play" 
							size={36} 
							color={'#fff'}
							style={{margin: 20}}/>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => handlerMusic('stop')}>
							<Icon name="stop" 
							size={36} 
							color={'#fff'}
							style={{margin: 20}}/>
						</TouchableOpacity>
					</Control>
					{statusMusic}
				</ContainerDark>
			</>
			)
		}

		return (
			<>
				<ContainerLight>
					<HeaderLight>
						<TouchableOpacity onPress={() => handlerGoToBack()}>
							<Icons name='arrow-left'
							size={34}
							color={'#101010'}
							style={{margin: 10}}/>
						</TouchableOpacity>
						<Figure source={{ uri: `http://192.168.0.100:3333/img/${props.route.params.image}` }} 
						resizeMode="stretch" />
						<NameMusic theme={LightMode}>
							{props.route.params.name}
						</NameMusic>
						<Control theme={LightMode}>
							<TouchableOpacity onPress={() => handlerMusic('pause')}>
								<Icon name="pause" 
								size={36} 
								color={'#000'}
								style={{margin: 20}}/>
							</TouchableOpacity>

							<TouchableOpacity onPress={() => handlerMusic('play')}>
								<Icon name="play" 
								size={36} 
								color={'#000'}
								style={{margin: 20}}/>
							</TouchableOpacity>

							<TouchableOpacity onPress={() => handlerMusic('stop')}>
								<Icon name="stop" 
								size={36} 
								color={'#fff'}
								style={{margin: 20}}/>
							</TouchableOpacity>
						</Control>

						{statusMusic}
					</HeaderLight>
				</ContainerLight>
			</>
		)
	}

	return Layout();
}
