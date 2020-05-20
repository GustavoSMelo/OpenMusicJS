import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import api from '../../api/api';
import { Container } from './style';
import getTheme from '../../utils/getTheme';
import DarkMode from '../../styles/themes/dark';
import LightMode from '../../styles/themes/light';
import Header from '../../components/header';

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
            console.log(props);
            const token = await AsyncStorage.getItem('token');
            console.log(token);
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

    useEffect(() => {
        Theme();
        getDataByAPI();
    }, []);

    function Layout() {
        if (theme === 'DarkMode') {
            return (
                <Container theme={DarkMode}>
                    <Header theme={theme} />
                </Container>
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
