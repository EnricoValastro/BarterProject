import React from 'react';

import useToken from '../App/useToken';
import Home from "../../components/Home/Home";

export default function HomePage() {
    const {token, setToken} = useToken();

    if (!token) {
        window.location.href = '/signin';
    }

    return (
        <div>
            <Home />
        </div>
    )
}


