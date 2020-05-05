import React, { useState, useEffect } from 'react';
import { NavHeader, Container } from './style';
import DoLogin from '../../components/Layout/DoLogin';
import { FaPowerOff, FaFolderPlus, FaPencilAlt, FaHeart } from 'react-icons/fa';
import { useHistory, Link } from 'react-router-dom';
import Footer from '../../components/footer';
import api from '../../api';

function DashboardArtists(props) {
    const [qntLikes, setQntLikes] = useState(0);
    const history = useHistory();
    async function getDataByAPI() {
        const response = await api.get('/users/artists/show', {
            headers: {
                authorization: localStorage.getItem('ArtistToken'),
            },
        });

        await setQntLikes(response.data.allLikes.count);
        console.log(qntLikes);
        return;
    }

    useEffect(() => {
        getDataByAPI();
    }, [qntLikes]);

    function Logoff() {
        localStorage.setItem('ArtistToken', '');
        history.push('/');
    }

    function Layout() {
        if (!props.artistID) {
            return <DoLogin />;
        }
        return (
            <>
                <NavHeader>
                    <span className="content">
                        <Link
                            className="link"
                            to={{
                                pathname: '/edit/profile/artist',
                                state: {
                                    artistID: props.artistID,
                                    name_artistic: props.name_artistic,
                                    name: props.name,
                                    avatar: props.avatar,
                                    artistEmail: props.artistEmail,
                                },
                            }}
                        >
                            <figure>
                                <img
                                    src={`http://localhost:3333/img/${props.avatar}`}
                                    alt="avatar artist"
                                />
                                <figcaption>
                                    Welcome, {props.name_artistic}
                                </figcaption>
                            </figure>
                        </Link>
                        <span>
                            <button onClick={Logoff} className="logoff">
                                <FaPowerOff />
                            </button>
                        </span>
                    </span>
                </NavHeader>
                <Container>
                    <div className="Relevance">
                        <span>
                            <h1>All likes of this user: </h1>
                            <br />
                            <h1>
                                <FaHeart className="icon-heart" />
                                <br />
                                {qntLikes}
                            </h1>
                        </span>
                    </div>
                    <div className="inserts">
                        <span>
                            <Link
                                className="btnMenu"
                                to={{
                                    pathname: '/add/album',
                                    state: {
                                        artistID: props.artistID,
                                    },
                                }}
                            >
                                <section>
                                    <FaFolderPlus /> New Album
                                </section>
                            </Link>

                            <Link
                                className="btnMenu"
                                to={{
                                    pathname: '/index/album',
                                    state: {
                                        artistID: props.artistID,
                                    },
                                }}
                            >
                                <section>
                                    <FaPencilAlt /> Edit album
                                </section>
                            </Link>
                        </span>

                        <span>
                            <Link
                                className="btnMenu"
                                to={{
                                    state: {
                                        artistID: props.artistID,
                                    },
                                    pathname: '/add/music',
                                }}
                            >
                                <section>
                                    <FaFolderPlus /> New Music
                                </section>
                            </Link>

                            <Link
                                className="btnMenu"
                                to={{
                                    pathname: '/show/musics/for/edit',
                                    state: {
                                        artistID: props.artistID,
                                    },
                                }}
                            >
                                <section>
                                    <FaPencilAlt /> Edit music
                                </section>
                            </Link>
                        </span>

                        <span>
                            <Link
                                className="btnMenu"
                                to={{
                                    pathname: '/select/music/album',
                                    state: { artistID: props.artistID },
                                }}
                            >
                                <section>
                                    <FaFolderPlus /> insert or delete a music
                                    inside album
                                </section>
                            </Link>
                        </span>
                    </div>
                </Container>
                <Footer />
            </>
        );
    }

    return Layout();
}

export default DashboardArtists;
