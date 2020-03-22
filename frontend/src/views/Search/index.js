import React, { useEffect, useState } from 'react';
import api from '../../api';
import Navbar from '../../components/navbar/index';
import DoLogin from '../../components/Layout/DoLogin';
import { Container, ContainerError, ContainerCard } from './styled';
import { FaSearch } from 'react-icons/fa';
import Global from './global-style';
import MP3player from '../../components/player';
import { Link } from 'react-router-dom';

function Search() {
    const [Auth, setAuth] = useState('');
    const [Musics, setMusics] = useState([]);
    const [Artists, setArtists] = useState([]);
    const [Users, setUsers] = useState([]);
    const [Albuns, setAlbuns] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [Status4User, setStatus4User] = useState('');
    const [musicPath, setMusicPath] = useState('');
    useEffect(() => {
        try {
            async function getTokenAPI() {
                const auth = await api.get('/search', {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                if (!auth) {
                    return console.error({ auth });
                }

                setAuth(auth);
            }

            getTokenAPI();
        } catch (err) {
            console.error({ err });
        }
    }, []);

    async function SearchMethod() {
        if (searchString === null || searchString === '') {
            return setStatus4User(
                <ContainerError>
                    The value of field is null, please, insert it
                </ContainerError>
            );
        }

        try {
            const info = await api.post(
                '/search',
                { searchString },
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );

            setMusics(info.data[0].Musics);
            setArtists(info.data[1].Artists);
            setAlbuns(info.data[2].Albums);
            setUsers(info.data[3].Users);
            setSearchString('');
            setStatus4User(<></>);
            console.log(info);
        } catch (err) {
            return setStatus4User(
                <ContainerError>{err.response.data.Error}</ContainerError>
            );
        }
    }

    function PlayMusic(music) {
        setMusicPath(music);
    }

    function Layout() {
        return (
            <>
                <Navbar />
                <Container>
                    <article className="form">
                        <input
                            placeholder="Insert a name of artist, music, album and etc."
                            onChange={e => setSearchString(e.target.value)}
                            value={searchString}
                        />
                        <button type="button" onClick={SearchMethod}>
                            <FaSearch />
                        </button>
                    </article>
                    {Status4User}
                    <section>
                        {Albuns.length >= 1 ? (
                            <>
                                <h1>Albuns</h1>
                                <ul>
                                    {Albuns.map(item => {
                                        return (
                                            <ContainerCard key={item.id}>
                                                <figure>
                                                    <img
                                                        src={`http://localhost:3333/img/${item.banner}`}
                                                        alt="banner album"
                                                    />
                                                </figure>
                                                <article>
                                                    <span>Name:</span>{' '}
                                                    {item.name} <br />
                                                    <span>Genre:</span>{' '}
                                                    {item.genre}{' '}
                                                    {
                                                        <p className="desc">
                                                            {
                                                                (item.description =
                                                                    'Description not pass')
                                                            }
                                                        </p>
                                                    }
                                                </article>
                                            </ContainerCard>
                                        );
                                    })}
                                </ul>
                            </>
                        ) : (
                            <></>
                        )}
                        {Artists.length >= 1 ? (
                            <>
                                <h1>Artists</h1>

                                <ul>
                                    {Artists.map(item => (
                                        <ContainerCard key={item.id}>
                                            <figure>
                                                {' '}
                                                <img
                                                    src={`http://localhost:3333/img/${item.avatar}`}
                                                    alt="Avatar singer"
                                                />
                                            </figure>

                                            <article>
                                                <h1>{item.name_artistic}</h1>
                                                <br />
                                                <Link
                                                    to={{
                                                        pathname:
                                                            '/artist/profile/public',
                                                        state: {
                                                            idArtist: item.id,
                                                        },
                                                    }}
                                                    className="link"
                                                >
                                                    Access profile
                                                </Link>
                                                <br />
                                                <button type="button">
                                                    Like Artist
                                                </button>
                                            </article>
                                        </ContainerCard>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <></>
                        )}
                        {Users.length >= 1 ? (
                            <>
                                <h1>Users</h1>

                                <ul>
                                    {Users.map(item => (
                                        <ContainerCard key={item.key}>
                                            <figure>
                                                <img
                                                    src={`http://localhost:3333/img/${item.avatar}`}
                                                    alt="Avatar user"
                                                />
                                            </figure>

                                            <article>
                                                <span>Name: </span> {item.name}
                                                <br />
                                                <button>Access profile</button>
                                            </article>
                                        </ContainerCard>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <></>
                        )}
                        {Musics.length >= 1 ? (
                            <>
                                <h1>Musics</h1>

                                <ul>
                                    {Musics.map(item => (
                                        <ContainerCard key={item.id}>
                                            <figure>
                                                <img
                                                    src={`http://localhost:3333/img/${item.banner_path}`}
                                                    alt="banner of music"
                                                />
                                            </figure>
                                            <article>
                                                <span>Nome: </span>
                                                {item.name}
                                                <br />
                                                <button>Like music</button>
                                                <button
                                                    onClick={() =>
                                                        PlayMusic(item.path)
                                                    }
                                                >
                                                    Play music
                                                </button>
                                            </article>
                                        </ContainerCard>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <></>
                        )}
                    </section>
                    {musicPath ? <MP3player musicpath={musicPath} /> : <></>}
                </Container>
                <Global />
            </>
        );
    }

    return <>{Auth ? Layout() : <DoLogin />}</>;
}

export default Search;
