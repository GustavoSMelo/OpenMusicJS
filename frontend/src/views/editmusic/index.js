import React, { useState } from 'react';
import DoLogin from '../../components/Layout/DoLogin';
import { Container, ContainerError, ContainerSuccess } from './style';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { FaPencilAlt } from 'react-icons/fa';
import api from '../../api';
import Verify from '../../utils/verify';
import { useHistory } from 'react-router-dom';

function EditMusic(props) {
    const [nameMusic, setNameMusic] = useState('');
    const [genreMusic, setGenreMusic] = useState('');
    const [bannerMusic, setbannerMusic] = useState(null);
    const [status4Artist, setStatus4Artist] = useState(<></>);
    const history = useHistory();

    async function handlerEditMusic() {
        const validation = await Verify(nameMusic, genreMusic);
        console.log(validation);
        if (validation) {
            return await setStatus4Artist(
                <ContainerError>
                    Complete all the fields: name and genre
                </ContainerError>
            );
        }
        try {
            const fd = new FormData();
            fd.append('newname', nameMusic);
            fd.append('genre', genreMusic);
            fd.append('banner_path', bannerMusic);
            await api.put('/music', fd, {
                headers: {
                    Authorization: localStorage.getItem('ArtistToken'),
                    'content-type': `multipart/form-data; boundary=${fd.bondary}`,
                    id: props.musicID,
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
        if (props.musicID === null || props.musicID === undefined) {
            return <DoLogin />;
        }
        return (
            <Container>
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
                        placeholder={`Old Name: ${props.name}`}
                        onChange={(e) => setNameMusic(e.target.value)}
                        value={nameMusic}
                    />
                    <input
                        type="text"
                        placeholder={`Old Genre: ${props.genre}`}
                        onChange={(e) => setGenreMusic(e.target.value)}
                        value={genreMusic}
                    />
                    <input
                        type="file"
                        placeholder="banner"
                        onChange={(e) => setbannerMusic(e.target.files[0])}
                    />
                    <button
                        type="button"
                        onClick={handlerEditMusic}
                        className="btnAdd"
                    >
                        <FaPencilAlt /> Edit music{' '}
                    </button>
                </main>
            </Container>
        );
    }
    //return DoLogin;

    return layout();
}

export default EditMusic;
