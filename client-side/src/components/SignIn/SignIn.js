import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

import axios from "axios";

import './SignIn.css';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
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
        if(email.length !== 0 && password.length !== 0) {
            axios.post("http://localhost:4000/api/user/signin", {
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
                        <div>
                            <Link to="/" className="link" id="barter">Barter</Link>
                        </div>
                        <div className="signinlinktosignup">
                            <span id="new">New to Barter?</span>
                            <Link id="oldsignup" to="/signup" className="link">Signup →</Link>
                            <Link id="newsignup" to="/signup" className="link hidden">Signup →</Link>
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
                                        <div className="form__group field">
                                            <input required="" placeholder="Email" className="form__field" type="input" onChange={EmailHandler}/>
                                            <label className="form__label" htmlFor="name">Email</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="inputSignin">
                                <div className="extContainer">
                                    <div className="iconContainer">
                                        <LockIcon className="icon"/>
                                    </div>
                                    <div className="fieldContainer">
                                        <div className="form__group field">
                                            <input required="" placeholder="Password" className="form__field" type="password" onChange={PasswordHandler}/>
                                            <label className="form__label" htmlFor="name">Password</label>
                                        </div>
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
                </div>
            </div>
        </div>
    );
}
SignIn.propTypes = {
    setToken: PropTypes.func.isRequired
}