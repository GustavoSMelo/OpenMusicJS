import React, { useState, useEffect } from 'react';
import { Container, ContainerError, ContainerSuccess } from './styled';
import Footer from '../../components/footer';
import Logo from '../../assets/img/logo.png';
import api from '../../api';

function SignUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [result, setResult] = useState('');

    const changeResult = useEffect(() => result, [result]);

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

    async function onButtonClick(e) {
        e.preventDefault();

        const fd = new FormData();
        fd.append('avatar', avatar);

        try {
            const registreInfo = await api.post(
                '/user',
                {
                    name,
                    email,
                    pass,
                    avatar: fd,
                },
                {
                    headers: {
                        'Content-type': `multipart/form-data; boundary=${fd._boundary}`,
                    },
                }
            );

            console.log(registreInfo);

            if (!registreInfo) {
                return setResult(
                    <ContainerError>
                        <h1>Some error happens</h1>
                    </ContainerError>
                );
            }

            return setResult(
                <ContainerSuccess>
                    <h1>{registreInfo}</h1>
                </ContainerSuccess>
            );
        } catch (err) {
            console.log({ Error: err });
        }
    }

    return (
        <Container>
            {changeResult}
            <header>
                <img src={Logo} alt="logo-icon" />
            </header>
            <br />
            <form
                action="/user"
                method="post"
                encType="multipart/form-data"
                onSubmit={onButtonClick}
            >
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

                <button type="submit">Sign Up</button>
            </form>
            <Footer className="foot" />
        </Container>
    );
}

export default SignUser;
