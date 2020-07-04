import React, { useState, useEffect } from 'react';
import Icons from 'react-native-vector-icons/FontAwesome';
import api from '../../api/api';
import { AsyncStorage, TouchableOpacity } from 'react-native';
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

function Likes() {
    const [theme, setTheme] = useState('');
    const [musics, setMusics] = useState([]);
    const [likeMusics, setLikesMusics] = useState([]);
    const [artists, setArtists] = useState([]);
    const [likeArtists, setLikeArtists] = useState([]);
    const [albuns, setAlbuns] = useState([]);
    const [likeAlbuns, setLikeAlbuns] = useState([]);

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
        } catch (err) {
            console.warn(err.response);
        }
    }

    useEffect(() => {
        getThemePage();
        getDataByAPI();
    }, []);

    function Layout() {
        if (theme === 'DarkMode') {
            return (
                <Container theme={DarkTheme}>
                    <Title theme={DarkTheme}>Musics: </Title>
                    <Card>
                        <CardImage
                            source={{
                                uri: `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.6TeoYfmLijC0nHcVBbjVfQHaEK%26pid%3DApi&f=1`,
                            }}
                        />
                        <CardInfo>
                            <InfoText theme={DarkTheme}>Name | Genre</InfoText>
                            <RowContainer>
                                <CustomButton>
                                    <InfoText theme={DarkTheme}>
                                        <Icons
                                            name='gear'
                                            size={24}
                                            color='#fff'
                                        />{' '}
                                        Access
                                    </InfoText>
                                </CustomButton>

                                <TouchableOpacity>
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
                    <Title theme={DarkTheme}>Artists: </Title>
                    <Card>
                        <CardImage
                            source={{
                                uri: `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.6TeoYfmLijC0nHcVBbjVfQHaEK%26pid%3DApi&f=1`,
                            }}
                        />
                        <CardInfo>
                            <InfoText theme={DarkTheme}>Name | Genre</InfoText>
                            <RowContainer>
                                <CustomButton>
                                    <InfoText theme={DarkTheme}>
                                        <Icons
                                            name='gear'
                                            size={24}
                                            color='#fff'
                                        />{' '}
                                        Access
                                    </InfoText>
                                </CustomButton>

                                <TouchableOpacity>
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
                    <Title theme={DarkTheme}>Albuns: </Title>
                    <Card>
                        <CardImage
                            source={{
                                uri: `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.6TeoYfmLijC0nHcVBbjVfQHaEK%26pid%3DApi&f=1`,
                            }}
                        />
                        <CardInfo>
                            <InfoText theme={DarkTheme}>Name | Genre</InfoText>
                            <RowContainer>
                                <CustomButton>
                                    <InfoText theme={DarkTheme}>
                                        <Icons
                                            name='gear'
                                            size={24}
                                            color='#fff'
                                        />{' '}
                                        Access
                                    </InfoText>
                                </CustomButton>

                                <TouchableOpacity>
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
                </Container>
            );
        }

        return <></>;
    }

    return Layout();
}

export default Likes;
