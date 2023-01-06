import React from "react";
import {useNavigate} from "react-router-dom";
import useToken from "../App/useToken";

import Navbar from "../Navbar/Navbar";
import './Profile.css';
export default function Profile() {
    const navigate = useNavigate();
    const { token, setToken } = useToken();

    if(!token){
        window.location.href = '/signin';
    }


    return(
        <div id="profile">
            <Navbar pagename={"Profile"} />
        </div>


);
}