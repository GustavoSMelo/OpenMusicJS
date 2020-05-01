import React, { useState, useEffect } from 'react';
import api from '../../api';
import DoLogin from '../../components/Layout/DoLogin';
import { Container } from './style';
import Local from './local';
import AlbumMusicFigure from '../../assets/img/guidance__a_warm_place_by_uchuubranko-d5ke0z0.jpg';
import { useHistory } from 'react-router-dom';

function SelectMusicsInAlbum(props) {
    const [allAlbunsArtist, setAllAlbunsArtist] = useState([]);
    const history = useHistory();

    async function getDataByAPI() {
        try {
            const response = await api.get('/album');
            const sentinel = response.data.filter(
                (album) => album.artist === props.artistID
            );
            await setAllAlbunsArtist(sentinel);
            return;
        } catch (err) {
            console.error({ Error: err });
        }
    }

    useEffect(() => {
        getDataByAPI();
    }, []);

    function Layout() {
        if (!props.artistID) {
            return <DoLogin />;
        }
        return (
            <>
                <Container>
                    <section className="albuns">
                        {allAlbunsArtist.map((album) => (
                            <figure
                                key={album.id}
                                onClick={() =>
                                    history.push('/add/music/album', {
                                        artistID: props.artistID,
                                        idAlbum: album.id,
                                        nameAlbum: album.name,
                                        bannerAlbum: album.banner,
                                        genreAlbum: album.genre,
                                    })
                                }
                            >
                                <img
                                    src={`http://localhost:3333/img/${album.banner}`}
                                    alt="album-music"
                                />
                                <figcaption>
                                    <h1>{album.name}</h1>
                                    <small>{album.genre}</small>
                                </figcaption>
                            </figure>
                        ))}
                    </section>
                </Container>
                <Local />
            </>
        );
    }
    return Layout();
}

export default SelectMusicsInAlbum;
