import React, { useEffect, useState } from 'react';
import api from '../../api';
import Navbar from '../../components/navbar';
import DoLogin from '../../components/Layout/DoLogin';
import Global from './global';
import Footer from '../../components/footer';
import { Container } from './style';
import { FaHeart } from 'react-icons/fa';

function ArtistProfile4Public(props) {
    const [haveInfo, setHaveInfo] = useState([]);
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
                            {haveInfo.Musics.musicOfArtist ? (
                                <h1>Ok</h1>
                            ) : (
                                <h1>
                                    This artist doesn't upload any music yet
                                </h1>
                            )}
                        </section>
                    </Container>
                    <Global />
                </>
            );
        }
    }

    return layout();
}

export default ArtistProfile4Public;
