import React from 'react';
import { Container } from './styled';
import Footer from '../../components/footer';

function ChooseSign() {
    return (
        <Container>
            <button>SignIn with user </button>
            <button>SignIn with artist </button>
            <Footer />
        </Container>
    );
}

export default ChooseSign;
