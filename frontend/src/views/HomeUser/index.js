import React, { useEffect, useState } from 'react';
import { Container } from './styled';
import Navbar from '../../components/navbar';
import MP3Player from '../../components/player';
import api from '../../api';
import DoLogin from '../../components/Layout/DoLogin';
import { FaHeadphonesAlt, FaHeart, FaRegHeart } from 'react-icons/fa';
import rnd from '../../utils/randomUniqueKey';

function HomeUser() {
    const [musics, setMusics] = useState([]);
    const [likes, setLikes] = useState([]);
    const [UserOkay, setUserOkay] = useState(false);
    const [LoadMusic, setLoadMusic] = useState('');
    async function getDatabyAPI() {
        try {
            const response = await api.get('/musics', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });

            await setMusics(response.data.allmusics);
            await setLikes(response.data.likes_of_user);
            await setUserOkay(true);
        } catch (err) {
            return await setUserOkay(false);
        }
    }

    useEffect(() => {
        getDatabyAPI();
    }, [likes]);

    async function ReturnMP3Player(music) {
        await setLoadMusic('');
        return await setLoadMusic(music);
    }

    async function handlerAddLike(music) {
        try {
            const { status } = await api.post(
                '/users/musics',
                { music },
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );

            if (status !== 200) {
                return console.error('Error to add a new like');
            }

            const tmpVectorLikes = likes;
            tmpVectorLikes.push(music);

            await setLikes(tmpVectorLikes);
        } catch (err) {
            return console.log({ err });
        }
    }

    async function handlerDeleteLike(music) {
        try {
            await api.delete('/users/musics', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                    music,
                },
            });

            await setLikes(likes.filter(like => like !== music));
        } catch (err) {
            return console.log({ err });
        }
    }

    function layout() {
        if (UserOkay) {
            return (
                <>
                    <Navbar />
                    <Container>
                        <section>
                            <h1>New Musics: </h1>
                            <ul>
                                {musics.map(song => (
                                    <li key={song.id}>
                                        <figure>
                                            <img
                                                src={`http://localhost:3333/img/${song.banner_path}`}
                                                alt="MusicBanner"
                                            />
                                        </figure>
                                        <h1>{song.name}</h1>
                                        <h2>{song.genre}</h2>
                                        <br />
                                        <button
                                            onClick={() =>
                                                ReturnMP3Player(song.path)
                                            }
                                        >
                                            <FaHeadphonesAlt /> Listen
                                        </button>
                                        {likes.find(
                                            like => like.music === song.id
                                        ) ? (
                                            <button
                                                key={rnd}
                                                className="liked"
                                                onClick={() =>
                                                    handlerDeleteLike(song.id)
                                                }
                                            >
                                                <FaHeart />
                                            </button>
                                        ) : (
                                            <button
                                                key={rnd}
                                                className="notLiked"
                                                onClick={() =>
                                                    handlerAddLike(song.id)
                                                }
                                            >
                                                <FaRegHeart />
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </Container>
                    {LoadMusic ? <MP3Player musicpath={LoadMusic} /> : <></>}
                </>
            );
        }

        return <DoLogin />;
    }

    return layout();
}

export default HomeUser;
