import React from "react";
import {useNavigate} from "react-router-dom";
import useToken from "../App/useToken";

export default function Profile() {
    const navigate = useNavigate();
    const { token, setToken } = useToken();

    if(!token){
        window.location.href = '/signin';
    }


    return(
        <h2>Profile</h2>
    );
}