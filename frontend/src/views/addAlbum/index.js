import React, { useState } from 'react';
import api from '../../api';
import { Container, ContainerError, ContainerSucess } from './style';
import Background from '../../assets/img/walp2.jpg';
import {
    FaMarker,
    FaCompactDisc,
    FaCalendarAlt,
    FaPenAlt,
    FaImage,
    FaCheckCircle,
    FaArrowLeft,
} from 'react-icons/fa';
import DoLogin from '../../components/Layout/DoLogin';
import { useHistory } from 'react-router-dom';

function AddAlbum(props) {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [year_lunched, setYear_lunched] = useState(0);
    const [description, setDescription] = useState('');
    const [banner, setBanner] = useState([]);
    const [status4Artist, setStatus4Artist] = useState(<></>);
    const history = useHistory();

    async function handlerButtonClick() {
        const fd = new FormData();
        fd.append('name', name);
        fd.append('genre', genre);
        fd.append('year_lunched', year_lunched);
        fd.append('description', description);
        fd.append('banner', banner);

        try {
            await api.post('/album', fd, {
                headers: {
                    Authorization: localStorage.getItem('ArtistToken'),
                    'content-type': `multipart/form-data; boundary=${fd.boundary}`,
                },
            });

            await setStatus4Artist(
                <ContainerSucess>Album created with success</ContainerSucess>
            );
        } catch (err) {
            await setStatus4Artist(
                <ContainerError>
                    Error in create a album, please, try again
                </ContainerError>
            );
        }
    }

    function Layout() {
        if (props.artistID === null || props.artistID === undefined) {
            return <DoLogin />;
        }

        return (
            <Container img={Background}>
                {status4Artist}
                <section>
                    <span>
                        <button
                            type="button"
                            onClick={() => history.goBack()}
                            className="btnComeBack"
                        >
                            <FaArrowLeft />
                        </button>
                    </span>
                    <span>
                        <FaMarker className="icon" />
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Insert a name of album here "
                            value={name}
                            required="required"
                        />
                    </span>
                    <span>
                        <FaCompactDisc className="icon" />
                        <input
                            type="text"
                            onChange={(e) => setGenre(e.target.value)}
                            placeholder="Insert a genre of album here "
                            value={genre}
                            required="required"
                        />
                    </span>
                    <span>
                        <FaCalendarAlt className="icon" />
                        <input
                            type="date"
                            onChange={(e) => setYear_lunched(e.target.value)}
                            placeholder="Insert a year of release here "
                            value={year_lunched}
                            required="required"
                        />
                    </span>
                    <span>
                        <FaPenAlt className="icon" />
                        <input
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Insert a description here"
                            value={description}
                        />
                    </span>
                    <span>
                        <FaImage className="icon" />
                        <input
                            type="file"
                            onChange={(e) => setBanner(e.target.files[0])}
                            required="required"
                        />
                    </span>

                    <button type="button" onClick={handlerButtonClick}>
                        <FaCheckCircle /> Add button
                    </button>
                </section>
            </Container>
        );
    }

    return Layout();
}

export default AddAlbum;
