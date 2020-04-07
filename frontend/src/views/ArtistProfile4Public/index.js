import React, { useEffect, useState } from 'react';
import api from '../../api';
import Navbar from '../../components/navbar';
import DoLogin from '../../components/Layout/DoLogin';
import Global from './global';
import { Container, ContainerError } from './style';
import { FaHeadphones, FaHeart, FaRegHeart } from 'react-icons/fa';
import MP3Player from '../../components/player';

function ArtistProfile4Public(props) {
    const [haveInfo, setHaveInfo] = useState([]);
    const [PathMusic, setPathMusic] = useState('');
    const [likeArtist, setLikeArtist] = useState([]);
    const [giveLike, setGiveLike] = useState(false);

    async function getAPIInfo() {
        try {
            const { idArtist } = props;
            const info = await api.post(
                '/artist/info',
                { idArtist },
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );

            const likeInfo = await api.get('/users/artists', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });

            await setHaveInfo(info.data);
            await setLikeArtist(likeInfo.data);
            await setGiveLike(false);
        } catch (err) {
            console.error({ error: err });
        }
    }

    useEffect(() => {
        getAPIInfo();
    }, [giveLike]);

    async function addLikeArtist(artist) {
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

            await setGiveLike(true);
        } catch (err) {
            console.error({ err });
        }
    }

    async function removeLikeArtist(artist) {
        try {
            await api.delete('/users/artists', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                    artist,
                },
            });

            await setGiveLike(true);
        } catch (err) {
            console.error({ err });
        }
    }

    async function playMusic(music) {
        await setPathMusic(null);
        await setPathMusic(music);
    }

    function layout() {
        if (haveInfo.length <= 0 || !haveInfo) {
            return <DoLogin />;
        } else {
            return (
                <>
                    <Navbar />
                    <Container>
                        <section className="artistInfo">
                            <figure>
                                <img
                                    src={`http://localhost:3333/img/${haveInfo.Artist.avatar}`}
                                    alt="avatar artist"
                                />
                            </figure>
                            <h1>
                                {haveInfo.Artist.name_artistic} |{' '}
                                {haveInfo.Artist.name}{' '}
                            </h1>{' '}
                            {likeArtist.find(
                                (item) => haveInfo.Artist.id === item.artist
                            ) ? (
                                <button
                                    onClick={() =>
                                        removeLikeArtist(haveInfo.Artist.id)
                                    }
                                    className="liked"
                                >
                                    <span>
                                        <FaHeart /> Dislike
                                    </span>
                                </button>
                            ) : (
                                <button
                                    onClick={() =>
                                        addLikeArtist(haveInfo.Artist.id)
                                    }
                                    className="notLiked"
                                >
                                    <span>
                                        <FaRegHeart /> Like
                                    </span>
                                </button>
                            )}{' '}
                        </section>
                        <section className="artistMusic">
                            <h1>Musics</h1>
                            {haveInfo.Musics.musicsOfArtists.length >= 1 ? (
                                haveInfo.Musics.musicsOfArtists.map((item) => (
                                    <article key={item.id}>
                                        <figure>
                                            <img
                                                src={`http://localhost:3333/img/${item.banner_path}`}
                                                alt="music banner"
                                            />
                                        </figure>
                                        <section>
                                            <h1>{item.name}</h1>
                                            <h2>{item.genre}</h2>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    playMusic(item.path)
                                                }
                                            >
                                                {' '}
                                                <FaHeadphones /> Listen
                                            </button>
                                        </section>
                                    </article>
                                ))
                            ) : (
                                <ContainerError>
                                    <h1>
                                        This artist doesn't upload any music yet
                                    </h1>
                                </ContainerError>
                            )}
                        </section>
                    </Container>
                    <Global />
                    {PathMusic ? <MP3Player musicpath={PathMusic} /> : <></>}
                </>
            );
        }
    }

    return layout();
}

export default ArtistProfile4Public;
