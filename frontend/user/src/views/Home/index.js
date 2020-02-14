import React, { useEffect, useState } from 'react';
import authToken from '../../utils/authToken';
import Navbar from '../../components/navbar';
import { Container, ContainerNotLogged } from './styled';
import { FaThumbsUp, FaHeadphones } from 'react-icons/fa';
import imgTest from '../../assets/img/login-theme2.jpg';
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';

function Home() {
    const [info, setInfo] = useState('');

    useEffect(() => {
        async function getDataByAPI() {
            const data = await authToken('/musics');

            if (!data) {
                return setInfo(null);
            }
            return setInfo(data.data);
        }

        getDataByAPI();
    }, []);

    function LayoutLogged() {
        return (
            <>
                <Navbar />
                <Container>
                    <h1>New musics: </h1>
                    <ul>
                        {info ? (
                            info.map(item => (
                                <li key={item.id}>
                                    <img src={imgTest} alt="banner of music" />
                                    <p>{item.name}</p>
                                    <p>{item.genre}</p>

                                    <span>
                                        <button
                                            className="listen"
                                            type="button"
                                        >
                                            <FaHeadphones /> Listen
                                        </button>
                                        <button className="like" type="button">
                                            <FaThumbsUp />
                                        </button>
                                    </span>
                                </li>
                            ))
                        ) : (
                            <h1>
                                Does not have any music registred in database{' '}
                            </h1>
                        )}
                    </ul>
                </Container>
                <Footer />
            </>
        );
    }

    function LayoutNotLogged() {
        return (
            <ContainerNotLogged>
                <h1>To continue, please make login</h1>
                <Link className="btnLogin" to="/login/user">
                    Login
                </Link>
            </ContainerNotLogged>
        );
    }

    return <>{info ? LayoutLogged() : LayoutNotLogged()}</>;
}

export default Home;
