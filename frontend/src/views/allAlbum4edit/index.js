import React, { useEffect, useState } from 'react';
import api from '../../api';
import DoLogin from '../../components/Layout/DoLogin';
import { Container, BtnGoBack } from './style';
import Local from './local';
import { Link, useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function AllAlbum4Edit(props) {
    const [allAlbunsOfArtist, setAllAlbunsOfArtist] = useState([]);
    const history = useHistory();

    async function getDataByAPI() {
        const response = await api.get('/album');
        const sentinel = response.data.filter(
            (albuns) => albuns.artist === props.artistID
        );

        return await setAllAlbunsOfArtist(sentinel);
    }

    useEffect(() => {
        getDataByAPI();
    }, []);

    function Layout() {
        if (!props.artistID) {
            return <DoLogin />;
        }

        return (
            <>
                <BtnGoBack onClick={() => history.goBack()}>
                    <FaArrowLeft />
                </BtnGoBack>
                <Container>
                    {allAlbunsOfArtist.map((item) => (
                        <section key={item.id}>
                            <figure>
                                <img
                                    src={`http://localhost:3333/img/${item.banner}`}
                                    alt="banner album"
                                />
                            </figure>
                            <article>
                                <span>
                                    <h1>{item.name}</h1>
                                    <h1>{item.genre}</h1>
                                </span>
                                <span>
                                    <p>{item.description}</p>
                                </span>

                                <Link
                                    className="btn"
                                    to={{
                                        pathname: '/edit/album',
                                        state: {
                                            artistID: props.artistID,
                                            oldName: item.name,
                                            oldGenre: item.genre,
                                            oldDescription: item.description,
                                            idAlbum: item.id,
                                        },
                                    }}
                                >
                                    Edit
                                </Link>
                            </article>
                        </section>
                    ))}
                </Container>
                <Local />
            </>
        );
    }

    return Layout();
}

export default AllAlbum4Edit;
