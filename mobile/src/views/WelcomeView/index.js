import React, { useState } from 'react';
import { StatusBar, View, KeyboardAvoidingView, Text } from 'react-native';
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

function Welcome() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <StatusBar barStyle={'light-content'} backgroundColor={'#303030'} />
            <Container>
                <View>
                    <LogoContainer source={Logo} resizeMode="contain" />
                </View>
                <TextTitle>
                    Welcome to OpenMusicJS
                    {'\n'}
                </TextTitle>

                <KeyboardAvoidingView enabled={true}>
                    <LoginField
                        placeholder="Place your email here "
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <LoginField
                        secureTextEntry={true}
                        placeholder="Place your password here "
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <LoginButton>
                        <LoginText>Login</LoginText>
                    </LoginButton>
                    <TouchRegister>
                        <TextRegister>I don't have account yet</TextRegister>
                    </TouchRegister>
                </KeyboardAvoidingView>
            </Container>
        </>
    );
}

export default Welcome;
