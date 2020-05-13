import React, { useState, useEffect } from 'react';
import { ToastAndroid, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import api from '../../api/api';
import {
    Form,
    TextField,
    ContainerForm,
    Thumb,
    TextTitleImage,
    Submit,
    SubmitText,
} from './style';
import Icons from 'react-native-vector-icons/FontAwesome';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [avatar, setAvatar] = useState({});

    useEffect(() => {
        getPermissionUser();
    }, []);

    async function getPermissionUser() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status !== 'granted') {
            return ToastAndroid.show(
                'To register be completed, you need to give this permission for us '
            );
        }
    }

    async function handlerGetImageUser() {
        try {
            const img = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!img.cancelled) {
                await setAvatar(img);
            }
        } catch (err) {
            return ToastAndroid.show(
                'To register be completed, insert some image ',
                10
            );
        }
    }

    async function handlerButtonPressed() {
        if (
            name === null ||
            name === '' ||
            email === null ||
            email === '' ||
            pass === null ||
            pass === '' ||
            avatar === null ||
            avatar === ''
        ) {
            return ToastAndroid.show(
                'To continue with register, complete all the fields',
                10
            );
        }
        try {
            const fd = new FormData();
            fd.append('name', name);
            fd.append('email', email);
            fd.append('pass', pass);
            fd.append('avatar', avatar);
            const response = await api.post('/user', fd);
            ToastAndroid.show('User created with success! ', 10);
        } catch (err) {
            console.log(err);
            ToastAndroid.show('Error, user already created! ', 10);
        }
    }

    return (
        <Form>
            <ContainerForm>
                <Icons
                    name="user"
                    size={30}
                    color="#fff"
                    style={{ margin: '5%' }}
                />
                <TextField
                    placeholder="Insert your name here "
                    value={name}
                    onChangeText={(e) => setName(e)}
                />
            </ContainerForm>
            <ContainerForm>
                <Icons
                    name="envelope-square"
                    size={30}
                    color="#fff"
                    style={{ margin: '5%' }}
                />
                <TextField
                    placeholder="Insert your email here "
                    value={email}
                    onChangeText={(e) => setEmail(e)}
                />
            </ContainerForm>
            <ContainerForm>
                <Icons
                    name="key"
                    size={30}
                    color="#fff"
                    style={{ margin: '5%' }}
                />
                <TextField
                    secureTextEntry={true}
                    placeholder="Insert your password here "
                    value={pass}
                    onChangeText={(e) => setPass(e)}
                />
            </ContainerForm>

            <ContainerForm>
                <TextTitleImage>Select some image: </TextTitleImage>
                <TouchableOpacity>
                    <Icons
                        name="photo"
                        size={30}
                        color="#fff"
                        style={{ margin: '5%' }}
                        onPress={() => handlerGetImageUser()}
                    />
                </TouchableOpacity>
            </ContainerForm>
            {avatar ? (
                <Thumb
                    source={{ uri: avatar.uri }}
                    style={{ width: '75%', height: '20%' }}
                    resizeMode="contain"
                />
            ) : (
                console.log(avatar)
            )}
            <Submit onPress={() => handlerButtonPressed()}>
                <SubmitText>Register</SubmitText>
            </Submit>
        </Form>
    );
}

export default Register;
