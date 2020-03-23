import React, { useEffect, useState } from 'react';
import api from '../../api';
import Navbar from '../../components/navbar';
import DoLogin from '../../components/Layout/DoLogin';
import Global from './global';
import { Container, ContainerError } from './style';
import { FaHeart, FaHeadphones } from 'react-icons/fa';
import MP3Player from '../../components/player';

function ArtistProfile4Public(props) {
    const [haveInfo, setHaveInfo] = useState([]);
    const [PathMusic, setPathMusic] = useState('');
    useEffect(() => {
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
                console.log(info.data);
                setHaveInfo(info.data);
            } catch (err) {
                console.error({ error: err });
            }
        }

        getAPIInfo();
    }, []);

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
                            </h1>
                            <button>
                                {' '}
                                <span className="icon-hearth">
                                    <FaHeart />
                                </span>{' '}
                                Like
                            </button>
                        </section>
                        <section className="artistMusic">
                            <h1>Musics</h1>
                            {haveInfo.Musics.musicsOfArtists.length >= 1 ? (
                                haveInfo.Musics.musicsOfArtists.map(item => (
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
