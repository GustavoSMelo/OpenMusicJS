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
import URL from '../../config/url.config';

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

            console.log(response.data);

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
                                                    uri: `${URL}/img/${msc.banner_path}`,
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
                                                    uri: `${URL}/img/${arts.avatar}`,
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
                                                            avatar: `${URL}/img/${arts.avatar}`,
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

                        {albuns.length <= 0 ? (
                            <></>
                        ) : (
                            <>
                                <SectionLabel theme={DarkTheme}>
                                    Albuns
                                </SectionLabel>
                                {albuns.map((album) => (
                                    <Cards key={album.id}>
                                        <Figure>
                                            <CardImage
                                                source={{
                                                    uri: `${URL}/img/${album.banner}`,
                                                }}
                                            />
                                        </Figure>
                                        <CardInfo>
                                            <TextInfo theme={DarkTheme}>
                                                {album.name} | {album.genre}
                                                {'\n'}
                                            </TextInfo>
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
                                                <TextInfo theme={DarkTheme}>
                                                    Access
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

        return (
            <>
                <Header theme={LightTheme}>
                    <InputSearch
                        theme={LightTheme}
                        value={searchString}
                        onChangeText={setSearchString}
                        placeholder='Search any music, album, artists...'
                    />
                    <ButtonSearch onPress={() => SearchDatasByAPI()}>
                        <Icons name='search' color={'#fff'} size={26} />
                    </ButtonSearch>
                </Header>
                <Container theme={LightTheme}>
                    {musics.length <= 0 ? (
                        <></>
                    ) : (
                        <>
                            <SectionLabel theme={LightTheme}>
                                Musics:{' '}
                            </SectionLabel>
                            {musics.map((msc) => (
                                <Cards key={msc.id}>
                                    <Figure>
                                        <CardImage
                                            source={{
                                                uri: `${URL}/img/${msc.banner_path}`,
                                            }}
                                        />
                                    </Figure>
                                    <CardInfo>
                                        <TextInfo theme={LightTheme}>
                                            {`${msc.name}`}
                                            {`\n${msc.genre}`}
                                        </TextInfo>
                                        <CustomButton
                                            onPress={() =>
                                                navigation.navigate('Sound', {
                                                    image: msc.banner_path,
                                                    name: msc.name,
                                                    sound: msc.path,
                                                })
                                            }
                                        >
                                            <TextInfo theme={LightTheme}>
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
                            <SectionLabel theme={LightTheme}>
                                Artistis:{' '}
                            </SectionLabel>
                            {artists.map((arts) => (
                                <Cards key={arts.id}>
                                    <Figure>
                                        <CardImage
                                            source={{
                                                uri: `${URL}/img/${arts.avatar}`,
                                            }}
                                        />
                                    </Figure>
                                    <CardInfo>
                                        <TextInfo
                                            theme={LightTheme}
                                        >{`${arts.name} | ${arts.name_artistic}`}</TextInfo>
                                        <CustomButton
                                            onPress={() =>
                                                navigation.navigate(
                                                    'ArtistProfile',
                                                    {
                                                        avatar: `${URL}/img/${arts.avatar}`,
                                                        art_id: arts.id,
                                                        name: arts.name,
                                                        artistic_name:
                                                            arts.name_artistic,
                                                    }
                                                )
                                            }
                                        >
                                            <TextInfo theme={LightTheme}>
                                                Profile
                                            </TextInfo>
                                        </CustomButton>
                                    </CardInfo>
                                </Cards>
                            ))}
                        </>
                    )}

                    {albuns.length <= 0 ? (
                        <></>
                    ) : (
                        <>
                            <SectionLabel theme={LightTheme}>
                                Albuns
                            </SectionLabel>
                            {albuns.map((album) => (
                                <Cards key={album.id}>
                                    <Figure>
                                        <CardImage
                                            source={{
                                                uri: `${URL}/img/${album.banner}`,
                                            }}
                                        />
                                    </Figure>
                                    <CardInfo>
                                        <TextInfo theme={LightTheme}>
                                            {album.name} | {album.genre}
                                            {'\n'}
                                        </TextInfo>
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
                                            <TextInfo theme={LightTheme}>
                                                Access
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

    return Layout();
}

export default Search;
