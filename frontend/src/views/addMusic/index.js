import React, { useState } from 'react';
import DoLogin from '../../components/Layout/DoLogin';
import { Container, ContainerError, ContainerSuccess } from './style';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';
import api from '../../api';
import Verify from '../../utils/verify';
import { useHistory } from 'react-router-dom';
import Background from '../../assets/img/walp.jpg';

function AddMusic(props) {
    const [nameMusic, setNameMusic] = useState('');
    const [genreMusic, setGenreMusic] = useState('');
    const [bannerMusic, setbannerMusic] = useState([]);
    const [pathMusic, setPathMusic] = useState([]);
    const [status4Artist, setStatus4Artist] = useState(<></>);
    const history = useHistory();

    async function handlerStoreMusic() {
        const validation = await Verify(
            nameMusic,
            genreMusic,
            bannerMusic,
            pathMusic
        );
        console.log(validation);
        if (validation) {
            return await setStatus4Artist(
                <ContainerError>Complete all the fields</ContainerError>
            );
        }
        try {
            const fd = new FormData();
            fd.append('name', nameMusic);
            fd.append('genre', genreMusic);
            fd.append('info', bannerMusic);
            fd.append('info', pathMusic);
            await api.post('/music', fd, {
                headers: {
                    Authorization: localStorage.getItem('ArtistToken'),
                    'content-type': `multipart/form-data; boundary=${fd.bondary}`,
                },
            });
            return await setStatus4Artist(
                <ContainerSuccess>
                    Success in create a new music
                </ContainerSuccess>
            );
        } catch (err) {
            console.error({ Error: err });
            return setStatus4Artist(
                <ContainerError>Complete all the fields</ContainerError>
            );
        }
    }

    function layout() {
        if (props.artistID) {
            return (
                <Container img={Background}>
                    {status4Artist}
                    <main>
                        <button
                            className="btnBack"
                            onClick={() => history.goBack()}
                        >
                            <FaLongArrowAltLeft />
                        </button>
                        <input
                            type="text"
                            placeholder="name"
                            onChange={(e) => setNameMusic(e.target.value)}
                            value={nameMusic}
                        />
                        <input
                            type="text"
                            placeholder="genre"
                            onChange={(e) => setGenreMusic(e.target.value)}
                            value={genreMusic}
                        />
                        <input
                            type="file"
                            placeholder="banner"
                            onChange={(e) => setbannerMusic(e.target.files[0])}
                        />
                        <input
                            type="file"
                            placeholder="music"
                            onChange={(e) => setPathMusic(e.target.files[0])}
                        />
                        <button
                            type="button"
                            onClick={handlerStoreMusic}
                            className="btnAdd"
                        >
                            <FaPlusCircle /> Add music{' '}
                        </button>
                    </main>
                </Container>
            );
        }
        return DoLogin;
    }
    return layout();
}

export default AddMusic;
