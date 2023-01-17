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
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    return(
        <div id="profile">
            <Navbar pagename={"Profile"} />
        </div>


);
}