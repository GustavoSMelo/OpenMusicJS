import React, { useEffect, useState } from 'react';
import { AsyncStorage, ToastAndroid, Text } from 'react-native';
import {
    Header,
    Container,
    ButtonSearch,
    CardImage,
    CardInfo,
    Cards,
    InputSearch,
    Figure,
    TextInfo,
} from './style';
import getTheme from '../../utils/getTheme';
import DarkTheme from '../../styles/themes/dark';
import LightTheme from '../../styles/themes/light';
import Icons from 'react-native-vector-icons/FontAwesome';
import api from '../../api/api';

function Search() {
    const [theme, setTheme] = useState('');
    const [searchString, setSearchString] = useState('');
    const [musics, setMusics] = useState([]);
    const [artists, setArtists] = useState([]);
    const [albuns, setAlbuns] = useState([]);

    async function getThemeStorage() {
        const response = await getTheme();
        setTheme(response);
    }

    async function SearchDatasByAPI() {
        if (
            searchString === null ||
            searchString === '' ||
            searchString === undefined
        ) {
            return ToastAndroid.show(
                'To search, insert something to continue',
                5
            );
        }
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await api.post(
                '/search',
                { searchString },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            await setArtists([]);
            await setAlbuns([]);
            await setMusics([]);

            await setMusics([...musics, response.data.Musics]);
            await setAlbuns([...albuns, response.data.Albums]);
            await setArtists([...artists, response.data.Artists]);
        } catch (err) {
            return ToastAndroid.show('Error', 5);
        }
    }

    useEffect(() => {
        getThemeStorage();
    }, []);

    function Layout() {
        if (theme === 'DarkMode') {
            return (
                <>
                    <Header theme={DarkTheme}>
                        <InputSearch
                            theme={DarkTheme}
                            value={searchString}
                            onChangeText={setSearchString}
                            placeholder='Search any music, album, artists...'
                        />
                        <ButtonSearch onPress={() => SearchDatasByAPI()}>
                            <Icons name='search' color={'#fff'} size={26} />
                        </ButtonSearch>
                    </Header>
                    <Container theme={DarkTheme}>
                        {musics.length <= 0 ? (
                            <></>
                        ) : (
                            musics.map((music) => (
                                <Cards key={music.id}>
                                    <Figure>
                                        <CardImage
                                            source={{
                                                uri:
                                                    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffthmb.tqn.com%2FCalyBE0j7MuRgOZpXEVKJDgjQoY%3D%2F1093x725%2Ffilters%3Afill(auto%2C1)%2Fitunes-on-linux-5738ca5b5f9b58723d8b1137.jpg&f=1&nofb=1',
                                            }}
                                            resizeMode='contain'
                                        />
                                    </Figure>
                                    <CardInfo>
                                        <TextInfo theme={DarkTheme}>
                                            Testando o visual
                                        </TextInfo>
                                    </CardInfo>
                                </Cards>
                            ))
                        )}
                    </Container>
                </>
            );
        }

        return <Text>AAAAA</Text>;
    }

    return Layout();
}

export default Search;
