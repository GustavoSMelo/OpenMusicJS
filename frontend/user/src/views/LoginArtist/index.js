import React from 'react';
import background from '../../assets/img/login-theme2.jpg';
import { Container } from './styled';
import { FaCheck } from 'react-icons/fa';

function LoginArtist() {
    return (
        <Container img={background}>
            <div>
                <h1>Login for artists</h1>
                <input type="text" placeholder="insert your email here " />
                <input
                    type="password"
                    placeholder="insert your password here "
                />
                <button type="button">
                    <FaCheck /> Login
                </button>
            </div>
        </Container>
    );
}

export default LoginArtist;
