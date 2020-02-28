import React from 'react';
import logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import { FaSearch, FaThumbsUp, FaUserAlt } from 'react-icons/fa';
import { Container } from './styled';

function Navbar() {
    return (
        <Container>
            <Link to="/home">
                <figure>
                    <img src={logo} alt="logo" />
                </figure>
            </Link>

            <nav className="link-container">
                <Link className="link" to="/profile">
                    <FaUserAlt /> <span>Profile</span>
                </Link>
                <Link className="link" to="/">
                    <FaSearch /> <span>Search</span>
                </Link>
                <Link className="link" to="/">
                    <FaThumbsUp /> <span>Likes</span>
                </Link>
            </nav>
        </Container>
    );
}

export default Navbar;
