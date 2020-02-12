import React, { useState } from 'react';
import { Container, ContainerError, ContainerSuccess } from './styled';
import Footer from '../../components/footer';
import Logo from '../../assets/img/logo.png';
import api from '../../api';

function SignUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [result, setResult] = useState(null);

    function handlerNameChange(event) {
        return setName(event.target.value);
    }

    function handlerEmailChange(event) {
        return setEmail(event.target.value);
    }

    function handlerPassChange(event) {
        return setPass(event.target.value);
    }

    function handlerAvatarChange(event) {
        return setAvatar(event.target.files[0]);
    }

    function renderStatusForUser() {
        return result;
    }

    async function onButtonClick(e) {
        e.preventDefault();

        const fd = new FormData();

        fd.append('name', name);
        fd.append('email', email);
        fd.append('pass', pass);
        fd.append('avatar', avatar);
        try {
            const registreInfo = await api.post('/user', fd, {
                headers: {
                    'content-type': `multipart/form-data; boundary=${fd._boundary}`,
                },
            });

            console.log(registreInfo);

            if (!registreInfo) {
                return setResult(
                    <ContainerError>
                        <h1>Some error happens</h1>
                    </ContainerError>
                );
            }

            console.log('user inserted with success! ');
            setResult(
                <ContainerSuccess>
                    <h1>Success to create a new user </h1>
                </ContainerSuccess>
            );

            return renderStatusForUser();
        } catch (err) {
            console.log({ Error: err });
            const message = err.response.data.Error;
            setResult(
                <ContainerError>
                    <h1>{message}</h1>
                </ContainerError>
            );

            return renderStatusForUser();
        }
    }

    return (
        <Container>
            <header>
                <img src={Logo} alt="logo-icon" />
            </header>

            <>{renderStatusForUser()}</>
            <br />
            <form action="/user" method="post" encType="multipart/form-data">
                <h2>Complete all the fields and sign to use musicfy</h2>

                <input
                    value={name}
                    onChange={handlerNameChange}
                    placeholder="Name"
                    name="name"
                    type="text"
                    required="required"
                />

                <input
                    value={email}
                    onChange={handlerEmailChange}
                    name="email"
                    placeholder="Email, ex: aaa@aaa.com"
                    type="email"
                    required="required"
                />

                <input
                    value={pass}
                    onChange={handlerPassChange}
                    name="pass"
                    placeholder="Password"
                    type="password"
                    required="required"
                />

                <input
                    onChange={handlerAvatarChange}
                    placeholder="avatar"
                    type="file"
                    name="avatar"
                    required="required"
                />

                <button type="button" onClick={onButtonClick}>
                    Sign Up
                </button>
            </form>
            <Footer className="foot" />
        </Container>
    );
}

export default SignUser;
