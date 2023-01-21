import React from "react";
import {useNavigate} from "react-router-dom";
import useToken from "../App/useToken";

import Navbar from "../Navbar/Navbar";
import './Profile.css';
import Footer from "../Footer/Footer";


export default function Profile() {
    const { token, setToken } = useToken();

    if(!token){
        window.location.href = '/signin';
    }


    return(
        <div id="profile">
            <Navbar pagename={"Profile"} />
            <Footer />
        </div>


);
}