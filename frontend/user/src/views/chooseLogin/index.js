import React from 'react';
import { Container } from './styled';
import Footer from '../../components/footer';

function ChooseLogin() {
    return (
        <Container>
            <button>LogIn with user </button>
            <button>LogIn with artist </button>
            <Footer />
        </Container>
    );
}

export default ChooseLogin;
