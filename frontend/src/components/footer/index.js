import React from 'react';
import { Foot } from './styled';
import { FaHeart } from 'react-icons/fa';

function Footer() {
    return (
        <Foot>
            <h1>
                <FaHeart className="heart" /> Make with love,
                <br /> Musicfy team <FaHeart className="heart" />
            </h1>
        </Foot>
    );
}

export default Footer;
