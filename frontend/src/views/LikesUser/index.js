import React, { useState, useEffect } from 'react';
import { Container, ContainerError } from './style';
import Navbar from '../../components/navbar';
import authToken from '../../utils/authToken';
import DoLogin from '../../components/Layout/DoLogin';
import {
    FaMusic,
    FaPaintBrush,
    FaCompactDisc,
    FaHeadphones,
    FaHeart,
} from 'react-icons/fa';

function LikesUser() {
    const [likesArtists, setLikesArtists] = useState([]);
    const [likesMusics, setLikesMusics] = useState([]);
    const [likesAlbuns, setLikesAlbuns] = useState([]);
    const [allArtists, setAllArtists] = useState([]);
    const [allMusics, setAllMusics] = useState([]);
    const [allAlbuns, setAllAlbuns] = useState([]);
    const [haveChangeLikes, setHaveChangeLikes] = useState(false);
    const [notLogged, setNotLogged] = useState(false);

    async function getDatasByAPI() {
        try {
            const infoLikesArtists = await authToken('/users/artists');
            await setLikesArtists(infoLikesArtists.data);

            const infoLikesMusics = await authToken('/users/musics');
            await setLikesMusics(infoLikesMusics.data);

            const infoLikesAlbuns = await authToken('/users/albuns');
            await setLikesAlbuns(infoLikesAlbuns.data);

            const infoAlbuns = await authToken('/album');
            await setAllAlbuns(infoAlbuns.data);

            const infoMusics = await authToken('/musics');
            await setAllMusics(infoMusics.data.allmusics);

            const infoArtist = await authToken('/artist');
            await setAllArtists(infoArtist.data);
        } catch (err) {
            setNotLogged(true);
        }
    }
    useEffect(() => {
        getDatasByAPI();
    }, [haveChangeLikes]);

    function renderMusics() {
        if (likesMusics.length <= 0 || allMusics.length <= 0) {
            return (
                <ContainerError>You don't have any music liked</ContainerError>
            );
        }

        for (let i = 0; i < likesMusics.length; i++) {
            for (let j = 0; j < allMusics.length; j++) {
                if (likesMusics[i].music === allMusics[j].id) {
                    return (
                        <section className="cardBox">
                            <figure>
                                <img
                                    src={`http://localhost:3333/img/${allMusics[j].banner_path}`}
                                    alt="banner music"
                                />
                            </figure>

                            <span>
                                <h1>{allMusics[j].name}</h1>
                                <button className="listen" type="button">
                                    <FaHeadphones /> Listen
                                </button>
                                <button className="like" type="button">
                                    <FaHeart />
                                </button>
                            </span>
                        </section>
                    );
                }
            }
        }
    }

    function Layout() {
        if (notLogged) {
            return <DoLogin />;
        }
        return (
            <>
                <Navbar />
                <Container>
                    <h1>
                        <FaMusic /> Musics:{' '}
                    </h1>
                    {renderMusics()}
                    <h1>
                        <FaPaintBrush /> Artists:{' '}
                    </h1>
                    <h1>
                        <FaCompactDisc /> Albuns:{' '}
                    </h1>
                </Container>
            </>
        );
    }

    return Layout();
}

export default LikesUser;
