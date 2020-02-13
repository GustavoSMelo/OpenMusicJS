import React, { useEffect, useState } from 'react';
import authToken from '../../utils/authToken';

function Home() {
    const [info, setInfo] = useState('');
    const DidMount = useEffect(() => {
        async function getDataByAPI() {
            const data = await authToken('/musics');
            setInfo(data);
            console.log(data);
        }

        getDataByAPI();
    }, []);

    return <>{info ? <h1>Yes</h1> : <h1>No</h1>}</>;
}

export default Home;
