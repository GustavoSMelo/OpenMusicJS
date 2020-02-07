import React, { useState } from 'react';
import { Container } from './styled';
import Footer from '../../components/footer';
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import background from '../../assets/img/backgroundLines.png';

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

    async function handlerButton() {
        if (hasInfo === 1 && name) {
            setHasInfo(hasInfo + 1);
            setInfoForm('name_artist');
        } else if (hasInfo === 2 && name_artist) {
            setHasInfo(hasInfo + 1);
            setInfoForm('email');
        } else if (hasInfo === 3 && email) {
            setHasInfo(hasInfo + 1);
            setInfoForm('pass');
        } else if (hasInfo === 4 && pass) {
            setHasInfo(hasInfo + 1);
            setInfoForm('avatar');
        } else if (hasInfo === 5 && avatar) {
            alert('acabou ');
        } else {
            alert('please, insert all fields ');
        }
        console.log({ name, name_artist, email, pass, avatar });
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
                        required="required"
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
                        required="required"
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
                        required="required"
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
                        required="required"
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
                        required="required"
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
            <Container img={background}>
                <main>{renderMainForm()}</main>
            </Container>

            <Footer />
        </>
    );
}

export default SignArtist;
