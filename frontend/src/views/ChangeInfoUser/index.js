import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import authToken from '../../utils/authToken';
import DoLogin from '../../components/Layout/DoLogin';
import Global from './global';
import { Container, ContainerError } from './style';
import { FaPencilAlt } from 'react-icons/fa';
import api from '../../api';

function ChangeInfoUser(props) {
    const [infoAPI, setInfoAPI] = useState([]);
    const [ErrorStatusUser, setErrorStatusUser] = useState(<></>);
    const [ErrorText, setErrorText] = useState('');
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newAvatar, setNewAvatar] = useState('');
    const [oldPassword, setoldPassword] = useState('');

    useEffect(() => {
        async function getDatabyAPI() {
            const info = await authToken('/user/show');

            if (!info || info.length <= 0) {
                await setInfoAPI(null);
            }
        }
        getDatabyAPI();
    }, []);

    async function handlerButtonClick(e) {
        e.preventDefault();

        try {
            const fd = new FormData();
            fd.append('name', newName);
            fd.append('email', newEmail);
            fd.append('pass', newPassword);
            fd.append('avatar', newAvatar);
            fd.append('oldpass', oldPassword);

            await api.put('/user', fd, {
                headers: {
                    'content-type': `multipart/form-data; boundary=${fd._boundary}`,
                    Authorization: localStorage.getItem('token'),
                },
            });

            document.location = 'http://localhost:3000/profile';
        } catch (err) {
            console.log(err.response.data.Error);
            await setErrorText(`${err.response.data.Error}`);
            await setErrorStatusUser(
                <ContainerError>
                    <h1>
                        Sorry, Some Error happens :(
                        <br />
                        Try to put another email or another image
                        <br />
                        Or the old email is not match
                    </h1>
                </ContainerError>
            );
            console.log(ErrorText);
        }
    }

    function Layout() {
        if (!infoAPI) {
            return <DoLogin />;
        }
        return (
            <>
                <Navbar />

                <Container encType="multipart/form-data" method="PUT">
                    <>{ErrorStatusUser}</>
                    <input
                        type="file"
                        onChange={event => setNewAvatar(event.target.files[0])}
                        placeholder="Avatar"
                    />
                    <input
                        type="text"
                        placeholder={` Name: ${props.oldNameUser}`}
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                    />
                    <br />
                    <input
                        type="email"
                        placeholder={` Email: ${props.oldEmailUser}`}
                        value={newEmail}
                        onChange={e => setNewEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password (not needed to change)"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Old password (is necessary to inform)"
                        value={oldPassword}
                        onChange={e => setoldPassword(e.target.value)}
                    />

                    <button type="button" onClick={handlerButtonClick}>
                        <FaPencilAlt />
                        Change
                    </button>
                    <br />
                </Container>
                <Global />
            </>
        );
    }

    return Layout();
}

export default ChangeInfoUser;
