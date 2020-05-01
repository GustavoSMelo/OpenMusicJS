import React, { useState, useEffect } from 'react';
import { Container } from './style';
import api from '../../api';
import DoLogin from '../../components/Layout/DoLogin';
import { FaTimes, FaCheck } from 'react-icons/fa';
import Local from './local';

function InsertMusicInAlbum(props) {
    const [Relationship, setRelationship] = useState([]);
    const [allMusics, setAllMusics] = useState([]);
    const [musicsFiltred, setMusicsFiltred] = useState([]);
    const [musicsInsertedFiltred, setMusicsInsertedFiltred] = useState([]);

    async function getDataByAPI() {
        const response = await api.get('/relationship/album/music');
        const relationshipOfAlbum = response.data.filter(
            (item) => item.album === props.idAlbum
        );
        setRelationship(relationshipOfAlbum);

        const response2 = await api.get('/musics', {
            headers: {
                authorization: localStorage.getItem('ArtistToken'),
            },
        });

        const musicsOfArtist = response2.data.allmusics.filter(
            (item) => item.singer === props.artistID
        );
        setAllMusics(musicsOfArtist);

        filter();
    }

    function filter() {
        const filtMI = [];
        Relationship.map((item) =>
            allMusics.filter((musics) =>
                item.music === musics.id ? filtMI.push(musics) : <></>
            )
        );

        console.log(filtMI);
        setMusicsInsertedFiltred(filtMI);

        const filtMF = allMusics;

        musicsInsertedFiltred.map((item) =>
            filtMF.filter((musics, index) =>
                item.id === musics.id ? filtMF.splice(index, 1) : <></>
            )
        );

        console.log(filtMF);
        setMusicsFiltred(filtMF);
    }

    useEffect(() => {
        setTimeout(() => {
            getDataByAPI();
        }, 500);
    }, [Relationship]);

    async function insertMusicInsideAlbum(album, music) {
        try {
            await api.post(
                '/relationship/album/music',
                { album, music },
                {
                    headers: {
                        authorization: localStorage.getItem('ArtistToken'),
                    },
                }
            );
        } catch (err) {
            console.error({ Error: err });
        }
    }

    async function removeMusicInsideAlbum(album, music) {
        try {
            await api.delete('/relationship/album/music', {
                headers: {
                    authorization: localStorage.getItem('ArtistToken'),
                    album,
                    music,
                },
            });
        } catch (err) {
            console.error({ Error: err });
        }
    }

    function Layout() {
        if (!props.artistID || !props.idAlbum) {
            return <DoLogin />;
        }

        return (
            <>
                <Container>
                    <span>
                        <figure>
                            <img
                                src={`http://localhost:3333/img/${props.bannerAlbum}`}
                                alt="banner album"
                            />
                            <figcaption>
                                <h1>{props.nameAlbum}</h1>{' '}
                                <small>{props.genreAlbum}</small>
                            </figcaption>
                        </figure>
                    </span>
                    <section>
                        <h1>Musics inside album</h1>
                        {musicsInsertedFiltred.map((music) => (
                            <figure key={music.id} id={music.id}>
                                <button
                                    onClick={() =>
                                        removeMusicInsideAlbum(
                                            props.idAlbum,
                                            music.id
                                        )
                                    }
                                >
                                    <FaTimes />
                                </button>
                                <img
                                    src={`http://localhost:3333/img/${music.banner_path}`}
                                    alt="banner music"
                                />
                                <figcaption>
                                    <h1>{music.name}</h1>{' '}
                                    <small>{music.genre}</small>
                                </figcaption>
                            </figure>
                        ))}
                    </section>
                    <article>
                        <h1>Musics outside album</h1>
                        {musicsFiltred.map((music) => (
                            <figure key={music.id} id={music.id}>
                                <button
                                    onClick={() =>
                                        insertMusicInsideAlbum(
                                            props.idAlbum,
                                            music.id
                                        )
                                    }
                                >
                                    <FaCheck />
                                </button>
                                <img
                                    src={`http://localhost:3333/img/${music.banner_path}`}
                                    alt="banner music"
                                />
                                <figcaption>
                                    <h1>{music.name}</h1>{' '}
                                    <small>{music.genre}</small>
                                </figcaption>
                            </figure>
                        ))}
                    </article>
                </Container>
                <Local />
            </>
        );
    }

    return Layout();
}

export default InsertMusicInAlbum;
