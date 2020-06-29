import React, { useEffect, useState } from 'react';
import { AsyncStorage, ToastAndroid, Text } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
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
    CustomButton,
    SectionLabel,
} from './style';
import getTheme from '../../utils/getTheme';
import DarkTheme from '../../styles/themes/dark';
import LightTheme from '../../styles/themes/light';
import api from '../../api/api';
import { useNavigation } from '@react-navigation/native';

function Search() {
    const [theme, setTheme] = useState('');
    const [searchString, setSearchString] = useState('');
    const [musics, setMusics] = useState([]);
    const [artists, setArtists] = useState([]);
    const [albuns, setAlbuns] = useState([]);
    const navigation = useNavigation();

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

            await setMusics(response.data[0].Musics);
            await setArtists(response.data[1].Artists);
            await setAlbuns(response.data[2].Albums);

            console.log(musics);
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
                            <>
                                <SectionLabel theme={DarkTheme}>
                                    Musics:{' '}
                                </SectionLabel>
                                {musics.map((msc) => (
                                    <Cards key={msc.id}>
                                        <Figure>
                                            <CardImage
                                                source={{
                                                    uri: `http://192.168.0.102:3333/img/${msc.banner_path}`,
                                                }}
                                            />
                                        </Figure>
                                        <CardInfo>
                                            <TextInfo theme={DarkTheme}>
                                                {`${msc.name}`}
                                                {`\n${msc.genre}`}
                                            </TextInfo>
                                            <CustomButton
                                                onPress={() =>
                                                    navigation.navigate(
                                                        'Sound',
                                                        {
                                                            image:
                                                                msc.banner_path,
                                                            name: msc.name,
                                                            sound: msc.path,
                                                        }
                                                    )
                                                }
                                            >
                                                <TextInfo theme={DarkTheme}>
                                                    <Icons
                                                        name='headphones'
                                                        size={26}
                                                        color='#fff'
                                                    />{' '}
                                                    Listen
                                                </TextInfo>
                                            </CustomButton>
                                        </CardInfo>
                                    </Cards>
                                ))}
                            </>
                        )}

                        {artists.length <= 0 ? (
                            <></>
                        ) : (
                            <>
                                <SectionLabel theme={DarkTheme}>
                                    Artistis:{' '}
                                </SectionLabel>
                                {artists.map((arts) => (
                                    <Cards key={arts.id}>
                                        <Figure>
                                            <CardImage
                                                source={{
                                                    uri: `http://192.168.0.102:3333/img/${arts.avatar}`,
                                                }}
                                            />
                                        </Figure>
                                        <CardInfo>
                                            <TextInfo
                                                theme={DarkTheme}
                                            >{`${arts.name} | ${arts.name_artistic}`}</TextInfo>
                                            <CustomButton
                                                onPress={() =>
                                                    navigation.navigate(
                                                        'ArtistProfile',
                                                        {
                                                            avatar: `http://192.168.0.102:3333/img/${arts.avatar}`,
                                                            art_id: arts.id,
                                                            name: arts.name,
                                                            artistic_name:
                                                                arts.name_artistic,
                                                        }
                                                    )
                                                }
                                            >
                                                <TextInfo theme={DarkTheme}>
                                                    Profile
                                                </TextInfo>
                                            </CustomButton>
                                        </CardInfo>
                                    </Cards>
                                ))}
                            </>
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
