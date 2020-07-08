import React, { useState, useEffect } from 'react';
import Icons from 'react-native-vector-icons/FontAwesome';
import { AsyncStorage, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../api/api';
import {
    CardImage,
    CardInfo,
    Container,
    CustomButton,
    RowContainer,
    Card,
    Title,
    InfoText,
} from './style';
import GetTheme from '../../utils/getTheme';
import DarkTheme from '../../styles/themes/dark';
import LightTheme from '../../styles/themes/light';
import URL from '../../config/url.config';

function Likes() {
    const [theme, setTheme] = useState('');
    const [musics, setMusics] = useState([]);
    const [artists, setArtists] = useState([]);
    const [albuns, setAlbuns] = useState([]);
    const [update, setUpdate] = useState(true);
    const navigation = useNavigation();

    async function getThemePage() {
        const response = await GetTheme();
        setTheme(response);
    }

    async function getDataByAPI() {
        // token
        const token = await AsyncStorage.getItem('token');

        try {
            // musics
            const responseMusics = await api.get('/musics', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseLikeMusics = await api.get('/users/musics', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const musicsFiltred = responseMusics.data.allmusics.map((msc) => {
                const liked = responseLikeMusics.data.find(
                    (like) => like.music === msc.id
                );

                if (liked) {
                    return msc;
                }
            });

            const musicsFiltredWithoutUndefined = musicsFiltred.filter(
                (msc) => msc !== undefined
            );

            console.log(musicsFiltredWithoutUndefined);
            setMusics(musicsFiltredWithoutUndefined);

            // artist

            const responseArtist = await api.get('/artist', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseLikeArtists = await api.get('/users/artists', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const ArtistsFiltred = responseArtist.data.map((art) => {
                const liked = responseLikeArtists.data.find(
                    (like) => like.artist === art.id
                );

                if (liked) {
                    return art;
                }
            });

            const ArtistsFiltredWithouUndefined = ArtistsFiltred.filter(
                (art) => art !== undefined
            );

            console.log(ArtistsFiltredWithouUndefined);
            setArtists(ArtistsFiltredWithouUndefined);

            // albuns

            const responseAlbuns = await api.get('/album', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseAlbunsLike = await api.get('/users/albuns', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const AlbunsFiltred = responseAlbuns.data.map((album) => {
                const liked = responseAlbunsLike.data.find(
                    (like) => like.album === album.id
                );

                if (liked) {
                    return album;
                }
            });

            const AlbunsFiltredWithoutUndefined = AlbunsFiltred.filter(
                (album) => album !== undefined
            );

            console.log(AlbunsFiltredWithoutUndefined);
            setAlbuns(AlbunsFiltredWithoutUndefined);

            setUpdate(false);
        } catch (err) {
            console.warn(err);
        }
    }

    useEffect(() => {
        getThemePage();
        getDataByAPI();
    }, [update]);

    async function removeLikeMusic(music) {
        const token = await AsyncStorage.getItem('token');

        try {
            await api.delete('/users/musics', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    music,
                },
            });

            setUpdate(true);
        } catch (err) {
            console.warn(err);
        }
    }

    async function removeLikeArtist(artist) {
        const token = await AsyncStorage.getItem('token');

        try {
            await api.delete('/users/artists', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    artist,
                },
            });

            setUpdate(true);
        } catch (err) {
            console.warn(err);
        }
    }

    async function removeLikeAlbum(album) {
        const token = await AsyncStorage.getItem('token');

        try {
            await api.delete('/users/albuns', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    album,
                },
            });

            setUpdate(true);
        } catch (err) {
            console.warn(err);
        }
    }

    function Layout() {
        if (theme === 'DarkMode') {
            return (
                <Container theme={DarkTheme}>
                    <Text>{'\n'}</Text>
                    {musics.length <= 0 ? (
                        <></>
                    ) : (
                        <>
                            <Title theme={DarkTheme}>Musics: </Title>
                            {musics.map((music) => (
                                <Card key={music.name}>
                                    <CardImage
                                        source={{
                                            uri: `${URL}/img/${music.banner_path}`,
                                        }}
                                    />
                                    <CardInfo>
                                        <InfoText theme={DarkTheme}>
                                            {music.name} | {music.genre}
                                        </InfoText>
                                        <RowContainer>
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
                                                        size={24}
                                                        color='#fff'
                                                    />{' '}
                                                    Listen
                                                </InfoText>
                                            </CustomButton>

                                            <TouchableOpacity
                                                onPress={() =>
                                                    removeLikeMusic(music.id)
                                                }
                                            >
                                                <InfoText theme={DarkTheme}>
                                                    <Icons
                                                        name='heart'
                                                        size={24}
                                                        color='#f00'
                                                    />
                                                </InfoText>
                                            </TouchableOpacity>
                                        </RowContainer>
                                    </CardInfo>
                                </Card>
                            ))}
                        </>
                    )}
                    <Text>{'\n'}</Text>
                    {artists.length <= 0 ? (
                        <></>
                    ) : (
                        <>
                            <Title theme={DarkTheme}>Artists: </Title>
                            {artists.map((art) => (
                                <Card key={art.name}>
                                    <CardImage
                                        source={{
                                            uri: `${URL}/img/${art.avatar}`,
                                        }}
                                    />
                                    <CardInfo>
                                        <InfoText theme={DarkTheme}>
                                            {art.name} | {art.name_artistic}
                                        </InfoText>
                                        <RowContainer>
                                            <CustomButton
                                                onPress={() =>
                                                    navigation.navigate(
                                                        'ArtistProfile',
                                                        {
                                                            name: art.name,
                                                            avatar: `${URL}/img/${art.avatar}`,
                                                            art_id: art.id,
                                                            artistic_name:
                                                                art.name_artistic,
                                                        }
                                                    )
                                                }
                                            >
                                                <InfoText theme={DarkTheme}>
                                                    <Icons
                                                        name='user'
                                                        size={24}
                                                        color='#fff'
                                                    />{' '}
                                                    Access
                                                </InfoText>
                                            </CustomButton>

                                            <TouchableOpacity
                                                onPress={() =>
                                                    removeLikeArtist(art.id)
                                                }
                                            >
                                                <InfoText theme={DarkTheme}>
                                                    <Icons
                                                        name='heart'
                                                        size={24}
                                                        color='#f00'
                                                    />
                                                </InfoText>
                                            </TouchableOpacity>
                                        </RowContainer>
                                    </CardInfo>
                                </Card>
                            ))}
                        </>
                    )}
                    <Text>{'\n'}</Text>
                    {albuns.length <= 0 ? (
                        <></>
                    ) : (
                        <>
                            <Title theme={DarkTheme}>Albuns: </Title>
                            {albuns.map((album) => (
                                <Card key={album.name}>
                                    <CardImage
                                        source={{
                                            uri: `${URL}/img/${album.banner}`,
                                        }}
                                    />
                                    <CardInfo>
                                        <InfoText theme={DarkTheme}>
                                            {album.name} | {album.genre}
                                        </InfoText>
                                        <RowContainer>
                                            <CustomButton
                                                onPress={() =>
                                                    navigation.navigate(
                                                        'Album',
                                                        {
                                                            name: album.name,
                                                            genre: album.genre,
                                                            description:
                                                                album.description,
                                                            idAlbum: album.id,
                                                            banner:
                                                                album.banner,
                                                        }
                                                    )
                                                }
                                            >
                                                <InfoText theme={DarkTheme}>
                                                    <Icons
                                                        name='folder-o'
                                                        size={24}
                                                        color='#fff'
                                                    />{' '}
                                                    Access
                                                </InfoText>
                                            </CustomButton>

                                            <TouchableOpacity
                                                onPress={() =>
                                                    removeLikeAlbum(album.id)
                                                }
                                            >
                                                <InfoText theme={DarkTheme}>
                                                    <Icons
                                                        name='heart'
                                                        size={24}
                                                        color='#f00'
                                                    />
                                                </InfoText>
                                            </TouchableOpacity>
                                        </RowContainer>
                                    </CardInfo>
                                </Card>
                            ))}
                        </>
                    )}
                </Container>
            );
        }

        return (
            <Container theme={LightTheme}>
                <Text>{'\n'}</Text>
                {musics.length <= 0 ? (
                    <></>
                ) : (
                    <>
                        <Title theme={LightTheme}>Musics: </Title>
                        {musics.map((music) => (
                            <Card key={music.name}>
                                <CardImage
                                    source={{
                                        uri: `${URL}/img/${music.banner_path}`,
                                    }}
                                />
                                <CardInfo>
                                    <InfoText theme={LightTheme}>
                                        {music.name} | {music.genre}
                                    </InfoText>
                                    <RowContainer>
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
                                                    size={24}
                                                    color='#fff'
                                                />{' '}
                                                Listen
                                            </InfoText>
                                        </CustomButton>

                                        <TouchableOpacity
                                            onPress={() =>
                                                removeLikeMusic(music.id)
                                            }
                                        >
                                            <InfoText theme={LightTheme}>
                                                <Icons
                                                    name='heart'
                                                    size={24}
                                                    color='#f00'
                                                />
                                            </InfoText>
                                        </TouchableOpacity>
                                    </RowContainer>
                                </CardInfo>
                            </Card>
                        ))}
                    </>
                )}
                <Text>{'\n'}</Text>
                {artists.length <= 0 ? (
                    <></>
                ) : (
                    <>
                        <Title theme={LightTheme}>Artists: </Title>
                        {artists.map((art) => (
                            <Card key={art.name}>
                                <CardImage
                                    source={{
                                        uri: `${URL}/img/${art.avatar}`,
                                    }}
                                />
                                <CardInfo>
                                    <InfoText theme={LightTheme}>
                                        {art.name} | {art.name_artistic}
                                    </InfoText>
                                    <RowContainer>
                                        <CustomButton
                                            onPress={() =>
                                                navigation.navigate(
                                                    'ArtistProfile',
                                                    {
                                                        name: art.name,
                                                        avatar: `${URL}/img/${art.avatar}`,
                                                        art_id: art.id,
                                                        artistic_name:
                                                            art.name_artistic,
                                                    }
                                                )
                                            }
                                        >
                                            <InfoText theme={LightTheme}>
                                                <Icons
                                                    name='user'
                                                    size={24}
                                                    color='#fff'
                                                />{' '}
                                                Access
                                            </InfoText>
                                        </CustomButton>

                                        <TouchableOpacity
                                            onPress={() =>
                                                removeLikeArtist(art.id)
                                            }
                                        >
                                            <InfoText theme={LightTheme}>
                                                <Icons
                                                    name='heart'
                                                    size={24}
                                                    color='#f00'
                                                />
                                            </InfoText>
                                        </TouchableOpacity>
                                    </RowContainer>
                                </CardInfo>
                            </Card>
                        ))}
                    </>
                )}
                <Text>{'\n'}</Text>
                {albuns.length <= 0 ? (
                    <></>
                ) : (
                    <>
                        <Title theme={LightTheme}>Albuns: </Title>
                        {albuns.map((album) => (
                            <Card key={album.name}>
                                <CardImage
                                    source={{
                                        uri: `${URL}/img/${album.banner}`,
                                    }}
                                />
                                <CardInfo>
                                    <InfoText theme={LightTheme}>
                                        {album.name} | {album.genre}
                                    </InfoText>
                                    <RowContainer>
                                        <CustomButton
                                            onPress={() =>
                                                navigation.navigate('Album', {
                                                    name: album.name,
                                                    genre: album.genre,
                                                    description:
                                                        album.description,
                                                    idAlbum: album.id,
                                                    banner: album.banner,
                                                })
                                            }
                                        >
                                            <InfoText theme={LightTheme}>
                                                <Icons
                                                    name='folder-o'
                                                    size={24}
                                                    color='#fff'
                                                />{' '}
                                                Access
                                            </InfoText>
                                        </CustomButton>

                                        <TouchableOpacity
                                            onPress={() =>
                                                removeLikeAlbum(album.id)
                                            }
                                        >
                                            <InfoText theme={LightTheme}>
                                                <Icons
                                                    name='heart'
                                                    size={24}
                                                    color='#f00'
                                                />
                                            </InfoText>
                                        </TouchableOpacity>
                                    </RowContainer>
                                </CardInfo>
                            </Card>
                        ))}
                    </>
                )}
            </Container>
        );
    }

    return Layout();
}

export default Likes;
