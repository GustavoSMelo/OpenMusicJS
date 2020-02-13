import React, { useEffect } from 'react';
import api from '../api';

export default async function getApi(route) {
    try {
        const info = await api.get(route, {
            headers: {
                Authorization: localStorage.getItem('token'),
            },
        });

        return info;
    } catch (err) {
        return null;
    }
}
