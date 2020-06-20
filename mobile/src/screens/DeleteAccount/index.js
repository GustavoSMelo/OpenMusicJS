import React, { useState, useEffect } from 'react';
import { Container,
    DeleteButton,
    Header,
    Form,
    PasswordInput,
    CustomText } from './styled';
import { AsyncStorage, ToastAndroid, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import api from '../../api/api';
import { useNavigation } from '@react-navigation/native';
import DarkTheme from '../../styles/themes/dark';
import LightTheme from '../../styles/themes/light';

function DeleteAccount() {
	const [Theme, setTheme] = useState('');
	const [pass, setPass] = useState('');
	const navigation = useNavigation();

    async function getTheme() {
		const response = await AsyncStorage.getItem('Theme');
		await setTheme(response);
	}

	async function handlerDeleteAccount() {
		if (pass === null || pass === '' || pass === undefined) {
			return ToastAndroid.show('Error, any password inserted ', 5);
		}

		try {
			const token = await AsyncStorage.getItem('token');
			await api.delete('/user', { headers: {
				authorization: `Bearer ${token}`,
				pass,
			}});

			await AsyncStorage.setItem('token', '');
			await AsyncStorage.setItem('email', '');

			ToastAndroid.show('User deleted with sucess ', 5);

			return navigation.navigate('Welcome');
		} catch (err) {
			return ToastAndroid.show('Error, you send a password wrong ', 5);
		}
	}

    useEffect(() => {
		getTheme();
    }, []);

    function Layout() {
		if(Theme === 'DarkMode') {
			return (<>
				<Header theme={DarkTheme}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icons name='arrow-left' size={26} color={'#fff'} />
                    </TouchableOpacity>
                </Header>
				<Container theme={DarkTheme}>
					<CustomText theme={DarkTheme}>Are you have sure that</CustomText>
					<CustomText theme={DarkTheme}>you want delete your account ? </CustomText>
					<Form>
						<PasswordInput placeholder='Insert your password here... '
							onChangeText={setPass}
							value={pass}
							secureTextEntry={true}
							theme={DarkTheme}
						/>
						<DeleteButton onPress={() => handlerDeleteAccount()}>
							<Icons name='trash' size={26} />
						</DeleteButton>
					</Form>
				</Container>
			</>)
		}
        return (<>
            <Header theme={LightTheme}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icons name='arrow-left' size={26} color={'#fff'} />
                </TouchableOpacity>
            </Header>
			<Container theme={LightTheme}>
                <CustomText theme={LightTheme}>Are you have sure that</CustomText>
				<CustomText theme={LightTheme}>you want delete your account ? </CustomText>
				<Form>
					<PasswordInput placeholder='Insert your password here... '
							onChangeText={setPass}
							value={pass}
							secureTextEntry={true}
							theme={LightTheme}
						/>
					<DeleteButton onPress={() => handlerDeleteAccount()}>
						<Icons name='trash' size={26} />
					</DeleteButton>
				</Form>
            </Container>
        </>);
    }
    return Layout();
}

export default DeleteAccount;
