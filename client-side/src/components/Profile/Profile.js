import React from "react";
import {useNavigate} from "react-router-dom";
import useToken from "../App/useToken";

import Navbar from "../Navbar/Navbar";
import './Profile.css';
import Footer from "../Footer/Footer";
import {toast, ToastContainer} from "react-toastify";


export default function Profile() {
    const { token, setToken } = useToken();

    if(!token){
        window.location.href = '/signin';
    }
    function fun(){
        toast("Logged out successfully");
    }


    return(
        <div id="profile">
            <Navbar pagename={"Profile"} />

            <button onClick={fun}>Ciao</button>
            <ToastContainer />


            <Footer />
        </div>


);
}