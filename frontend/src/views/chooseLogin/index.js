import React from 'react';
import { Container } from './styled';
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';

function ChooseLogin() {
    return (
        <Container>
            <Link className="button" to="/login/user">
                LogIn with user{' '}
            </Link>
            <Link className="button" to="/login/artist">
                LogIn with artist{' '}
            </Link>
            <Footer />
        </Container>
    );
}

export default ChooseLogin;
