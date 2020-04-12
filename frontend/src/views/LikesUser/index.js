import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import DoLogin from '../../components/Layout/DoLogin';
import authToken from '../../utils/authToken';
import { Container, ContainerError } from './style';
import {
    FaPaintBrush,
    FaCompactDisc,
    FaMusic,
    FaHeart,
    FaHeadphonesAlt,
} from 'react-icons/fa';
import MP3Player from '../../components/player';
import { Link } from 'react-router-dom';
import api from '../../api';

function LikesUser() {
    const [allMusics, setAllMusics] = useState([]);
    const [LikesMusics, setLikesMusics] = useState([]);
    const [allArtists, setAllArtists] = useState([]);
    const [likesArtists, setLikesArtists] = useState([]);
    const [allAlbuns, setAllAlbuns] = useState([]);
    const [likesAlbuns, setLikesAlbuns] = useState([]);
    const [pathMusic, setPathMusic] = useState('');
    const [haveChange, setHaveChange] = useState(false);
    const [auth, setAuth] = useState(false);
    async function getDataByAPI() {
        try {
            const info = await authToken('/musics');
            setAllMusics(info.data.allmusics);
            setLikesMusics(info.data.likes_of_user);

            const infoArtists = await authToken('/artist');
            setAllArtists(infoArtists.data);

            const infoArtistsLikes = await authToken('/users/artists');
            setLikesArtists(infoArtistsLikes.data);

            const infoAlbuns = await authToken('/album');
            setAllAlbuns(infoAlbuns.data);

            const infoAlbunsLikes = await authToken('/users/albuns');
            setLikesAlbuns(infoAlbunsLikes.data);

            console.log(infoAlbunsLikes);

            setAuth(true);
            setHaveChange(false);
        } catch (err) {
            setAuth(false);
        }
    }

    useEffect(() => {
        getDataByAPI();
    }, [haveChange]);

    async function DislikeMusic(music) {
        await api.delete('/users/musics', {
            headers: {
                Authorization: localStorage.getItem('token'),
                music,
            },
        });

        await setHaveChange(true);
    }

    async function DislikeArtist(artist) {
        await api.delete('/users/artists', {
            headers: {
                Authorization: localStorage.getItem('token'),
                artist,
            },
        });

        await setHaveChange(true);
    }

    async function DislikeAlbum(album) {
        await api.delete('/users/albuns', {
            headers: {
                Authorization: localStorage.getItem('token'),
                album,
            },
        });

        await setHaveChange(true);
    }

    async function playMusic(music) {
        await setPathMusic('');
        await setPathMusic(music);
    }

    function Layout() {
        if (auth) {
            return (
                <>
                    <Navbar />
                    <Container>
                        <h1>
                            <FaMusic /> Musics:{' '}
                        </h1>
                        <article>
                            {LikesMusics.length <= 0 ||
                            allMusics.length <= 0 ? (
                                <ContainerError>
                                    <h2>You don't like any music yet</h2>
                                </ContainerError>
                            ) : (
                                <></>
                            )}
                            {LikesMusics.map((likes) =>
                                allMusics.map((musics) =>
                                    musics.id === likes.music ? (
                                        <section key={`${musics.id}-musics`}>
                                            <figure>
                                                <img
                                                    src={`http://localhost:3333/img/${musics.banner_path}`}
                                                    alt="bannerMusic"
                                                />
                                            </figure>
                                            <span>
                                                <h1>{musics.name}</h1>
                                                <button
                                                    className="classicButton"
                                                    onClick={() =>
                                                        playMusic(musics.path)
                                                    }
                                                >
                                                    <FaHeadphonesAlt /> Listen
                                                </button>
                                                <button
                                                    className="heart"
                                                    onClick={() =>
                                                        DislikeMusic(musics.id)
                                                    }
                                                >
                                                    <FaHeart />
                                                </button>
                                            </span>
                                        </section>
                                    ) : (
                                        <></>
                                    )
                                )
                            )}
                        </article>

                        <h1>
                            <FaPaintBrush /> Artists
                        </h1>

                        <article>
                            {allArtists.length <= 0 ||
                            likesArtists.length <= 0 ? (
                                <ContainerError>
                                    You don't have any artist liked yet
                                </ContainerError>
                            ) : (
                                <></>
                            )}

                            {likesArtists.map((likes) =>
                                allArtists.map((artists) =>
                                    artists.id === likes.artist ? (
                                        <section key={`${artists.id}-Artist`}>
                                            <figure>
                                                <img
                                                    src={`http://localhost:3333/img/${artists.avatar}`}
                                                    alt="bannerMusic"
                                                />
                                            </figure>
                                            <span>
                                                <h1>
                                                    {artists.name} |{' '}
                                                    {artists.name_artistic}
                                                </h1>
                                                <Link
                                                    className="classicButton"
                                                    to={{
                                                        pathname:
                                                            '/artist/profile/public',
                                                        state: {
                                                            idArtist:
                                                                artists.id,
                                                        },
                                                    }}
                                                >
                                                    Access
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        DislikeArtist(
                                                            artists.id
                                                        )
                                                    }
                                                    className="heart"
                                                >
                                                    <FaHeart />
                                                </button>
                                            </span>
                                        </section>
                                    ) : (
                                        <></>
                                    )
                                )
                            )}
                        </article>

                        <h1>
                            <FaCompactDisc /> Albuns
                        </h1>

                        <article>
                            {allAlbuns.length <= 0 ||
                            likesAlbuns.length <= 0 ? (
                                <ContainerError>
                                    You don't like any album yet
                                </ContainerError>
                            ) : (
                                <></>
                            )}
                            {likesAlbuns.map((likes) =>
                                allAlbuns.map((albuns) =>
                                    albuns.id === likes.album ? (
                                        <section>
                                            <figure>
                                                <img
                                                    src={`http://localhost:3333/img/${albuns.banner}`}
                                                    alt="bannerMusic"
                                                />
                                            </figure>
                                            <span>
                                                <h1>{albuns.name}</h1>
                                                <Link
                                                    className="link"
                                                    to={{
                                                        pathname: '/album',
                                                        state: {
                                                            albumID: albuns.id,
                                                            name: albuns.name,
                                                            genre: albuns.genre,
                                                            banner:
                                                                albuns.banner,
                                                        },
                                                    }}
                                                >
                                                    Access{' '}
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        DislikeAlbum(albuns.id)
                                                    }
                                                    className="heart"
                                                >
                                                    <FaHeart />
                                                </button>
                                            </span>
                                        </section>
                                    ) : (
                                        <></>
                                    )
                                )
                            )}
                        </article>
                    </Container>
                    {pathMusic ? <MP3Player musicpath={pathMusic} /> : <></>}
                </>
            );
        }

        return <DoLogin />;
    }

    return Layout();
}

export default LikesUser;
