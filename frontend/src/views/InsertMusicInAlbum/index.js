import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Container, Card, Pictures } from './style';
import { FaPlus, FaTrash } from 'react-icons/fa';

function InsertMusicInAlbum(props) {
    const [musicsInserteds, setMusicsInserteds] = useState([]);
    const [musicsOutside, setMusicsOutside] = useState([]);
    const [update, setUpdate] = useState(true);

    async function getDataByAPI() {
        await setUpdate(false);
        const musics = await api.get('/musics', {
            headers: {
                Authorization: localStorage.getItem('ArtistToken'),
            },
        });

        const musicsOfArtist = musics.data.allmusics.filter(
            (music) => music.singer === props.artistID
        );

        const album = await api.post('/album/music/unique', {
            albumID: props.idAlbum,
        });

        const musicsInsideThisAlbum = musicsOfArtist.map((music) => {
            const finded = album.data.infoAlbum.find(
                (albm) => albm.music === music.id
            );

            if (finded) {
                return music;
            }
        });

        const musicsInsideThisAlbumFiltred = musicsInsideThisAlbum.filter(
            (music) => music !== undefined
        );

        const musicsOutsideAlbum = musicsOfArtist.map((msc) => {
            const findedMusic = album.data.infoAlbum.find(
                (albm) => albm.music === msc.id
            );

            if (findedMusic === undefined) {
                return msc;
            }
        });

        const musicsOutsideAlbumFiltred = musicsOutsideAlbum.filter(
            (msc) => msc !== undefined
        );

        console.log(musicsInsideThisAlbumFiltred);

        console.log(album);

        setMusicsInserteds(musicsInsideThisAlbumFiltred);

        setMusicsOutside(musicsOutsideAlbumFiltred);
    }

    async function removeMusicInAlbum(music) {
        try {
            await api.delete('/relationship/album/music', {
                headers: {
                    Authorization: localStorage.getItem('ArtistToken'),
                    music,
                    album: props.idAlbum,
                },
            });

            await setUpdate(true);
            await setMusicsInserteds([]);
        } catch (err) {
            console.error('error to remove music inside album');
            console.error(err);
        }
    }

    async function addMusicInAlbum(music) {
        try {
            await api.post(
                '/relationship/album/music',
                { music, album: props.idAlbum },
                {
                    headers: {
                        Authorization: localStorage.getItem('ArtistToken'),
                    },
                }
            );

            await setUpdate(true);
        } catch (err) {
            console.error('error to insert music inside album');
            console.error(err);
        }
    }

    useEffect(() => {
        getDataByAPI();
    }, [update, musicsInserteds]);

    function Layout() {
        return (
            <Container>
                <aside>
                    <Card>
                        <figure>
                            <Pictures
                                src={`http://localhost:3333/img/${props.bannerAlbum}`}
                            />
                        </figure>
                        <h2>{props.nameAlbum}</h2>
                        <h1>{props.genreAlbum}</h1>
                    </Card>
                </aside>
                <section>
                    <h1>Musics inside album </h1>
                    <br />
                    {musicsInserteds.lenght <= 0 ? (
                        <></>
                    ) : (
                        musicsInserteds.map((mscInsert) => (
                            <Card key={mscInsert.id}>
                                <figure>
                                    <Pictures
                                        src={`http://localhost:3333/img/${mscInsert.banner_path}`}
                                    />
                                </figure>
                                <button
                                    onClick={() =>
                                        removeMusicInAlbum(mscInsert.id)
                                    }
                                    className="ControlButtonDelete"
                                >
                                    <FaTrash />
                                </button>
                                <h2>{mscInsert.name}</h2>
                                <h2>{mscInsert.genre}</h2>
                            </Card>
                        ))
                    )}
                </section>
                <article>
                    <h1>Musics outside album </h1>
                    <br />
                    {musicsOutside.lenght <= 0 ? (
                        <></>
                    ) : (
                        musicsOutside.map((mscOutside) => (
                            <Card key={mscOutside.id}>
                                <figure>
                                    <Pictures
                                        src={`http://localhost:3333/img/${mscOutside.banner_path}`}
                                    />
                                </figure>
                                <button
                                    onClick={() =>
                                        addMusicInAlbum(mscOutside.id)
                                    }
                                    className="ControlButtonInsert"
                                >
                                    <FaPlus />
                                </button>
                                <h2>{mscOutside.name}</h2>
                                <h2>{mscOutside.genre}</h2>
                            </Card>
                        ))
                    )}
                </article>
            </Container>
        );
    }

    return Layout();
}

export default InsertMusicInAlbum;
