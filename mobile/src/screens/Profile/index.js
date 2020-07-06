import React, { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/FontAwesome';
import api from '../../api/api';
import {
    Container,
    Figure,
    CustomText,
    ButtonControlls,
    DeleteButton,
    EditButton,
    ExitButton,
} from './style';
import DarkTheme from '../../styles/themes/dark';
import LightTheme from '../../styles/themes/light';
import URL from '../../config/url.config';

function Profile() {
    const [userInfo, setUserInfo] = useState({});
    const [Theme, setTheme] = useState('');
    const navigation = useNavigation();

    async function getDataByAPI() {
        try {
            const responseTheme = await AsyncStorage.getItem('Theme');
            const token = await AsyncStorage.getItem('token');
            const response = await api.get('/user/show', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            await setUserInfo(response.data.user);
            await setTheme(responseTheme);
        } catch (err) {
            navigation.navigate('Welcome');
        }
    }

    async function handlerButtonExit() {
        await AsyncStorage.setItem('token', '');
        await AsyncStorage.setItem('email', '');
        navigation.navigate('Welcome');
    }

    useEffect(() => {
        getDataByAPI();
    }, []);

    function Layout() {
        if (Theme === 'DarkMode') {
            return (
                <Container theme={DarkTheme}>
                    <Figure
                        source={{
                            uri: `${URL}/img/${userInfo.avatar}`,
                        }}
                        resizeMode='stretch'
                    />
                    <CustomText theme={DarkTheme}>
                        <Icons name='user' size={26} /> {userInfo.name}
                        {'\n\n'}
                        <Icons name='envelope-o' size={26} /> {userInfo.email}
                    </CustomText>

                    <ButtonControlls>
                        <ExitButton onPress={() => handlerButtonExit()}>
                            <Icons name='sign-out' size={26} />
                        </ExitButton>
                        <EditButton
                            onPress={() =>
                                navigation.navigate('UpdateAccount', {
                                    email: userInfo.email,
                                    name: userInfo.name,
                                })
                            }
                        >
                            <Icons name='edit' size={26} />
                        </EditButton>
                        <DeleteButton
                            onPress={() => navigation.navigate('DeleteAccount')}
                        >
                            <Icons name='trash' size={26} />
                        </DeleteButton>
                    </ButtonControlls>
                </Container>
            );
        }

        return <></>;
    }

    return Layout();
}

export default Profile;
