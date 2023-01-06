import React from 'react';

import useToken from '../../components/App/useToken';
import Home from "../../components/Home/Home";

export default function HomePage() {
    const {token, setToken} = useToken();

    if (!token) {
        window.location.href = '/signin';
    }

    return (
            <Home />
    )
}


