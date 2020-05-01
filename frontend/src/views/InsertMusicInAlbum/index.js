import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Container } from './style';
import DoLogin from '../../components/Layout/DoLogin';
import { FaTimes, FaCheck } from 'react-icons/fa';

function InsertMusicInAlbum(props) {
    const [allMusics, setAllMusics] = useState([]);
    const [musicsInAlbum, setMusicsInAlbum] = useState([]);
    const [musicsInAlbumFiltred, setMusicsInAlbumFiltred] = useState([]);

    async function getDataByAPI() {
        try {
            const response = await api.get('/musics', {
                headers: {
                    authorization: localStorage.getItem('ArtistToken'),
                },
            });
            const MusicsOfArtist = response.data.allmusics.filter(
                (music) => music.singer === props.artistID
            );
            await setAllMusics(MusicsOfArtist);

            const response_two = await api.post('/album/music/unique', {
                albumID: props.idAlbum,
            });
            const sentinel = response_two.data.infoAlbum.filter((item) =>
                allMusics.map(
                    (musics) =>
                        item.album === props.idAlbum &&
                        item.artists === props.artistID &&
                        item.music === musics.id
                )
            );

            await setMusicsInAlbum(sentinel);
            filter();
            return;
        } catch (err) {
            console.error({ Error: err });
            return;
        }
    }

    function filter() {
        const filtred = allMusics.filter((music) =>
            musicsInAlbum.map((item) => music.id === item.music)
        );

        setMusicsInAlbumFiltred(filtred);
    }

    useEffect(() => {
        getDataByAPI();
    }, [musicsInAlbum]);

    function Layout() {
        if (!props.artistID || !props.idAlbum) {
            return <DoLogin />;
        }

        return (
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
                    {musicsInAlbumFiltred.map((music) => (
                        <figure key={music.id} id={music.id}>
                            <button>
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
                    {musicsInAlbum.lenght >= 1
                        ? allMusics.forEach((music) =>
                              musicsInAlbum.find((item) =>
                                  item.music === music.id ? (
                                      <></>
                                  ) : (
                                      <figure key={music.id} id={music.id}>
                                          <button>
                                              <FaCheck />
                                          </button>
                                          <img
                                              src={`http://localhost:3333/img/${music.banner_path}`}
                                              alt="banner music not add"
                                          />
                                          <figcaption>
                                              <h1>{music.name}</h1>{' '}
                                              <small>Genre music</small>
                                          </figcaption>
                                      </figure>
                                  )
                              )
                          )
                        : allMusics.map((musics) => (
                              <figure key={musics.id}>
                                  <button>
                                      <FaCheck />
                                  </button>
                                  <img
                                      src={`http://localhost:3333/img/${musics.banner_path}`}
                                      alt="banner music not add"
                                  />
                                  <figcaption>
                                      <h1>{musics.name}</h1>{' '}
                                      <small>Genre music</small>
                                  </figcaption>
                              </figure>
                          ))}
                </article>
            </Container>
        );
    }

    return Layout();
}

export default InsertMusicInAlbum;
