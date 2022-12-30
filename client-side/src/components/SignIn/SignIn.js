import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";


export default function SignIn({setToken}) {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function SubmitHandler(event) {
        event.preventDefault();
        if(email === '' || password === ''){
            //something to doi
        }
        else{
            axios.post("http://localhost:4000/api/login", {
                email: email,
                password: password
            }).then((response)=>{
                if(response.data.error){
                    console.log(response.data.error, {type: "error"});
                }
                else{
                    setToken(response.data.token);
                    navigate("/home");
                }
            }).catch((error)=>{
                console.log(error);
            });
        }
    }

    function EmailHandler(event) {
        setEmail(event.target.value);
    }

    function PasswordHandler(event) {
        setPassword(event.target.value);
    }

    return (
        <div>

        </div>
    );
}
SignIn.propTypes = {
    setToken: PropTypes.func.isRequired
}