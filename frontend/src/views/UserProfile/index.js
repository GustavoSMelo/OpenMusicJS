import React, { useEffect, useState } from 'react';
import authToken from '../../utils/authToken';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import {
    FaEnvelope,
    FaPen,
    FaTrash,
    FaDoorOpen,
    FaExclamation,
    FaSmileBeam,
} from 'react-icons/fa';
import { Container, PopupContainer, ContainerError } from './styled';
import DoLogin from '../../components/Layout/DoLogin';
import { Link, useHistory } from 'react-router-dom';
import api from '../../api';

function Profile() {
    const [user, setUser] = useState('');
    const [popup, setPopup] = useState(false);
    const [StatusPopup, setStatusPopup] = useState(<></>);
    const [pass, setPass] = useState('');
    const history = useHistory();

    useEffect(() => {
        async function getApiData() {
            try {
                const datas = await authToken('/user/show');
                console.log(datas);
                await setUser(datas.data.user);

                console.log(datas.data);
            } catch (err) {
                console.error('Some error happens ');
            }
        }
        getApiData();
    }, []);

    function HandlerUserExit() {
        localStorage.setItem('token', '');
        history.push('/');
    }

    async function handlerDeleteButton(e) {
        e.preventDefault();

        try {
            await api.delete('/user', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                    pass,
                },
            });

            document.location = 'http://localhost:3000';
            localStorage.setItem('token', '');
        } catch (err) {
            console.log({ Error: err });
            await setStatusPopup(
                <ContainerError>
                    <h1>Password invalid !</h1>
                </ContainerError>
            );
        }
    }

    function LayoutDeleteUser() {
        if (popup) {
            return (
                <PopupContainer>
                    <h1>Do you want to leave us ? ;-;</h1>
                    <small>
                        That's okay... for it, you need to inform your password
                    </small>
                    {StatusPopup}
                    <form>
                        <input
                            type="password"
                            placeholder="Inform your password "
                            required="required"
                            onChange={(e) => setPass(e.target.value)}
                            value={pass}
                        />

                        <br />
                        <button
                            type="submit"
                            className="lastButtonDelete"
                            onClick={handlerDeleteButton}
                        >
                            <FaExclamation />
                            Delete my account
                        </button>

                        <button
                            type="button"
                            className="Nevermind"
                            onClick={ChangeAttributePopup}
                        >
                            <FaSmileBeam /> Nevermind
                        </button>
                    </form>
                </PopupContainer>
            );
        }
    }

    function ChangeAttributePopup() {
        if (popup === true) {
            setPopup(false);
        } else {
            setPopup(true);
        }
    }

    function RenderWithUser() {
        return (
            <>
                <Navbar />
                {LayoutDeleteUser()}
                <Container>
                    <img
                        src={`http://localhost:3333/img/${user.avatar}`}
                        alt="avatar_profile"
                    />
                    <h1>{(user.name = 'User of musicfy')}</h1>
                    <h2>
                        {' '}
                        <FaEnvelope /> {user.email}
                    </h2>

                    <span>
                        <Link
                            to={{
                                pathname: '/edit/profile',
                                state: {
                                    oldNameUser: user.name,
                                    oldEmailUser: user.email,
                                    oldAvatarUser: user.avatar,
                                    idUser: user.id,
                                },
                            }}
                            className="btnEdit"
                        >
                            <FaPen /> Edit
                        </Link>
                        <button
                            className="btnDelete"
                            onClick={ChangeAttributePopup}
                        >
                            <FaTrash /> Delete
                        </button>
                        <button
                            className="btnExit"
                            onClick={() => HandlerUserExit()}
                        >
                            <FaDoorOpen /> Exit
                        </button>
                    </span>
                </Container>
                <Footer />
            </>
        );
    }

    function RenderWithOutUser() {
        return <DoLogin />;
    }

    return <>{user ? RenderWithUser() : RenderWithOutUser()}</>;
}

export default Profile;
