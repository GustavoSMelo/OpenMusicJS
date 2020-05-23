import React, { useState, useEffect } from 'react';
import { AsyncStorage, TouchableOpacity, FlatList } from 'react-native';
import api from '../../api/api';
import {
    Container,
    MusicContainer,
    Figure,
    TextDark,
    ButtonListen,
    ActionContainer,
} from './style';
import getTheme from '../../utils/getTheme';
import DarkMode from '../../styles/themes/dark';
import LightMode from '../../styles/themes/light';
import Header from '../../components/header';
import Icons from 'react-native-vector-icons/FontAwesome';

function Home(props) {
    const [theme, setTheme] = useState('');
    const [allMusics, setAllMusics] = useState([]);
    const [likes, setLikes] = useState([]);

    async function Theme() {
        const theme = await getTheme();
        setTheme(theme);
    }

    async function getDataByAPI() {
        try {
            const token = await AsyncStorage.getItem('token');
            const resolve = await api.get('/musics', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            await setAllMusics(resolve.data.allmusics);
            await setLikes(resolve.data.likes_of_user);
            return;
        } catch (err) {
            console.error(err);
            return;
        }
    }

    async function handlerLikeAdd(music) {
        try {
            const token = await AsyncStorage.getItem('token');
            await api.post(
                '/users/musics',
                { music },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const newLikes = await api.get('/users/musics', {
                headers: { Authorization: `Bearer ${token}` },
            });

            setLikes(newLikes);
        } catch (err) {
            console.error(err);
        }
    }

    async function handlerLikeRemove(music) {
        try {
            const token = await AsyncStorage.getItem('token');
            await api.delete('/users/musics', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    music,
                },
            });

            const newLikes = await api.get('/users/musics', {
                headers: { Authorization: `Bearer ${token}` },
            });

            setLikes(newLikes);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        Theme();
        getDataByAPI();
    }, [likes]);

    function Layout() {
        if (theme === 'DarkMode') {
            return (
                <>
                    <Header theme={theme} />
                    <Container theme={DarkMode}>
                        <FlatList
                            data={allMusics}
                            onEndReached={getDataByAPI}
                            onEndReachedThreshold={0.2}
                            keyExtractor={(allMusics) => allMusics.id}
                            renderItem={({ item: music }) => (
                                <MusicContainer>
                                    <Figure
                                        source={{
                                            uri: `http://192.168.0.104:3333/img/${music.banner_path}`,
                                        }}
                                        resizeMode="stretch"
                                    />
                                    <TextDark>{music.name}</TextDark>
                                    <TextDark>{music.genre}</TextDark>
                                    <ActionContainer>
                                        <ButtonListen>
                                            <TextDark>
                                                <Icons
                                                    name="headphones"
                                                    size={18}
                                                />{' '}
                                                Listen
                                            </TextDark>
                                        </ButtonListen>

                                        {likes.find(
                                            (msc) => msc.music === music.id
                                        ) ? (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    handlerLikeRemove(music.id)
                                                }
                                            >
                                                <Icons
                                                    name="heart"
                                                    size={28}
                                                    color={'#f00'}
                                                />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    handlerLikeAdd(music.id)
                                                }
                                            >
                                                <Icons
                                                    name="heart-o"
                                                    size={28}
                                                    color={'#f00'}
                                                />
                                            </TouchableOpacity>
                                        )}
                                    </ActionContainer>
                                </MusicContainer>
                            )}
                        />
                    </Container>
                </>
            );
        }
        return (
            <Container theme={LightMode}>
                <Header theme={theme} />
            </Container>
        );
    }

    return Layout();
}

export default Home;
