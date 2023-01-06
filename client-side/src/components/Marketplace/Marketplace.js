import React from "react";
import {useNavigate} from "react-router-dom";
import useToken from "../App/useToken";

import Navbar from "../Navbar/Navbar";
import './Marketplace.css';
export default function Marketplace() {
    const navigate = useNavigate();
    const { token, setToken } = useToken();

    if(!token){
        window.location.href = '/signin';
    }


    return(
        <div id="marketplace">
            <Navbar pagename={"Marketplace"} />
        </div>

    );
}