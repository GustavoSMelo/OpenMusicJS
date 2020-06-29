import React, { useState, useEffect } from 'react';
import { AsyncStorage, TouchableOpacity, FlatList } from 'react-native';
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
} from './styled';

function ArtistProfile(props) {
    const [musics, setMusics] = useState([]);
    const [liked, setLiked] = useState(false);
    const [theme, setTheme] = useState('');
    const navigation = useNavigation();

    async function getTheme() {
        const response = await GetTheme();
        setTheme(response);
    }

    async function getDataByAPI() {
        const token = await AsyncStorage.getItem('token');

        const resolveMusic = await api.get('/musics', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const resolveLike = await api.get('/users/artists/show', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const musicsOfArtist = resolveMusic.data.allmusics.filter(
            (music) => music.singer === props.route.params.art_id
        );

        const likeArtist = resolveLike.data.allLikes.rows.find(
            (artist) => artist.id === props.route.params.art_id
        );
        if (likeArtist === undefined || likeArtist === null) {
            await setLiked(false);
        } else {
            await setLiked(true);
        }

        await setMusics(musicsOfArtist);
    }

    useEffect(() => {
        getTheme();
        getDataByAPI();
    }, []);

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
                                {liked ? (
                                    <Icons
                                        name='heart'
                                        size={26}
                                        color='#f00'
                                    />
                                ) : (
                                    <Icons
                                        name='heart-o'
                                        size={26}
                                        color='#f00'
                                    />
                                )}
                            </TitleName>
                        </ArtistSection>
                        <FlatList
                            data={musics}
                            keyExtractor={(msc) => msc.id}
                            scrollEnabled={true}
                            renderItem={(music) => (
                                <MusicSection>
                                    <MusicImage
                                        source={{
                                            uri: `http://192.168.0.102:3333/img/${music.banner_path}`,
                                        }}
                                    />
                                    <MusicButtons>
                                        <TextMusic theme={DarkTheme}>
                                            {music.name} {music.genre}
                                        </TextMusic>
                                        <ListenButton>
                                            <TextMusic theme={DarkTheme}>
                                                <Icons
                                                    name='headphones'
                                                    size={26}
                                                    color={DarkTheme.color}
                                                />
                                                Listen
                                            </TextMusic>
                                        </ListenButton>
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
