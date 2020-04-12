import React, { useState, useEffect } from 'react';
import { Container } from './style';
import Navbar from '../../components/navbar';
import MP3Player from '../../components/player';
import { FaHeart, FaHeadphones, FaRegHeart } from 'react-icons/fa';
import Global from './global';
import authToken from '../../utils/authToken';
import api from '../../api';
import DoLogin from '../../components/Layout/DoLogin';

function Album(props) {
    const [allMusics, setAllMusics] = useState([]);
    const [relationship, setRelationship] = useState([]);
    const [likeAlbum, setLikeAlbum] = useState([]);
    const [pathMusic, setPathMusic] = useState('');
    const [haveChange, setHaveChange] = useState(false);
    const [token, setToken] = useState(false);

    async function GetDataByAPI() {
        try {
            console.log(props.albumID);
            const infoMusics = await authToken('/musics');
            await setAllMusics(infoMusics.data.allmusics);

            const infoRelationship = await api.post('/album/music/unique', {
                albumID: props.albumID,
            });
            await setRelationship(infoRelationship.data.infoAlbum);

            const likes = await api.post(
                '/users/albuns/show',
                { albumID: props.albumID },
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );

            await setLikeAlbum(likes.data);
            await setToken(true);
            await setHaveChange(false);
        } catch (err) {
            console.log({ Error: err });
            await setToken(false);
        }
    }

    async function playMusic(music) {
        await setPathMusic('');
        await setPathMusic(music);
    }

    async function GiveLikeAlbum() {
        try {
            await api.post(
                '/users/albuns',
                { album: props.albumID },
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );
            await setHaveChange(true);
        } catch (err) {
            console.error({ Error: err });
        }
    }

    async function RemoveLikeAlbum() {
        try {
            await api.delete('/users/albuns', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                    album: props.albumID,
                },
            });
            await setHaveChange(true);
        } catch (err) {
            console.error({ Error: err });
        }
    }

    useEffect(() => {
        GetDataByAPI();
        //eslint-disable-next-line
    }, [haveChange]);

    function Layout() {
        if (token) {
            return (
                <>
                    <Navbar />
                    <Container>
                        <header>
                            <figure>
                                <img
                                    src={`http://localhost:3333/img/${props.banner}`}
                                    alt="avatar_album"
                                />
                            </figure>
                            <span>
                                <h1>{props.name}</h1>
                                <h2>Genre: {props.genre}</h2>
                                {likeAlbum.length <= 0 ? (
                                    <button
                                        className="notLike"
                                        onClick={GiveLikeAlbum}
                                    >
                                        <FaRegHeart />
                                    </button>
                                ) : (
                                    <button
                                        className="like"
                                        onClick={RemoveLikeAlbum}
                                    >
                                        <FaHeart />
                                    </button>
                                )}
                            </span>
                        </header>
                        {relationship.length <= 0 ? (
                            <h1>This album is empty</h1>
                        ) : (
                            <></>
                        )}
                        {relationship.map((relate) =>
                            allMusics.map((musics) =>
                                relate.music === musics.id ? (
                                    <section key={musics.id}>
                                        <figure>
                                            <img
                                                src={`http://localhost:3333/img/${musics.banner_path}`}
                                                alt="banner_image"
                                            />
                                        </figure>
                                        <span>
                                            <h1>{musics.name}</h1>
                                            <button
                                                className="buttonPlayer"
                                                onClick={() =>
                                                    playMusic(musics.path)
                                                }
                                            >
                                                <FaHeadphones /> Listen
                                            </button>
                                        </span>
                                    </section>
                                ) : (
                                    <></>
                                )
                            )
                        )}
                    </Container>
                    {pathMusic ? <MP3Player musicpath={pathMusic} /> : <></>}
                    <Global />
                </>
            );
        } else {
            return <DoLogin />;
        }
    }

    return Layout();
}

export default Album;
