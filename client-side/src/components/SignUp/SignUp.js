import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import axios from "axios";

import BubblyButton from "../BubblyButton/BubblyButton";
import './SignUp.css';


function Signup(){
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function SubmitHandler(){

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

    function nameNextInput(event){
        event.preventDefault();
        const nameInput = document.getElementById('nameField').value;
        const nextInput = document.getElementById('surnameInput');
        if(nameInput.length >= 1){
            setName(nameInput);
            document.getElementById('errorBoxName').classList.add('hidden');
            nextInput.classList.remove('hidden');
        }
        else{
            document.getElementById('errorBoxName').classList.remove('hidden');
        }
    }

    function surnameNextInput(event){
        event.preventDefault();
        const surnameInput = document.getElementById('surnameField').value;
        const nextInput = document.getElementById('emailInput');
        if(surnameInput.length >= 1){
            setSurname(surnameInput);
            document.getElementById('errorBoxSurname').classList.add('hidden');
            nextInput.classList.remove('hidden');
        }
        else{
            document.getElementById('errorBoxSurname').classList.remove('hidden');
        }
    }

    function emailNextInput(event){
        event.preventDefault();
        const emailInput = document.getElementById('emailField').value;
        const nextInput = document.getElementById('pwdInput');

        axios.post("http://localhost:4000/api/emailValidation", {
            email: emailInput

        }).then((response)=>{
            if(emailInput === ''){
                document.getElementById('errorBoxEmail').classList.remove('hidden');
            }
            else if(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(emailInput) && !response.data){

                document.getElementById('errorBoxEmail').classList.add('hidden');
                setEmail(emailInput);
                nextInput.classList.remove('hidden');
            }
            else{
                document.getElementById('errorBoxEmail').classList.remove('hidden');
            }
        });
    }

    function pwdNextInput(event){
        event.preventDefault();
        const pwdInput = document.getElementById('pwdField').value;
        const nextInput = document.getElementById('confpwdInput');
        const lowerCaseLetters = /[a-z]/g;
        const upperCaseLetters = /[A-Z]/g;
        const numbers = /[0-9]/g;

        if(pwdInput.length >= 8 && pwdInput.match(lowerCaseLetters) && pwdInput.match(upperCaseLetters) && pwdInput.match(numbers)){
            document.getElementById('errorBoxPwd').classList.add('hidden');
            setPassword(pwdInput);
            nextInput.classList.remove('hidden');
        }
        else {
            document.getElementById('errorBoxPwd').classList.remove('hidden');
        }

    }

    function confPwdNextInput(event){
        event.preventDefault();
        const confPwdInput = document.getElementById('confpwdField').value;
        const nextInput = document.getElementById('subButton');

        if(confPwdInput === password){
            setConfirmPassword(confPwdInput);
            document.getElementById('errorBoxConfPwd').classList.add('hidden');
            nextInput.classList.remove('hidden');
        }
        else {
            document.getElementById('errorBoxConfPwd').classList.remove('hidden');
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
                            <form>

                                <div id="nameInput"className="inputContainer">
                                    <p className="enterSomething">Enter your name</p>
                                    <div className="xxx">
                                        <input id="nameField"className="input" type="text" onBlur ={nameNextInput}/>
                                        <button className="nextButton" onClick={nameNextInput}>→</button>
                                    </div>

                                </div>

                                <div id="surnameInput" className="inputContainer hidden">
                                    <p className="enterSomething">Enter your surname</p>
                                    <div className="xxx">
                                        <input id="surnameField" className="input" type="text" onBlur ={surnameNextInput} />
                                        <button className="nextButton" onClick={surnameNextInput}>→</button>
                                    </div>

                                </div>

                                <div id="emailInput" className="inputContainer hidden">
                                    <p className="enterSomething">Enter your email</p>
                                    <div className="xxx">
                                        <input id="emailField" className="input" type="email" onBlur ={emailNextInput}/>
                                        <button className="nextButton" onClick={emailNextInput}>→</button>
                                    </div>
                                </div>

                                <div id="pwdInput" className="inputContainer hidden">
                                    <p className="enterSomething">Enter your password</p>
                                    <div className="xxx">
                                        <input id="pwdField" className="input" type="password" onBlur={pwdNextInput} />
                                        <button className="nextButton" onClick={pwdNextInput}>→</button>
                                    </div>
                                </div>

                                <div id="confpwdInput" className="inputContainer hidden">
                                    <p className="enterSomething">Confirm password</p>
                                    <div className="xxx">
                                        <input id="confpwdField" className="input" type="password" onBlur={confPwdNextInput}/>
                                        <button className="nextButton" onClick={confPwdNextInput}>→</button>
                                    </div>
                                </div>

                                <div id="subButton" className="hidden">
                                    <BubblyButton name={"Signup"} onClick={SubmitHandler}></BubblyButton>
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
                    <div className="errorMsg hidden" id="errorBoxPwd">
                        <p> Make sure it's at least 8 characters including a number,
                           <br/> an uppercase letter and a lowercase letter </p>
                    </div>
                    <div className="errorMsg hidden" id="errorBoxConfPwd">
                        <p>Passwords don't match</p>
                    </div>


                </div>

            </div>

        </div>

    );
}

export default Signup;