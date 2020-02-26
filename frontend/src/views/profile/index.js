import React, { useEffect, useState } from 'react';
import authToken from '../../utils/authToken';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { Container } from './styled';
import { FaEnvelope, FaPen, FaTrash } from 'react-icons/fa';

function Profile() {
    const [user, setUser] = useState('');

    useEffect(() => {
        async function getApiData() {
            try {
                const datas = await authToken('/user/show');
                await setUser(datas.data.user);
            } catch (err) {
                console.error('Some error happens ');
            }
        }
        getApiData();
    }, []);

    function RenderWithUser() {
        console.log(user);
        return (
            <>
                <Navbar />
                <Container>
                    <img src={`http://localhost:3333/img/${user.avatar}`} />
                    <h1>{user.name}</h1>
                    <h2>
                        {' '}
                        <FaEnvelope /> {user.email}
                    </h2>

                    <span>
                        <button className="btnEdit">
                            <FaPen /> Edit
                        </button>
                        <button className="btnDelete">
                            <FaTrash /> Delete
                        </button>
                    </span>
                </Container>
                <Footer />
            </>
        );
    }

    function RenderWithOutUser() {
        return <h1>Please, make login</h1>;
    }

    return <>{user ? RenderWithUser() : RenderWithOutUser()}</>;
}

export default Profile;
