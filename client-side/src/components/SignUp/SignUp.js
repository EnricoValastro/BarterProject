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

    function nameNextInput(){
        const nameInput = document.getElementById('nameField');
        const nextInput = document.getElementById('surnameInput');
        if(nameInput.value.length >= 1){
            setName(nameInput.value);
            document.getElementById('errorBoxName').classList.add('hidden');
            nextInput.classList.remove('hidden');
        }
        else{
            document.getElementById('errorBoxName').classList.remove('hidden');
        }
    }

    function surnameNextInput(){
        const surnameInput = document.getElementById('surnameField');
        const nextInput = document.getElementById('emailInput');
        if(surnameInput.value.length >= 1){
            setSurname(surnameInput.value);
            document.getElementById('errorBoxSurname').classList.add('hidden');
            nextInput.classList.remove('hidden');
        }
        else{
            document.getElementById('errorBoxSurname').classList.remove('hidden');
        }
    }

    function validateEmail(email) {
       axios.post("http://localhost:4000/api/emailValidation", {
              email: email
       }).then((response)=> {
           if (response.data) {
               return false;
           } else {
               return true;
           }
       });
    }



    function emailNextInput(){
        const emailInput = document.getElementById('emailField').value;
        const nextInput = document.getElementById('pwdInput');
        if(emailInput == ''){
            document.getElementById('errorBoxEmail').classList.remove('hidden');
        }
        else if(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(emailInput) && validateEmail(emailInput)){
            document.getElementById('errorBoxEmail').classList.add('hidden');
            setEmail(emailInput);
            nextInput.classList.remove('hidden');
        }
        else{
            document.getElementById('errorBoxEmail').classList.remove('hidden');
        }
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
                                        <input id="nameField"className="input" type="text" onBlur={nameNextInput}/>
                                        <button onClick={nameNextInput}>→</button>
                                    </div>

                                </div>

                                <div id="surnameInput" className="inputContainer hidden">
                                    <p className="enterSomething">Enter your surname</p>
                                    <div className="xxx">
                                        <input id="surnameField" className="input" type="text" onBlur={surnameNextInput}/>
                                        <button onClick={surnameNextInput}>→</button>
                                    </div>

                                </div>

                                <div id="emailInput" className="inputContainer hidden">
                                    <p className="enterSomething">Enter your email</p>
                                    <div className="xxx">
                                        <input id="emailField" className="input" type="email" onBlur={emailNextInput}/>
                                        <button onClick={emailNextInput}>→</button>
                                    </div>


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
                    <div className="errorMsg hidden" id="errorBoxName">
                        <p>Name must be at least 1 characters long</p>
                    </div>
                    <div className="errorMsg hidden" id="errorBoxSurname">
                        <p>Surname must be at least 1 characters long</p>
                    </div>
                    <div className="errorMsg hidden" id="errorBoxEmail">
                        <p>Email is invalid or already taken</p>
                    </div>


                </div>

            </div>

        </div>

    );
}

export default Signup;