import React, { useState } from 'react';
import { Container } from './styled';
import Footer from '../../components/footer';
import { FaArrowRight, FaCheck, FaTimes } from 'react-icons/fa';
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
            const [mail, domain] = email.split('@');

            if (!mail || !domain) {
                alert('email not valid, insert another email or try again ');
            } else {
                setHasInfo(hasInfo + 1);
                setInfoForm('pass');
            }
        } else if (hasInfo === 4 && pass) {
            setHasInfo(hasInfo + 1);
            setInfoForm('avatar');
        } else if (hasInfo === 5 && avatar) {
            setHasInfo(hasInfo + 1);
        } else {
            alert('please, insert all fields ');
        }
        return console.log({ name, name_artist, email, pass, avatar });
    }

    function renderMainForm() {
        if (hasInfo === 1) {
            return (
                <article>
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
                </article>
            );
        } else if (hasInfo === 2) {
            return (
                <article>
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
                </article>
            );
        } else if (hasInfo === 3) {
            return (
                <article>
                    <h2>Insert your {InfoForm}</h2>

                    <input
                        type="email" //error
                        value={email}
                        placeholder={InfoForm}
                        onChange={handlerEmailChange}
                    />
                    <br />
                    <button type="button" onClick={handlerButton}>
                        Next <FaArrowRight />
                    </button>
                </article>
            );
        } else if (hasInfo === 4) {
            return (
                <article>
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
                </article>
            );
        } else if (hasInfo === 5) {
            return (
                <article>
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
                </article>
            );
        } else if (hasInfo === 6) {
            return (
                <section>
                    <h3>Confirm your datas </h3>
                    <h2>Name: {name}</h2>
                    <h2>Name Artistic: {name_artist}</h2>
                    <h2>email: {email}</h2>
                    <h2>avatar: {avatar}</h2>

                    <button>
                        Confirm <FaCheck />
                    </button>
                    <button className="cancel">
                        Cancel <FaTimes />{' '}
                    </button>
                </section>
            );
        }
    }

    return (
        <>
            <Container img={background}>
                <>{renderMainForm()}</>
            </Container>

            <Footer />
        </>
    );
}

export default SignArtist;
