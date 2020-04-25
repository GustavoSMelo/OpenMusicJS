import React, { useState, useEffect } from 'react';
import { Container } from './style';
import api from '../../api';

function AllMusics4Edit(props) {
    const [musics, setMusics] = useState([]);

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

    useEffect(() => getDataByAPI(), []);

    return (
        <Container>
            <h1>Select some music to modify: </h1>
            {musics.map((item) => (
                <section>
                    <figure>
                        <img
                            src={`http://localhost:3333/img/${item.path}`}
                            alt="banner music"
                        />
                    </figure>
                    <article>
                        <h1>name: {item.name}</h1>
                        <h1>genero: {item.genre}</h1>
                    </article>
                </section>
            ))}

            <section>
                <br />
                <br />
                <br />
                <br />
            </section>

            <section>
                <br />
                <br />
                <br />
                <br />
            </section>
            <section>
                <br />
                <br />
                <br />
                <br />
            </section>

            <section>
                <br />
                <br />
                <br />
                <br />
            </section>
        </Container>
    );
}

export default AllMusics4Edit;
