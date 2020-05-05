import React, { useState } from 'react';
import DoLogin from '../../components/Layout/DoLogin';
import { Formy, Container } from './style';
import {
    FaPencilAlt,
    FaUserAlt,
    FaPaintBrush,
    FaMailBulk,
    FaKey,
    FaRegImage,
} from 'react-icons/fa';
import api from '../../api';
import { useHistory } from 'react-router-dom';

function EditProfileArtist(props) {
    const [newName, setNewName] = useState(props.name);
    const [NewNameArtists, setNewNameArtistis] = useState(props.name_artistic);
    const [newEmail, setNewEmail] = useState(props.artistEmail);
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newAvatar, setNewAvatar] = useState([]);
    const history = useHistory();

    async function handleButtonClick(e) {
        e.preventDefault();

        const fd = new FormData();
        fd.append('name', newName);
        fd.append('name_artistic', NewNameArtists);
        fd.append('newemail', newEmail);
        fd.append('pass', newPassword);
        fd.append('oldpass', oldPassword);
        fd.append('avatar', newAvatar);
        try {
            await api.put('/artist', fd, {
                headers: {
                    authorization: localStorage.getItem('ArtistToken'),
                    'content-type': `multipart/form-data; boundary=${fd.boundary}`,
                },
            });

            history.push('/login/artist');
        } catch (err) {
            console.error({ Error: err });
        }
    }

    function Layout() {
        if (!props.artistID) {
            return <DoLogin />;
        }

        return (
            <Container>
                <Formy>
                    <figure>
                        <img
                            src={`http://localhost:3333/img/${props.avatar}`}
                            alt="Avatar user"
                        />
                    </figure>

                    <span>
                        <label>
                            <FaUserAlt />{' '}
                        </label>
                        <input
                            type="text"
                            placeholder="name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            required="required"
                        />
                    </span>

                    <span>
                        <label>
                            <FaPaintBrush />{' '}
                        </label>
                        <input
                            type="text"
                            placeholder="name_artistic"
                            value={NewNameArtists}
                            onChange={(e) => setNewNameArtistis(e.target.value)}
                            required="required"
                        />
                    </span>

                    <span>
                        <label>
                            <FaMailBulk />{' '}
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            required="required"
                        />
                    </span>

                    <span>
                        <label>
                            <FaKey />{' '}
                        </label>
                        <input
                            type="password"
                            placeholder="password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            required="required"
                        />
                    </span>

                    <span>
                        <label>
                            <FaKey />{' '}
                        </label>
                        <input
                            type="password"
                            placeholder="old password"
                            onChange={(e) => setOldPassword(e.target.value)}
                            required="required"
                        />
                    </span>

                    <span>
                        <label>
                            <FaRegImage />{' '}
                        </label>
                        <input
                            type="file"
                            placeholder="avatar"
                            onChange={(e) => setNewAvatar(e.target.files[0])}
                            required="required"
                        />
                    </span>

                    <button type="button" onClick={(e) => handleButtonClick(e)}>
                        <FaPencilAlt /> Edit{' '}
                    </button>
                </Formy>
            </Container>
        );
    }

    return Layout();
}

export default EditProfileArtist;
