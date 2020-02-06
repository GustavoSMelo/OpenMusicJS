import React from 'react';
import { Container } from './styled';
import Footer from '../../components/footer';
import Logo from '../../assets/img/logo.png';

function SignUser() {
    return (
        <Container>
            <header>
                <img src={Logo} alt="logo-icon" />
            </header>
            <br />
            <form encType="multipart/form-data">
                <h2>Complete all the fields and sign to use musicfy</h2>

                <input placeholder="Name" type="text" required="required" />

                <input
                    placeholder="Email, ex: aaa@aaa.com"
                    type="email"
                    required="required"
                />

                <input
                    placeholder="Password"
                    type="password"
                    required="required"
                />

                <input placeholder="avatar" type="file" required="required" />

                <button type="button">Sign Up</button>
            </form>
            <Footer className="foot" />
        </Container>
    );
}

export default SignUser;
