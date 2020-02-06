import React from 'react';
import { Container } from './styled';
import background from '../../assets/img/login-theme-user2.jpg';
import { FaCheck } from 'react-icons/fa';

function LoginUser() {
    return (
        <Container img={background}>
            <div>
                <h1>Login for users</h1>
                <input placeholder="insert your email here" type="text" />
                <input
                    placeholder="insert your password here"
                    type="password"
                />
                <button type="button">
                    <FaCheck /> Login
                </button>
            </div>
        </Container>
    );
}

export default LoginUser;
