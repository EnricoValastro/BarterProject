import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import './SignIn.css';
import BubblyButton from "../BubblyButton/BubblyButton";

export default function SignIn({setToken}) {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function EmailHandler(event) {
        if(event.target.value.length > 0) {
            setEmail(event.target.value);
            document.getElementById('errorBoxEmail').classList.add('hidden');
        }
        else {
            document.getElementById('errorBoxEmail').classList.remove('hidden');
        }
    }

    function PasswordHandler(event) {
        if(event.target.value.length > 0) {
            setPassword(event.target.value);
            document.getElementById('errorBoxPwd').classList.add('hidden');
        }
        else {
            document.getElementById('errorBoxPwd').classList.remove('hidden');
        }
    }


    function SubmitHandler() {
        //event.preventDefault();
        if(email.length === 0 && password.length === 0) {
            document.getElementById('errorBoxEmail').classList.remove('hidden');
            document.getElementById('errorBoxPwd').classList.remove('hidden');
        }
        else if(email.length !== 0 && password.length === 0) {
            document.getElementById('errorBoxPwd').classList.remove('hidden');
        }
        else if(email.length === 0 && password.length !== 0) {
            document.getElementById('errorBoxEmail').classList.remove('hidden');
        }
        else {
            axios.post("http://localhost:4000/api/login", {
                email: email,
                password: password
            }).then((response) => {
                    setToken(response.data.token);
                    navigate("/home");
            }).catch((error) => {
                console.log(error);
                document.getElementById('errorBoxSignIn').classList.remove('hidden');
                document.getElementById('username').innerHTML = error.response.data.message;
            });
        }
    }

    return (
        <div id="signin">
            <div className="container">
                <div className="signInContainer">
                    <div className="titleEnter">
                        Sign In to Barter
                    </div>
                    <div className="signInCard">
                        <form>
                            <div className="inputSignIn">
                                <p className="enter">Email address</p>
                                <div className="yyy">
                                    <input className="inputForm" type="text" onChange={EmailHandler}/>
                                </div>
                            </div>
                            <div className="inputSignIn">
                                <p className="enter">Password</p>
                                <div className="yyy">
                                    <input className="inputForm" type="password" onChange={PasswordHandler}/>
                                </div>
                            </div>
                            <div className="SubmitSignIn">
                                <BubblyButton name={"Sign in"} onClick={SubmitHandler} />
                            </div>
                        </form>

                    </div>
                    <div className="errorMsg hidden" id="errorBoxEmail">
                        <p>Insert Email</p>
                    </div>
                    <div className="errorMsg hidden" id="errorBoxPwd">
                        <p>Insert Password</p>
                    </div>
                    <div className="errorMsg hidden" id="errorBoxSignIn">
                        <p id="username"></p>
                    </div>
                    <div className="newCard">
                        New to Barter?
                        <Link to="/signup" className="links"> Create an account </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
SignIn.propTypes = {
    setToken: PropTypes.func.isRequired
}