import React, { useEffect, useState } from 'react';
import authToken from '../../utils/authToken';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import {
    FaEnvelope,
    FaPen,
    FaTrash,
    FaFolderOpen,
    FaMusic,
    FaBroom,
} from 'react-icons/fa';
import { Container } from './styled';

function Profile() {
    const [user, setUser] = useState('');
    const [UserAlbunsFavorites, setUserAlbunsFavorites] = useState('');
    const [UserMusicsFavorites, setUserMusicsFavorites] = useState('');
    const [UserArtistsFavorites, setUserArtistsFavorites] = useState('');

    useEffect(() => {
        async function getApiData() {
            try {
                const datas = await authToken('/user/show');
                console.log(datas);
                await setUser(datas.data.user);
                await setUserAlbunsFavorites(
                    datas.data.user_albuns.dataUserAlbuns
                );
                await setUserArtistsFavorites(
                    datas.data.user_artist.dataUserArtists
                );
                await setUserMusicsFavorites(
                    datas.data.user_musics.dataUserMusics
                );
            } catch (err) {
                console.error('Some error happens ');
            }
        }
        getApiData();
    }, []);

    function RenderWithUser() {
        console.log(user);
        console.log(UserAlbunsFavorites);
        console.log(UserMusicsFavorites);
        console.log(UserArtistsFavorites);
        return (
            <>
                <Navbar />
                <Container>
                    <img src={`http://localhost:3333/img/${user.avatar}`} />
                    <h1>{user.name}</h1>
                    <h2>
                        {' '}
                        <FaEnvelope /> {user.email}
                    </h2>

                    <span>
                        <button className="btnEdit">
                            <FaPen /> Edit
                        </button>
                        <button className="btnDelete">
                            <FaTrash /> Delete
                        </button>
                    </span>

                    <section>
                        <h1>
                            {' '}
                            <FaFolderOpen /> Albuns liked:{' '}
                        </h1>
                        {UserAlbunsFavorites.length >= 1 ? (
                            <h2>Ok</h2>
                        ) : (
                            <h2 className="ErrorBox">
                                You don't have any album favorited{' '}
                            </h2>
                        )}
                    </section>

                    <section>
                        <h1>
                            <FaMusic /> Musics liked:{' '}
                        </h1>
                        {UserMusicsFavorites.length >= 1 ? (
                            <h2>OK</h2>
                        ) : (
                            <h2 className="ErrorBox">
                                You don't have any musics favorited{' '}
                            </h2>
                        )}
                    </section>

                    <section>
                        <h1>
                            <FaBroom /> Artists liked:{' '}
                        </h1>
                        {UserArtistsFavorites.length >= 1 ? (
                            <h2>OK</h2>
                        ) : (
                            <h2 className="ErrorBox">
                                You don't have any artist favorited{' '}
                            </h2>
                        )}
                    </section>
                </Container>
                <Footer />
            </>
        );
    }

    function RenderWithOutUser() {
        return <h1>Please, make login</h1>;
    }

    return <>{user ? RenderWithUser() : RenderWithOutUser()}</>;
}

export default Profile;
