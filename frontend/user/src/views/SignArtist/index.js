import React, { useState } from 'react';
import { Container } from './styled';
import Footer from '../../components/footer';
import { FaArrowRight, FaCheck } from 'react-icons/fa';

function SignArtist() {
    const [name, setName] = useState('');
    const [name_artist, setName_artist] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [avatar, setAvatar] = useState('');

    let [hasInfo, setHasInfo] = useState(1);
    let [InfoForm, setInfoForm] = useState('name');

    function handlerNameChange(e) {
        setName(e.target.value);
    }

    function handlerNameArtistChange(e) {
        setName_artist(e.target.value);
    }

    function handlerEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlerPassChange(e) {
        setPass(e.target.value);
    }

    function handlerAvatarChange(e) {
        setAvatar(e.target.value);
    }

    function handlerButton() {
        setHasInfo(hasInfo++);

        if (hasInfo === 2) {
            setInfoForm('name_artist');
        } else if (hasInfo === 3) {
            setInfoForm('email');
        } else if (hasInfo === 4) {
            setInfoForm('pass');
        } else {
            setInfoForm('avatar');
        }
    }

    function renderMainForm() {
        if (hasInfo === 1) {
            return (
                <>
                    <h2>Insert your {InfoForm}</h2>

                    <input
                        type="text"
                        value={name}
                        placeholder={InfoForm}
                        onChange={handlerNameChange}
                    />
                    <br />
                    <button type="button" onClick={handlerButton}>
                        Next <FaArrowRight />
                    </button>
                </>
            );
        } else if (hasInfo === 2) {
            return (
                <>
                    <h2>Insert your {InfoForm}</h2>

                    <input
                        type="text"
                        value={name_artist}
                        placeholder={InfoForm}
                        onChange={handlerNameArtistChange}
                    />
                    <br />
                    <button type="button" onClick={handlerButton}>
                        Next <FaArrowRight />
                    </button>
                </>
            );
        } else if (hasInfo === 3) {
            return (
                <>
                    <h2>Insert your {InfoForm}</h2>

                    <input
                        type="email"
                        value={email}
                        placeholder={InfoForm}
                        onChange={handlerEmailChange}
                    />
                    <br />
                    <button type="button" onClick={handlerButton}>
                        Next <FaArrowRight />
                    </button>
                </>
            );
        } else if (hasInfo === 4) {
            return (
                <>
                    <h2>Insert your {InfoForm}</h2>

                    <input
                        type="password"
                        value={pass}
                        placeholder={InfoForm}
                        onChange={handlerPassChange}
                    />
                    <br />
                    <button type="button" onClick={handlerButton}>
                        Next <FaArrowRight />
                    </button>
                </>
            );
        } else if (hasInfo === 5) {
            return (
                <>
                    <h2>Insert your {InfoForm}</h2>

                    <input
                        type="file"
                        placeholder={InfoForm}
                        onChange={handlerAvatarChange}
                    />
                    <br />
                    <button type="button" onClick={handlerButton}>
                        Finish <FaCheck />
                    </button>
                </>
            );
        }
    }

    return (
        <>
            <Container>
                <aside>
                    <h2>Name: {name} </h2>
                    <h2>Name Artist: {name_artist} </h2>
                    <h2>Email: {email}</h2>
                    <h2>Avatar: {avatar}</h2>
                </aside>

                <main>{renderMainForm()}</main>
            </Container>

            <Footer />
        </>
    );
}

export default SignArtist;
