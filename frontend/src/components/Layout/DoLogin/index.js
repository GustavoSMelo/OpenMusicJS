import React from 'react';
import { ContainerNotLogged } from './style';
import { Link } from 'react-router-dom';

function DoLogin() {
    return (
        <ContainerNotLogged>
            <h1>To continue, please make login</h1>
            <Link className="btnLogin" to="/login/user">
                Login
            </Link>
        </ContainerNotLogged>
    );
}

export default DoLogin;
