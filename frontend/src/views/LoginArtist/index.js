import React, { useState } from 'react';
import background from '../../assets/img/login-theme2.jpg';
import { Container, ContainerError } from './styled';
import { FaCheck, FaExclamation } from 'react-icons/fa';
import api from '../../api';
import { useHistory } from 'react-router-dom';

function LoginArtist() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [status4User, setStatus4User] = useState(<></>);
    const history = useHistory();

    async function Login(e) {
        e.preventDefault();

        try {
            const response = await api.post('/login/artist', { email, pass });
            console.log(response.data);
            localStorage.setItem(
                'ArtistToken',
                `Bearer ${response.data.token}`
            );
            history.push({
                pathname: '/artist/dashboard',
                state: {
                    artistID: response.data.user.id,
                    artistEmail: response.data.user.email,
                    name_artistic: response.data.user.name_artistic,
                    avatar: response.data.user.avatar,
                },
            });
        } catch (err) {
            console.error({ Error: err });
            setStatus4User(
                <ContainerError>
                    <h2>
                        <FaExclamation /> Email or password invalid
                    </h2>
                </ContainerError>
            );
        }
    }

    return (
        <Container img={background}>
            <form>
                <h1>Login for artists</h1>
                {status4User}
                <input
                    type="email"
                    placeholder="insert your email here "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required="required"
                />
                <input
                    type="password"
                    placeholder="insert your password here "
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    required="required"
                />
                <button onClick={Login} type="button">
                    <FaCheck /> Login
                </button>
            </form>
        </Container>
    );
}

export default LoginArtist;
