import React, { useEffect, useState } from 'react';
import api from '../../api';
import Navbar from '../../components/navbar/index';
import DoLogin from '../../components/Layout/DoLogin';
import { Container, ContainerError, ContainerAlbum } from './styled';
import { FaSearch } from 'react-icons/fa';

function Search() {
    const [Auth, setAuth] = useState('');
    const [Musics, setMusics] = useState([]);
    const [Artists, setArtists] = useState([]);
    const [Users, setUsers] = useState([]);
    const [Albuns, setAlbuns] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [Status4User, setStatus4User] = useState('');
    useEffect(() => {
        try {
            async function getTokenAPI() {
                const auth = await api.get('/search', {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                if (!auth) {
                    return console.error({ auth });
                }

                setAuth(auth);
            }

            getTokenAPI();
        } catch (err) {
            console.error({ err });
        }
    }, []);

    async function SearchMethod() {
        if (searchString === null || searchString === '') {
            return setStatus4User(
                <ContainerError>
                    The value of field is null, please, insert it
                </ContainerError>
            );
        }

        try {
            const info = await api.post(
                '/search',
                { searchString },
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );

            setMusics(info.data[0].Musics);
            setArtists(info.data[1].Artists);
            setAlbuns(info.data[2].Albums);
            setUsers(info.data[3].Users);
        } catch (err) {
            return setStatus4User(
                <ContainerError>{err.response.data.Error}</ContainerError>
            );
        }
    }

    function Layout() {
        return (
            <>
                <Navbar />
                <Container>
                    <form>
                        <input
                            placeholder="Insert a name of artist, music, album and etc."
                            onChange={e => setSearchString(e.target.value)}
                            value={searchString}
                        />
                        <button type="button" onClick={SearchMethod}>
                            <FaSearch />
                        </button>
                    </form>
                    {Status4User}
                    <section>
                        {Albuns.length >= 1 ? (
                            <>
                                <h1>Albuns</h1>
                                <ul>
                                    {Albuns.map(item => {
                                        return (
                                            <ContainerAlbum key={item.id}>
                                                <figure>
                                                    <img
                                                        src={`http://localhost:3333/img/${item.banner}`}
                                                        alt="banner album"
                                                    />
                                                </figure>
                                                <article>
                                                    <span>Name:</span>{' '}
                                                    {item.name} <br />
                                                    <span>Genre:</span>{' '}
                                                    {item.genre}{' '}
                                                    {
                                                        <p className="desc">
                                                            {
                                                                (item.description =
                                                                    'Description not pass')
                                                            }
                                                        </p>
                                                    }
                                                </article>
                                            </ContainerAlbum>
                                        );
                                    })}
                                </ul>
                            </>
                        ) : (
                            <></>
                        )}
                        {Artists.length >= 1 ? <h1>Artists</h1> : <></>}
                        {Users.length >= 1 ? <h1>Users</h1> : <></>}
                        {Musics.length >= 1 ? <h1>Musics</h1> : <></>}
                    </section>
                </Container>
            </>
        );
    }

    return <>{Auth ? Layout() : <DoLogin />}</>;
}

export default Search;
