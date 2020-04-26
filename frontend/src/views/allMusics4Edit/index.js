import React, { useState, useEffect } from 'react';
import { Container, ComeBack } from './style';
import api from '../../api';
import { FaPencilAlt, FaArrowLeft } from 'react-icons/fa';
import Local from './local';
import { useHistory, Link } from 'react-router-dom';

function AllMusics4Edit(props) {
    const [musics, setMusics] = useState([]);
    const history = useHistory();

    async function getDataByAPI() {
        try {
            const response = await api.get('/musics', {
                headers: {
                    Authorization: localStorage.getItem('ArtistToken'),
                },
            });

            console.log(response.data);
            const { allmusics } = response.data;
            const musicsOfArtist = allmusics.filter(
                (item) => item.singer === props.artistID
            );
            await setMusics(musicsOfArtist);
        } catch (err) {
            console.error({ Error: err });
        }
    }

    useEffect(() => {
        getDataByAPI();
    }, []);

    function GoBackPage() {
        history.goBack();
    }
    return (
        <>
            <ComeBack className="ComeBack" onClick={() => history.goBack()}>
                <FaArrowLeft />
            </ComeBack>
            <Container>
                <h1>Select some music to modify: </h1>
                {musics.map((item) => (
                    <section key={item.id} id={item.id}>
                        <figure>
                            <img
                                src={`http://localhost:3333/img/${item.banner_path}`}
                                alt="banner music"
                            />
                        </figure>
                        <article>
                            <h1>name: {item.name}</h1>
                            <h1>genero: {item.genre}</h1>
                        </article>
                        <span>
                            <Link
                                className="btnLink"
                                to={{
                                    state: {
                                        name: item.name,
                                        genre: item.genre,
                                        musicID: item.id,
                                    },
                                    pathname: '/edit/music',
                                }}
                            >
                                <FaPencilAlt /> Edit
                            </Link>
                        </span>
                    </section>
                ))}
            </Container>
            <Local />
        </>
    );
}

export default AllMusics4Edit;
