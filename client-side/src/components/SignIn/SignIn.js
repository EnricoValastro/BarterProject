import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

import axios from "axios";

import './SignIn.css';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import BubblyButton from "../BubblyButton/BubblyButton";

export default function SignIn({setToken}) {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function EmailHandler(event) {
        if(event.target.value.length > 0) {
            setEmail(event.target.value);
            document.getElementById('errorBoxSignin').classList.add('hidden');
        }
        else {
            document.getElementById('errorBoxSignin').classList.remove('hidden');
        }
    }

    function PasswordHandler(event) {
        if(event.target.value.length > 0) {
            setPassword(event.target.value);
            document.getElementById('errorBoxSignin').classList.add('hidden');
        }
        else {
            document.getElementById('errorBoxSignin').classList.remove('hidden');
        }
    }


    function SubmitHandler() {
        //event.preventDefault();
        if(email.length !== 0 && password.length !== 0) {
            axios.post("http://localhost:4000/api/login", {
                email: email,
                password: password
            }).then((response) => {
                setToken(response.data.token);
                navigate("/home");
            }).catch((error) => {
                document.getElementById('errorBoxSignin').classList.remove('hidden');

            });
        }
        else {
            document.getElementById('errorBoxSignin').classList.remove('hidden');

        }
    }

    return (
        <div id="signin">

            <div className="container">
                <div className="navbarContainer">
                    <div className="navbar">
                        <div className="logo">
                            <Link to="/" className="link">Barter</Link>
                        </div>
                    </div>
                </div>

                <div className="signinContainer">

                    <div className="signinTitle">
                        Sign in to Barter
                    </div>

                    <div className="signinCard">
                        <form>
                            <div className="inputSignin">
                                <div className="extContainer">
                                    <div className="iconContainer">
                                        <PersonIcon className="icon"/>
                                    </div>
                                    <div className="fieldContainer">
                                        <div className="enter">
                                            Email address
                                        </div>
                                        <input className="inputForm" type="text" onChange={EmailHandler}/>
                                    </div>
                                </div>
                            </div>
                            <div className="inputSignIn">
                                <div className="extContainer">
                                    <div className="iconContainer">
                                        <PasswordIcon className="icon"/>
                                    </div>
                                    <div className="fieldContainer">
                                        <div className="enter">
                                            Password
                                        </div>
                                        <input className="inputForm" type="password" onChange={PasswordHandler}/>
                                    </div>
                                </div>
                            </div>
                            <div className="SubmitSignin">
                                <BubblyButton name={"Sign in"} onClick={SubmitHandler} />
                            </div>
                        </form>
                    </div>

                    <div className="errorMsg hidden" id="errorBoxSignin">
                        <p id="error">Incorrect username or password</p>
                    </div>

                    <div className="newCard">
                        New to Barter?
                        <Link to="/signup" className="links"> Create an account →</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
SignIn.propTypes = {
    setToken: PropTypes.func.isRequired
}