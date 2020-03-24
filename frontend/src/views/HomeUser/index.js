import React, { useEffect, useState } from 'react';
import authToken from '../../utils/authToken';
import Navbar from '../../components/navbar';
import { Container } from './styled';
import { FaThumbsUp, FaHeadphones } from 'react-icons/fa';
import Footer from '../../components/footer';
import Player from '../../components/player';
import api from '../../api';
import DoLogin from '../../components/Layout/DoLogin';

function Home() {
    const [info, setInfo] = useState('');
    const [haveMusic, setHaveMusic] = useState(false);
    const [MusicName, setMusicName] = useState('');
    const [likesUser, setLikesUser] = useState([]);

    useEffect(() => {
        async function getDataByAPI() {
            const data = await authToken('/musics');

            if (!data) {
                return setInfo(null);
            }
            setInfo(data.data.allmusics);
            setLikesUser(data.data.likes_of_user);
        }

        getDataByAPI();
    }, [likesUser]);

    async function ListenMusic(musicpath) {
        await setHaveMusic(false);
        await setMusicName(musicpath);
        return await setHaveMusic(true);
    }

    async function handlerLikeMusic(music) {
        try {
            const newinfos = await api.post('/users/musics', music, {
                headers: {
                    authorization: localStorage.getItem('token'),
                    music,
                },
            });
        } catch (err) {
            return console.error({ Error: err });
        }
    }

    async function handlerRemoveLikeMusic(music) {
        try {
            const response = await api.delete('/users/musics', {
                headers: {
                    authorization: localStorage.getItem('token'),
                    music,
                },
            });
        } catch (err) {
            console.error({ Error: err });
        }
    }

    function renderButtonLike(id) {
        if (likesUser.length >= 1) {
            likesUser.map(like => {
                if (like.music === id) {
                    return (
                        <button
                            key={like.id}
                            className="liked"
                            type="button"
                            onClick={() => handlerRemoveLikeMusic(like.music)}
                        >
                            <FaThumbsUp />
                        </button>
                    );
                } else {
                    return (
                        <button
                            key={like.id}
                            className="needlike"
                            type="button"
                            onClick={() => handlerLikeMusic(like.music)}
                        >
                            <FaThumbsUp />
                        </button>
                    );
                }
            });
        } else {
            return (
                <button
                    key={id}
                    className="needlike"
                    type="button"
                    onClick={() => handlerLikeMusic(id)}
                >
                    <FaThumbsUp />
                </button>
            );
        }
    }

    function LayoutLogged() {
        return (
            <>
                <Navbar />
                <Container>
                    <h1>New musics: </h1>
                    <ul>
                        {info ? (
                            info.map(item => (
                                <li key={item.id}>
                                    <img
                                        src={`http://localhost:3333/img/${item.banner_path}`}
                                        alt="banner of music"
                                    />
                                    <p>{item.name}</p>
                                    <p>{item.genre}</p>

                                    <span>
                                        <button
                                            className="listen"
                                            type="button"
                                            onClick={() =>
                                                ListenMusic(item.path)
                                            } //Error = ListenMusic(item.path) //Success = () => ListenMusic(item.path)
                                        >
                                            <FaHeadphones /> Listen
                                            {likesUser.map(item => {})}
                                        </button>

                                        {renderButtonLike(item.id)}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <h1>
                                Doesn't have any music registred in database{' '}
                            </h1>
                        )}
                    </ul>
                </Container>
                {haveMusic ? <Player musicpath={MusicName} /> : <></>}
                <Footer />
            </>
        );
    }

    function LayoutNotLogged() {
        return <DoLogin />;
    }

    return <>{info ? LayoutLogged() : LayoutNotLogged()}</>;
}

export default Home;
