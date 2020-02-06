import React, { useState } from 'react';
import { Container } from './styled';
import Footer from '../../components/footer';

function SignArtist() {
    const [name, setName] = useState('');
    const [name_artist, setName_artist] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [avatar, setAvatar] = useState('');

    const [hasInfo, setHasInfo] = useState(1);
    const [InfoForm, setInfoForm] = useState('name');

    function renderMainForm() {
        if (hasInfo === 1) {
            return (
                <>
                    <h2>Insert your {InfoForm}</h2>

                    <input type="text" value={name} placeholder={InfoForm} />
                    <br />
                    <button type="button">Next</button>
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
