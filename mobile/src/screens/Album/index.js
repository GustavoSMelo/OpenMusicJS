import React, { useState, useEffect } from 'react';
import { AsyncStorage, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import getTheme from '../../utils/getTheme';
import api from '../../api/api';
import {
    CustomButton,
    CardInfo,
    Figure,
    Container,
    Header,
    MusicImage,
    CardMusic,
    ImageAlbum,
    InfoText,
    TextAlbum,
    TextDescription,
    RowView,
} from './style';

import DarkTheme from '../../styles/themes/dark';
import LightTheme from '../../styles/themes/light';
import URL from '../../config/url.config';

function Album(props) {
    const [theme, setTheme] = useState('');
    const [musics, setMusics] = useState([]);
    const [albumLiked, setAlbumLiked] = useState(false);
    const [likesMusics, setLikesMusics] = useState([]);
    const navigation = useNavigation();

    async function getThemeScreen() {
        const myTheme = await getTheme();

        await setTheme(myTheme);
    }

    async function getDataByAPI() {
        try {
            const token = await AsyncStorage.getItem('token');
            const responseMusics = await api.get('/musics', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseAlbumMusic = await api.post(
                '/album/music/unique',
                { albumID: props.route.params.idAlbum },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const musicsFiltred = responseMusics.data.allmusics.map((sound) => {
                const finded = responseAlbumMusic.data.infoAlbum.find(
                    (album) => album.music === sound.id
                );

                if (finded) {
                    return sound;
                }
            });

            await setMusics(musicsFiltred);
        } catch (err) {
            console.warn({ Error: err.response });
        }
    }

    async function getLikesByAPI() {
        const token = await AsyncStorage.getItem('token');
        const likesAlbuns = await api.post(
            '/users/albuns/show',
            { albumID: props.route.params.idAlbum },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (likesAlbuns.data.length <= 0) {
            await setAlbumLiked(false);
        } else {
            await setAlbumLiked(true);
        }

        const likesOfMusics = await api.get('/users/musics', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setLikesMusics(likesOfMusics.data);
    }

    async function addLikeAlbum() {
        const token = await AsyncStorage.getItem('token');
        try {
            await api.post(
                '/users/albuns',
                { album: props.route.params.idAlbum },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setAlbumLiked(true);
        } catch (err) {
            console.error(err);
        }
    }

    async function removeLikeAlbum() {
        const token = await AsyncStorage.getItem('token');
        try {
            await api.delete('/users/albuns', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    album: props.route.params.idAlbum,
                },
            });

            setAlbumLiked(false);
        } catch (err) {
            console.error(err);
        }
    }

    async function addLikeMusic(music) {
        const token = await AsyncStorage.getItem('token');

        await api.post(
            '/users/musics',
            { music },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    }

    async function removeLikeMusic(music) {
        const token = await AsyncStorage.getItem('token');

        await api.delete('/users/musics', {
            headers: {
                Authorization: `Bearer ${token}`,
                music,
            },
        });
    }

    useEffect(() => {
        getThemeScreen();
    }, []);

    useEffect(() => {
        getDataByAPI();
        getLikesByAPI();
        console.log(likesMusics);
    }, [likesMusics, albumLiked]);

    function Layout() {
        if (theme === 'DarkMode') {
            return (
                <>
                    <Header theme={DarkTheme}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icons name='arrow-left' size={26} color='#fff' />
                        </TouchableOpacity>
                        {albumLiked ? (
                            <TouchableOpacity onPress={() => removeLikeAlbum()}>
                                <Icons name='heart' size={26} color='#f00' />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => addLikeAlbum()}>
                                <Icons name='heart-o' size={26} color='#f00' />
                            </TouchableOpacity>
                        )}
                    </Header>
                    <Container theme={DarkTheme}>
                        <ImageAlbum
                            source={{
                                uri: `${URL}/img/${props.route.params.banner}`,
                            }}
                        />
                        <TextAlbum theme={DarkTheme}>
                            {props.route.params.name} |{' '}
                            {props.route.params.genre}
                        </TextAlbum>
                        <TextDescription>
                            {props.route.params.description}
                        </TextDescription>

                        {musics.length <= 0 ? (
                            <></>
                        ) : (
                            musics.map((music) => (
                                <CardMusic>
                                    <Figure>
                                        <MusicImage
                                            source={{
                                                uri: `${URL}/img/${music.banner_path}`,
                                            }}
                                        />
                                    </Figure>
                                    <CardInfo>
                                        <InfoText theme={DarkTheme}>
                                            {music.name} | {music.genre}
                                        </InfoText>
                                        <RowView>
                                            <CustomButton
                                                onPress={() =>
                                                    navigation.navigate(
                                                        'Sound',
                                                        {
                                                            image:
                                                                music.banner_path,
                                                            name: music.name,
                                                            sound: music.path,
                                                        }
                                                    )
                                                }
                                            >
                                                <InfoText theme={DarkTheme}>
                                                    <Icons
                                                        name='headphones'
                                                        size={26}
                                                        color='#fff'
                                                    />{' '}
                                                    Listen
                                                </InfoText>
                                            </CustomButton>
                                            {likesMusics.length > 0 ? (
                                                likesMusics.find(
                                                    (lik) =>
                                                        lik.music === music.id
                                                ) ? (
                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            removeLikeMusic(
                                                                music.id
                                                            )
                                                        }
                                                    >
                                                        <Icons
                                                            name='heart'
                                                            size={26}
                                                            color='#f00'
                                                        />
                                                    </TouchableOpacity>
                                                ) : (
                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            addLikeMusic(
                                                                music.id
                                                            )
                                                        }
                                                    >
                                                        <Icons
                                                            name='heart-o'
                                                            size={26}
                                                            color='#f00'
                                                        />
                                                    </TouchableOpacity>
                                                )
                                            ) : (
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        addLikeMusic(music.id)
                                                    }
                                                >
                                                    <Icons
                                                        name='heart-o'
                                                        size={26}
                                                        color='#f00'
                                                    />
                                                </TouchableOpacity>
                                            )}
                                        </RowView>
                                    </CardInfo>
                                </CardMusic>
                            ))
                        )}
                    </Container>
                </>
            );
        }

        return (
            <>
                <Header theme={LightTheme}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icons name='arrow-left' size={26} color='#000' />
                    </TouchableOpacity>
                    {albumLiked ? (
                        <TouchableOpacity onPress={() => removeLikeAlbum()}>
                            <Icons name='heart' size={26} color='#f00' />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => addLikeAlbum()}>
                            <Icons name='heart-o' size={26} color='#f00' />
                        </TouchableOpacity>
                    )}
                </Header>
                <Container theme={LightTheme}>
                    <ImageAlbum
                        source={{
                            uri: `${URL}/img/${props.route.params.banner}`,
                        }}
                    />
                    <TextAlbum theme={LightTheme}>
                        {props.route.params.name} | {props.route.params.genre}
                    </TextAlbum>
                    <TextDescription>
                        {props.route.params.description}
                    </TextDescription>

                    {musics.length <= 0 ? (
                        <></>
                    ) : (
                        musics.map((music) => (
                            <CardMusic>
                                <Figure>
                                    <MusicImage
                                        source={{
                                            uri: `${URL}/img/${music.banner_path}`,
                                        }}
                                    />
                                </Figure>
                                <CardInfo>
                                    <InfoText theme={LightTheme}>
                                        {music.name} | {music.genre}
                                    </InfoText>
                                    <RowView>
                                        <CustomButton
                                            onPress={() =>
                                                navigation.navigate('Sound', {
                                                    image: music.banner_path,
                                                    name: music.name,
                                                    sound: music.path,
                                                })
                                            }
                                        >
                                            <InfoText theme={LightTheme}>
                                                <Icons
                                                    name='headphones'
                                                    size={26}
                                                    color='#fff'
                                                />{' '}
                                                Listen
                                            </InfoText>
                                        </CustomButton>
                                        {likesMusics.length > 0 ? (
                                            likesMusics.find(
                                                (lik) => lik.music === music.id
                                            ) ? (
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        removeLikeMusic(
                                                            music.id
                                                        )
                                                    }
                                                >
                                                    <Icons
                                                        name='heart'
                                                        size={26}
                                                        color='#f00'
                                                    />
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        addLikeMusic(music.id)
                                                    }
                                                >
                                                    <Icons
                                                        name='heart-o'
                                                        size={26}
                                                        color='#f00'
                                                    />
                                                </TouchableOpacity>
                                            )
                                        ) : (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    addLikeMusic(music.id)
                                                }
                                            >
                                                <Icons
                                                    name='heart-o'
                                                    size={26}
                                                    color='#f00'
                                                />
                                            </TouchableOpacity>
                                        )}
                                    </RowView>
                                </CardInfo>
                            </CardMusic>
                        ))
                    )}
                </Container>
            </>
        );
    }

    return Layout();
}

export default Album;
