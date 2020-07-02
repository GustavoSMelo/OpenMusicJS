import React from 'react';
import { Container } from './styled';
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';

function ChooseLogin() {
    return (
        <Container>
            <Link className="button" to="/login/user">
                LogIn as user{' '}
            </Link>
            <Link className="button" to="/login/artist">
                LogIn as artist{' '}
            </Link>
            <Footer />
        </Container>
    );
}

export default ChooseLogin;
