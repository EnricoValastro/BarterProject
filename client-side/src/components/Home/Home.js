import React from 'react';

import useToken from '../App/useToken';
import {useNavigate} from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const { token, setToken } = useToken();

    if(!token){
        window.location.href = '/signin';
    }


    return(
        <h2>Home</h2>
    );
}