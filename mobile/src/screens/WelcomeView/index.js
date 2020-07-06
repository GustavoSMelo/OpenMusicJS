import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    View,
    KeyboardAvoidingView,
    ToastAndroid,
    AsyncStorage,
} from 'react-native';
import {
    Container,
    LogoContainer,
    TextTitle,
    LoginButton,
    LoginText,
    LoginField,
    TextRegister,
    TouchRegister,
} from './style';
import Logo from '../../../assets/logo.png';
import api from '../../api/api';
import { useNavigation } from '@react-navigation/native';

function Welcome() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    async function ThemeConfiguration() {
        const theme = await AsyncStorage.getItem('Theme');

        if (!theme || theme === null || theme === undefined || theme === '') {
            await AsyncStorage.setItem('Theme', 'DarkMode');
        }
    }

    useEffect(() => {
        ThemeConfiguration();
    }, []);

    async function handlerLoginPress() {
        if (
            email === null ||
            email === undefined ||
            email === '' ||
            password === null ||
            password === undefined ||
            password === ''
        ) {
            return ToastAndroid.show(
                'To continue, please complete all the fields',
                10,
                ToastAndroid.BOTTOM
            );
        }

        try {
            const response = await api.post('/login/user', {
                email,
                pass: password,
            });

            console.log(response.data);

            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('email', response.data.user.email);

            navigation.navigate('TabRoute');
        } catch (err) {
            return ToastAndroid.show('User not founded', 10);
        }
    }

    return (
        <>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={'#303030'}
                hidden={true}
            />
            <Container>
                <View>
                    <LogoContainer source={Logo} resizeMode='contain' />
                </View>
                <TextTitle>
                    Welcome to OpenMusicJS
                    {'\n'}
                </TextTitle>

                <KeyboardAvoidingView enabled={true}>
                    <LoginField
                        placeholder='Place your email here '
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <LoginField
                        secureTextEntry={true}
                        placeholder='Place your password here '
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <LoginButton onPress={() => handlerLoginPress()}>
                        <LoginText>Login</LoginText>
                    </LoginButton>
                    <TouchRegister
                        onPress={() => navigation.navigate('Register')}
                    >
                        <TextRegister>I don't have account yet </TextRegister>
                    </TouchRegister>
                </KeyboardAvoidingView>
            </Container>
        </>
    );
}

export default Welcome;
