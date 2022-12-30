import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import './SignIn.css';

export default function SignIn({setToken}) {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function EmailHandler(event) {

        setEmail(event.target.value);
    }

    function PasswordHandler(event) {
        setPassword(event.target.value);
    }

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

    return (
        <div id="signin">
            <div className="container">
                <div className="signInContainer">
                    <div className="titleEnter">
                        Sign In to Barter
                    </div>
                    <div className="signInCard">
                        <form onSubmit={SubmitHandler}>
                            <div className="inputSignIn">
                                <p className="enter">Email address</p>
                                <div className="yyy">
                                    <input className="inputForm" type="text" onBlur={EmailHandler}/>
                                </div>
                                <div className="inputSignIn">
                                    <p className="enter">Password</p>
                                    <div className="yyy">
                                        <input className="inputForm" type="password" onBlur={PasswordHandler}/>
                                    </div>
                                </div>

                            </div>
                            <div className="">
                                <button type="submit">Sign In</button>
                            </div>
                        </form>
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