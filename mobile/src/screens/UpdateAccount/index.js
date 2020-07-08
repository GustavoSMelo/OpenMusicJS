import React, { useState, useEffect } from 'react';
import {
    AsyncStorage,
    TouchableOpacity,
    Text,
    ToastAndroid,
    Image,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/FontAwesome';
import Icons2 from 'react-native-vector-icons/Ionicons';
import api from '../../api/api';
import {
    ButtonUpdate,
    Container,
    Header,
    Input,
    RowView,
    TextCustom,
} from './style';
import DarkMode from '../../styles/themes/dark';
import LightMode from '../../styles/themes/light';

function UpdateAccount(props) {
    const [token, setToken] = useState('');
    const [Theme, setTheme] = useState('');
    const [name, setName] = useState(props.route.params.name);
    const [email, setEmail] = useState(props.route.params.email);
    const [pass, setPass] = useState('');
    const [oldpass, setOldPass] = useState('');
    const [avatar, setAvatar] = useState({});
    const navigation = useNavigation();

    async function getTheme() {
        const response = await AsyncStorage.getItem('Theme');
        setTheme(response);
    }

    async function getToken() {
        const response = await AsyncStorage.getItem('token');
        setToken(response);
    }

    async function getPermissionUser() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status !== 'granted') {
            ToastAndroid.show(
                'To update account be completed, \nyou need to give this permission for us ',
                5
            );
        }
    }

    async function handlerGetImage() {
        try {
            const img = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!img.cancelled) {
                await setAvatar(img);
            } else {
                ToastAndroid.show(
                    'Error in get your avatar, please, try again ',
                    5
                );
            }
        } catch (err) {
            console.log(err);
            navigation.navigate('Welcome');
        }
    }

    async function handlerUpdateAccount() {
        try {
            const fd = new FormData();
            fd.append('name', name);
            fd.append('newemail', email);
            fd.append('pass', pass);
            fd.append('oldpass', oldpass);
            fd.append('avatar', {
                uri: avatar.uri,
                type: 'image/jpg',
                name: 'user_avatar.jpg',
            });

            await api.put('/user', fd, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            ToastAndroid.show('User updated with success ', 5);
            await AsyncStorage.setItem('token', '');
            await AsyncStorage.setItem('email', '');
            navigation.navigate('Welcome');
        } catch (err) {
            console.log(err);
            ToastAndroid.show('Error', 5);
            navigation.navigate('Welcome');
        }
    }

    useEffect(() => {
        getPermissionUser();
        getTheme();
        getToken();
    }, []);

    function Layout() {
        if (Theme === 'DarkMode') {
            return (
                <>
                    <Header theme={DarkMode}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icons name='arrow-left' size={32} color={'#fff'} />
                        </TouchableOpacity>
                    </Header>
                    <Container theme={DarkMode}>
                        <RowView>
                            <Icons
                                name='user'
                                size={26}
                                color={'#fff'}
                                style={{ marginRight: 5 }}
                            />
                            <Input
                                value={name}
                                placeholder='Insert your name here... '
                                onChangeText={setName}
                                theme={DarkMode}
                            />
                        </RowView>

                        <RowView>
                            <Icons
                                name='envelope-o'
                                style={{ marginRight: 5 }}
                                size={20}
                                color={'#fff'}
                            />
                            <Input
                                value={email}
                                placeholder='Insert your email here... '
                                onChangeText={setEmail}
                                theme={DarkMode}
                            />
                        </RowView>

                        <RowView>
                            <Icons2
                                name='ios-key'
                                size={26}
                                color={'#fff'}
                                style={{ marginRight: 5 }}
                            />
                            <Input
                                value={pass}
                                placeholder='Insert your password here... '
                                onChangeText={setPass}
                                theme={DarkMode}
                                secureTextEntry={true}
                            />
                        </RowView>

                        <RowView>
                            <Icons
                                name='key'
                                size={20}
                                color={'#fff'}
                                style={{ marginRight: 5 }}
                            />
                            <Input
                                value={oldpass}
                                placeholder='Insert your old password here... '
                                onChangeText={setOldPass}
                                theme={DarkMode}
                                secureTextEntry={true}
                            />
                        </RowView>

                        <RowView>
                            <TextCustom theme={DarkMode}>
                                Select your avatar:{' '}
                            </TextCustom>
                            <TouchableOpacity onPress={() => handlerGetImage()}>
                                <Icons
                                    name='photo'
                                    size={32}
                                    color={'#fff'}
                                    style={{ margin: 5 }}
                                />
                            </TouchableOpacity>
                        </RowView>

                        {avatar ? (
                            <Image
                                source={{ uri: avatar.uri }}
                                style={{ width: '75%', height: '20%' }}
                                resizeMode='contain'
                            />
                        ) : (
                            <></>
                        )}

                        <ButtonUpdate onPress={() => handlerUpdateAccount()}>
                            <Text>
                                <Icons name='edit' size={26} /> Update
                            </Text>
                        </ButtonUpdate>
                    </Container>
                </>
            );
        }

        return (
            <>
                <Header theme={LightMode}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icons name='arrow-left' size={32} color={'#fff'} />
                    </TouchableOpacity>
                </Header>
                <Container theme={LightMode}>
                    <RowView>
                        <Icons
                            name='user'
                            size={26}
                            color={'#fff'}
                            style={{ marginRight: 5 }}
                        />
                        <Input
                            value={name}
                            placeholder='Insert your name here... '
                            onChangeText={setName}
                            theme={LightMode}
                        />
                    </RowView>

                    <RowView>
                        <Icons
                            name='envelope-o'
                            style={{ marginRight: 5 }}
                            size={20}
                            color={'#fff'}
                        />
                        <Input
                            value={email}
                            placeholder='Insert your email here... '
                            onChangeText={setEmail}
                            theme={LightMode}
                        />
                    </RowView>

                    <RowView>
                        <Icons2
                            name='ios-key'
                            size={26}
                            color={'#fff'}
                            style={{ marginRight: 5 }}
                        />
                        <Input
                            value={pass}
                            placeholder='Insert your password here... '
                            onChangeText={setPass}
                            theme={LightMode}
                            secureTextEntry={true}
                        />
                    </RowView>

                    <RowView>
                        <Icons
                            name='key'
                            size={20}
                            color={'#fff'}
                            style={{ marginRight: 5 }}
                        />
                        <Input
                            value={oldpass}
                            placeholder='Insert your old password here... '
                            onChangeText={setOldPass}
                            theme={LightMode}
                            secureTextEntry={true}
                        />
                    </RowView>

                    <RowView>
                        <TextCustom theme={LightMode}>
                            Select your avatar:{' '}
                        </TextCustom>
                        <TouchableOpacity onPress={() => handlerGetImage()}>
                            <Icons
                                name='photo'
                                size={32}
                                color={'#fff'}
                                style={{ margin: 5 }}
                            />
                        </TouchableOpacity>
                    </RowView>

                    {avatar ? (
                        <Image
                            source={{ uri: avatar.uri }}
                            style={{ width: '75%', height: '20%' }}
                            resizeMode='contain'
                        />
                    ) : (
                        <></>
                    )}

                    <ButtonUpdate onPress={() => handlerUpdateAccount()}>
                        <Text>
                            <Icons name='edit' size={26} /> Update
                        </Text>
                    </ButtonUpdate>
                </Container>
            </>
        );
    }

    return Layout();
}

export default UpdateAccount;
