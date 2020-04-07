import React from 'react';
import { MP3Player } from './styled';

function Player(props) {
    return (
        <MP3Player controls autoplay>
            <source
                src={`http://localhost:3333/music/${props.musicpath}`}
                type="audio/mpeg"
            />
        </MP3Player>
    );
}

export default Player;
