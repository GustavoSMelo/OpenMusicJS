import React from 'react';
import Logo from '../../assets/img/logo.png';
import { Container } from './styled';

function Main() {
    return (
        <Container>
            <header>
                <img src={Logo} />
                <h1>
                    Musicfy, <br />
                    Listen all your musics here!
                </h1>
            </header>
            <main>
                <button>LogIn to Listen</button>
                <a href="/">create account for free </a>
            </main>
        </Container>
    );
}

export default Main;
