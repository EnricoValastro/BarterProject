import React from "react";
import {useNavigate} from "react-router-dom";
import useToken from "../App/useToken";
import Navbar from "../Navbar/Navbar";

export default function Marketplace() {
    const navigate = useNavigate();
    const { token, setToken } = useToken();

    if(!token){
        window.location.href = '/signin';
    }


    return(
        <Navbar pagename={"Marketplace"} />
    );
}