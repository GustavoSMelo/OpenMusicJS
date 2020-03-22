import React, { useState } from 'react';
import { Container, ContainerError } from './styled';
import background from '../../assets/img/login-theme-user2.jpg';
import { FaCheck } from 'react-icons/fa';
import api from '../../api';

function LoginUser() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [result, setResult] = useState(null);

    function handlerEmailChange(e) {
        return setEmail(e.target.value);
    }

    function handlerPassChange(e) {
        return setPass(e.target.value);
    }

    function returnResultStatus4User() {
        return result;
    }

    async function onButtonClick(e) {
        e.preventDefault();

        try {
            const response = await api.post('/login/user', { email, pass });

            const { token } = response.data;

            localStorage.setItem('token', `Bearer ${token}`);

            return (window.location.href = 'http://localhost:3000/home');
        } catch (err) {
            const message = err.response.data.Error;

            setResult(
                <ContainerError>
                    <h2>{message}</h2>
                </ContainerError>
            );

            return returnResultStatus4User();
        }
    }

    return (
        <Container img={background}>
            {returnResultStatus4User()}
            <form>
                <h1>Login for users</h1>
                <input
                    placeholder="insert your email here"
                    onChange={handlerEmailChange}
                    type="email"
                />
                <input
                    placeholder="insert your password here"
                    onChange={handlerPassChange}
                    type="password"
                />
                <button type="button" onClick={e => onButtonClick(e)}>
                    <FaCheck /> Login
                </button>
            </form>
        </Container>
    );
}

export default LoginUser;
