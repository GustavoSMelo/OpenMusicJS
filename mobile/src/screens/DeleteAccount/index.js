import React, { useState, useEffect } from 'react';
import { Container,
    DeleteButton,
    Header,
    Form,
    Input } from './styled';
import { AsyncStorage } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';

function DeleteAccount() {
	const [Theme, setTheme] = useState('');
	const [pass, setPass] = useState('');

    async function getTheme() {
		const response = await AsyncStorage.getItem('theme');
		await setTheme(response);
    }

    useEffect(() => {
		getTheme();
    }, []);

    function Layout() {
		if(Theme === 'DarkMode') {
			return (<>
				<Header></Header>
				<Container>
					<Form>
						<Input placeholder='Insert your password here... '
						onChangeText={setPass}
						value={pass}/>
						<DeleteButton>
							<Icons name='trash' size={26} />
						</DeleteButton>
					</Form>
				</Container>
			</>)
		}
		return <></>;
    }

    return Layout;
}

export default DeleteAccount;
