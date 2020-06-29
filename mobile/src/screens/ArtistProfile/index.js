import React, { useState, useEffect } from 'react';
import {
    AsyncStorage,
    TouchableOpacity,
    FlatList,
    ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/FontAwesome';
import api from '../../api/api';
import DarkTheme from '../../styles/themes/dark';
import LightTheme from '../../styles/themes/light';
import GetTheme from '../../utils/getTheme';
import {
    Container,
    Header,
    ArtistSection,
    Figure,
    TitleName,
    MusicButtons,
    MusicImage,
    MusicSection,
    TextMusic,
    ListenButton,
    RowContainer,
} from './styled';

function ArtistProfile(props) {
    const [token, setToken] = useState('');
    const [musics, setMusics] = useState([]);
    const [likedArtist, setLikedArtist] = useState(false);
    const [theme, setTheme] = useState('');
    const [likesMusics, setLikesMusics] = useState([]);
    const navigation = useNavigation();

    async function getTheme() {
        const response = await GetTheme();
        setTheme(response);
    }

    async function getToken() {
        const responseToken = await AsyncStorage.getItem('token');
        await setToken(responseToken);
    }

    async function getDataByAPI() {
        try {
            const resolveMusic = await api.get('/musics', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const musicsOfArtist = resolveMusic.data.allmusics.filter(
                (music) => music.singer === props.route.params.art_id
            );

            await setMusics(musicsOfArtist);

            const filtredLikeMusic = resolveMusic.data.likes_of_user.filter(
                (like) => musics.map((music) => music.id === like.music)
            );

            await setLikesMusics(filtredLikeMusic);

            const resolveLike = await api.get('/users/artists/show', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // console.log(resolveLike.data);

            const likeArtist = resolveLike.data.allLikes.rows.find(
                (like) => like.artist === props.route.params.art_id
            );

            // console.log(likeArtist);

            if (likeArtist === undefined || likeArtist === null) {
                await setLikedArtist(false);
            } else {
                await setLikedArtist(true);
            }
        } catch (err) {
            console.log({ Error: err.response });
        }
    }

    async function giveLikeMusic(music) {
        try {
            await api.post(
                '/users/musics',
                { music },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (err) {
            ToastAndroid.show('Error to give like for music', 5);
        }
    }

    async function removeLikeMusic(music) {
        try {
            await api.delete('/users/musics', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    music,
                },
            });
        } catch (err) {
            ToastAndroid.show('Error to remove like for music', 5);
        }
    }

    async function GiveLikeArtist() {
        try {
            await api.post(
                '/users/artists',
                { artist: props.route.params.art_id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            await setLikedArtist(true);
        } catch (err) {
            ToastAndroid.show('Error in give like to artist ', 5);
        }
    }

    async function RemoveLikeArtist() {
        try {
            await api.delete('/users/artists', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    artist: props.route.params.art_id,
                },
            });

            setLikedArtist(false);
        } catch (err) {
            ToastAndroid.show('Error in remove like to artist ', 5);
        }
    }

    useEffect(() => {
        getToken();
        getTheme();
        getDataByAPI();
    }, [token, likesMusics, likedArtist]);

    function Layout() {
        if (theme === 'DarkMode') {
            return (
                <>
                    <Header theme={DarkTheme}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icons name='arrow-left' size={32} color='#fff' />
                        </TouchableOpacity>
                    </Header>
                    <Container theme={DarkTheme}>
                        <ArtistSection>
                            <Figure
                                source={{ uri: `${props.route.params.avatar}` }}
                            />
                            <TitleName theme={DarkTheme}>
                                {props.route.params.name} |{' '}
                                {props.route.params.artistic_name}
                                {'       '}
                                {likedArtist === true ? (
                                    <Icons
                                        name='heart'
                                        size={26}
                                        color='#f00'
                                        onPress={() => RemoveLikeArtist()}
                                    />
                                ) : (
                                    <Icons
                                        name='heart-o'
                                        size={26}
                                        color='#f00'
                                        onPress={() => GiveLikeArtist()}
                                    />
                                )}
                            </TitleName>
                        </ArtistSection>
                        <FlatList
                            data={musics}
                            keyExtractor={(musics) => musics.id}
                            renderItem={({ item: musics }) => (
                                <MusicSection>
                                    <MusicImage
                                        source={{
                                            uri: `http://192.168.0.102:3333/img/${musics.banner_path}`,
                                        }}
                                    />
                                    <MusicButtons>
                                        <TextMusic theme={DarkTheme}>
                                            {musics.name} | {musics.genre}
                                        </TextMusic>
                                        <RowContainer>
                                            <ListenButton
                                                onPress={() =>
                                                    navigation.navigate(
                                                        'Sound',
                                                        {
                                                            image:
                                                                musics.banner_path,
                                                            name: musics.name,
                                                            sound: musics.path,
                                                        }
                                                    )
                                                }
                                            >
                                                <TextMusic theme={DarkTheme}>
                                                    <Icons
                                                        name='headphones'
                                                        size={26}
                                                        color={DarkTheme.color}
                                                    />{' '}
                                                    Listen
                                                </TextMusic>
                                            </ListenButton>
                                            {likesMusics.find(
                                                (like) =>
                                                    musics.id === like.music
                                            ) ? (
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        removeLikeMusic(
                                                            musics.id
                                                        )
                                                    }
                                                >
                                                    <Icons
                                                        name='heart'
                                                        size={32}
                                                        color='#f00'
                                                    />
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        giveLikeMusic(musics.id)
                                                    }
                                                >
                                                    <Icons
                                                        name='heart-o'
                                                        size={32}
                                                        color='#f00'
                                                    />
                                                </TouchableOpacity>
                                            )}
                                        </RowContainer>
                                    </MusicButtons>
                                </MusicSection>
                            )}
                        />
                    </Container>
                </>
            );
        }

        return <></>;
    }

    return Layout();
}

export default ArtistProfile;
