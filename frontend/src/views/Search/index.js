import React, { useEffect, useState } from 'react';
import api from '../../api';
import Navbar from '../../components/navbar/index';
import DoLogin from '../../components/Layout/DoLogin';
import { Container, ContainerError, ContainerCard } from './styled';
import { FaSearch, FaHeart, FaRegHeart } from 'react-icons/fa';
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
    const [likesMusics, setLikesMusics] = useState([]);
    const [likeAlbuns, setLikeAlbuns] = useState([]);
    const [likeArtists, setLikeArtists] = useState([]);
    const [haveModificationLikes, setHaveModificationLikes] = useState(false);

    async function getTokenAPI() {
        const auth = await api.get('/search', {
            headers: {
                Authorization: localStorage.getItem('token'),
            },
        });

        const responseLikeMusics = await api.get('/users/musics', {
            headers: {
                Authorization: localStorage.getItem('token'),
            },
        });

        const responseLikeAlbuns = await api.get('/users/albuns', {
            headers: {
                Authorization: localStorage.getItem('token'),
            },
        });

        const responseLikeArtists = await api.get('/users/artists', {
            headers: {
                Authorization: localStorage.getItem('token'),
            },
        });

        if (!responseLikeMusics) {
            setLikesMusics([]);
        }

        console.log(responseLikeAlbuns);
        console.log(responseLikeMusics);

        if (!responseLikeAlbuns.data.Error) {
            await setLikeAlbuns(responseLikeAlbuns.data);
        }
        if (!responseLikeMusics.data.Error) {
            await setLikesMusics(responseLikeMusics.data);
        }
        if (!responseLikeArtists.data.Error) {
            await setLikeArtists(responseLikeArtists.data);
        }

        await setAuth(auth);
        await setHaveModificationLikes(false);
    }

    useEffect(() => {
        getTokenAPI();
    }, [haveModificationLikes]);

    async function SearchMethod() {
        if (searchString === null || searchString === '') {
            return setStatus4User(
                <ContainerError>
                    The value of field is null, please, insert it
                </ContainerError>
            );
        }

        const info = await api.post(
            '/search',
            { searchString },
            {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            }
        );

        console.log(info);
        console.log(`Posição 0: ${info.data[0]}`);
        console.log(`Posição 1: ${info.data[1]}`);
        console.log(`Posição 2: ${info.data[2]}`);
        console.log(`Posição 3: ${info.data[3]}`);

        let controlData = 0;

        if (info.data[0].Musics.length <= 0) {
            setMusics([]);
            controlData++;
        } else {
            setMusics(info.data[0].Musics);
        }

        if (info.data[1].Artists.length <= 0) {
            setArtists([]);
            controlData++;
        } else {
            setArtists(info.data[1].Artists);
        }

        if (info.data[2].Albums.length <= 0) {
            setAlbuns([]);
            controlData++;
        } else {
            setAlbuns(info.data[2].Albums);
        }

        if (info.data[3].Users.length <= 0) {
            setUsers([]);
            controlData++;
        } else {
            setUsers(info.data[3].Users);
        }

        if (controlData === 4) {
            console.log(controlData);
            setStatus4User(
                <ContainerError>
                    Any artist, music, album or user is finded :({' '}
                </ContainerError>
            );
        } else {
            setStatus4User(<></>);
        }
        setSearchString('');
    }

    async function PlayMusic(music) {
        await setMusicPath('');
        await setMusicPath(music);
    }

    async function handlerLikeAlbum(album) {
        try {
            await api.post(
                '/users/albuns',
                { album },
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );

            return await setHaveModificationLikes(true);
        } catch (err) {
            return console.error({ Error: err });
        }
    }

    async function handlerDislikeAlbum(album) {
        try {
            await api.delete('/users/albuns', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                    album,
                },
            });

            return await setHaveModificationLikes(true);
        } catch (err) {
            return console.error({ Error: err });
        }
    }

    async function handlerLikeArtist(artist) {
        try {
            await api.post(
                '/users/artists',
                { artist },
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );

            await setHaveModificationLikes(true);
        } catch (err) {
            console.error({ Error: err });
        }
    }

    async function handlerDislikeArtist(artist) {
        try {
            await api.delete('/users/artists', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                    artist,
                },
            });

            await setHaveModificationLikes(true);
        } catch (err) {
            console.error({ Error: err });
        }
    }

    async function handlerLikeMusics(music) {
        try {
            await api.post(
                '/users/musics',
                { music },
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );
        } catch (err) {
            console.error({ Error: err });
        }
    }

    async function handlerDislikeMusics(music) {
        try {
            await api.delete('/users/musics', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                    music,
                },
            });
        } catch (err) {
            console.error({ Error: err });
        }
    }

    function Layout() {
        console.log(likeAlbuns);
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
                                                    {likeAlbuns.find(
                                                        like =>
                                                            like.album ===
                                                            item.id
                                                    ) ? (
                                                        <button
                                                            key={item.name}
                                                            onClick={() =>
                                                                handlerDislikeAlbum(
                                                                    item.id
                                                                )
                                                            }
                                                            className="liked"
                                                        >
                                                            <FaHeart />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            key={item.name}
                                                            onClick={() =>
                                                                handlerLikeAlbum(
                                                                    item.id
                                                                )
                                                            }
                                                            className="notLiked"
                                                        >
                                                            <FaRegHeart />
                                                        </button>
                                                    )}
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
                                                    className="link"
                                                    to={{
                                                        pathname:
                                                            '/artist/profile/public',
                                                        state: {
                                                            idArtist: item.id,
                                                        },
                                                    }}
                                                >
                                                    Access profile
                                                </Link>
                                                <br />
                                                {likeArtists.find(
                                                    like =>
                                                        like.artist === item.id
                                                ) ? (
                                                    <button
                                                        onClick={() =>
                                                            handlerDislikeArtist(
                                                                item.id
                                                            )
                                                        }
                                                        className="liked"
                                                    >
                                                        <FaHeart />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            handlerLikeArtist(
                                                                item.id
                                                            )
                                                        }
                                                        className="notLiked"
                                                    >
                                                        <FaRegHeart />
                                                    </button>
                                                )}
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

                                                <button
                                                    onClick={() =>
                                                        PlayMusic(item.path)
                                                    }
                                                >
                                                    Like music
                                                </button>
                                                <br />
                                                {likesMusics.find(
                                                    likes =>
                                                        likes.music === item.id
                                                ) ? (
                                                    <button
                                                        onClick={() =>
                                                            handlerDislikeMusics(
                                                                item.id
                                                            )
                                                        }
                                                        className="liked"
                                                    >
                                                        <FaHeart />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            handlerLikeMusics(
                                                                item.id
                                                            )
                                                        }
                                                        className="notLiked"
                                                    >
                                                        <FaRegHeart />
                                                    </button>
                                                )}
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
