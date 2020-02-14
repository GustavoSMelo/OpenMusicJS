import React from 'react';
import Logo from '../../assets/img/logo.png';
import { Container, Image } from './styled';
import backbubbles from '../../assets/img/bubbles-main.jpg';
import { FaMusic } from 'react-icons/fa';
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';

function Main() {
    return (
        <Container>
            <header>
                <img src={Logo} alt="logo-icon" />
                <h1>
                    Musicfy, <br />
                    Listen all your musics here!
                </h1>
            </header>
            <main>
                <Link className="link-button" to="/login">
                    LogIn to Listen
                </Link>
                <Link className="link" to="/sign">
                    create account for free{' '}
                </Link>
            </main>
            <Image img={backbubbles}>
                <h1>Dive in the world of musics with Musicfy</h1>
                <br />
                <h2>For Free</h2>

                <section className="for-artists">
                    <p>
                        <FaMusic /> If you want post your music here,
                        <br /> its only to create a account
                        <br /> how to artists and post in same time <FaMusic />
                        <br />
                    </p>

                    <br />

                    <Link className="link-button-img" to="/login">
                        {' '}
                        LogIn here{' '}
                    </Link>

                    <br />
                    <a href="/">
                        <Link to="/sign">Create account</Link>
                    </a>
                </section>

                <br />
                <section className="for-mobile">
                    <p>
                        And, if you want to listen your music in anywhere,{' '}
                        <br />
                        please, install we app. it's developed think about you
                    </p>
                </section>
                <br />
            </Image>

            <Footer />
        </Container>
    );
}

export default Main;
