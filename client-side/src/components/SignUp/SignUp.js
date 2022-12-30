import React, {useState} from "react";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

import './SignUp.css';


function Signup(){
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    function NameHandler(event){
        if(event.target.value.length >= 3){
            document.getElementById('errorBoxName').classList.add('hidden');
            setName(event.target.value)
        }
        else{
            document.getElementById('errorBoxName').classList.remove('hidden');
        }


    }
    function SurnameHandler(event){
        setSurname(event.target.value)
    }
    function EmailHandler(event){
        setEmail(event.target.value)
    }
    function PasswordHandler(event){
        setPassword(event.target.value)
    }
    function ConfirmPasswordHandler(event){
        console.log("ciao");
        if(password !== event.target.value){
            alert("Password and Confirm Password must be same")
        }
        else{
            setConfirmPassword(event.target.value)
        }

    }

    function SubmitHandler(event){
        event.preventDefault();
        if(email === '' || password === '' || name === '' || surname === '' || confirmPassword === ''){
            //todo
        }
        else if(password !== confirmPassword){
            //todo
        }
        else{
            axios.post("http://localhost:4000/api/signup", {
                name: name,
                surname: surname,
                email: email,
                password: password
            }).then((response)=>{
                if(response.data.error){
                    console.log(response.data.error, {type: "error"});
                }
                else{
                    console.log(response.data.message, {type: "success"});
                    navigate("/signin");
                }
            }).catch((error)=>{
                console.log(error);
            });
        }
    }

    function nextInput(){

    }

    return (
        <div id="signup">
            <div className="cont">

                <div className="navbarContainer">
                    <div className="navbar">
                        <div className="logo">
                            <Link to="/" className="link">Barter</Link>
                        </div>
                        <div className="signIn">
                            Already have an account?
                            <Link to="/signin" className="link"> Sign in →</Link>

                        </div>
                    </div>
                </div>
                <div className="formContainer">
                    <div className="formCard">
                        <div className="title">
                            Welcome to Barter!
                        </div>
                        <div className="subtitle">
                            Let's start trading
                        </div>
                        <div className="form">
                            <form onSubmit={SubmitHandler}>
                                <div id="nameInput"className="inputContainer">
                                    <p className="enterSomething">Enter your name</p>
                                    <div className="xxx">
                                        <input className="input" type="text" onBlur={NameHandler} />
                                        <button onClick={nextInput}>-></button>
                                    </div>


                                    <div className="errorMsg hidden" id="errorBoxName">
                                        <p>Name must be at least 3 characters long</p>
                                    </div>
                                </div>
                                <div id="surnameInput" className="inputContainer hidden">
                                    <p className="enterSomething">Enter your surname</p>
                                    <input className="input" type="text" onBlur={SurnameHandler}/>
                                </div>
                                <div id="emailInput" className="inputContainer hidden">
                                    <p className="enterSomething">Enter your email</p>
                                    <input className="input" type="email" onBlur={EmailHandler}/>
                                </div>
                                <div id="pwdInput" className="inputContainer hidden">
                                    <p className="enterSomething">Enter your password</p>
                                    <input className="input" type="password" onBlur={PasswordHandler}/>
                                </div>
                                <div id="confpwdInput" className="inputContainer hidden">
                                    <p className="enterSomething">Confirm password</p>
                                    <input className="input" type="password" onBlur={ConfirmPasswordHandler}/>
                                </div>
                                <div className="hidden">
                                    <button type="submit">Sign up</button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    );
}

export default Signup;