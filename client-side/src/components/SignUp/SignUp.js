import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import axios from "axios";
import DoneIcon from '@mui/icons-material/Done';

import BubblyButton from "../BubblyButton/BubblyButton";
import './SignUp.css';


function Signup(){
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function iconInit(done, next){
        const ok        = document.getElementById(done);
        const nex      = document.getElementById(next);
        ok.classList.add('hidden');
        nex.classList.remove('hidden');
    }

    function SubmitHandler(){

        axios.post("http://localhost:4000/api/user/signup", {
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
        const focusOn   = document.getElementById('surnameField');
        const ok        = document.getElementById('done1');
        const next      = document.getElementById('next1');
        if(nameInput.length >= 1){
            setName(nameInput);
            document.getElementById('errorBoxName').classList.add('hidden');
            nextInput.classList.remove('hidden');
            next.classList.add('hidden');
            ok.classList.remove('hidden');
            focusOn.focus();
        }
        else{
            document.getElementById('errorBoxName').classList.remove('hidden');
        }
    }

    function surnameNextInput(event){
        event.preventDefault();
        const surnameInput = document.getElementById('surnameField').value;
        const nextInput = document.getElementById('emailInput');
        const focusOn   = document.getElementById('emailField');
        const ok        = document.getElementById('done2');
        const next      = document.getElementById('next2');
        if(surnameInput.length >= 1){
            setSurname(surnameInput);
            document.getElementById('errorBoxSurname').classList.add('hidden');
            nextInput.classList.remove('hidden');
            next.classList.add('hidden');
            ok.classList.remove('hidden');
            focusOn.focus();
        }
        else{
            document.getElementById('errorBoxSurname').classList.remove('hidden');
        }
    }

    function emailNextInput(event){
        event.preventDefault();
        const emailInput = document.getElementById('emailField').value;
        const nextInput = document.getElementById('pwdInput');
        const focusOn   = document.getElementById('pwdField');
        const ok        = document.getElementById('done3');
        const next      = document.getElementById('next3');

        axios.post("http://localhost:4000/api/user/emailValidation", {
            email: emailInput

        }).then((response)=>{
            if(emailInput === ''){
                document.getElementById('errorBoxEmail').classList.remove('hidden');
            }
            else if(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(emailInput) && !response.data){

                document.getElementById('errorBoxEmail').classList.add('hidden');
                setEmail(emailInput);
                nextInput.classList.remove('hidden');
                next.classList.add('hidden');
                ok.classList.remove('hidden');
                focusOn.focus();
            }
            else{
                document.getElementById('errorBoxEmail').classList.remove('hidden');
            }
        });
    }

    function pwdNextInput(event){
        event.preventDefault();
        const pwdInput = document.getElementById('pwdField').value;
        const nextInput = document.getElementById('subButton');
        const ok        = document.getElementById('done4');
        const next      = document.getElementById('next4');

        const lowerCaseLetters = /[a-z]/g;
        const upperCaseLetters = /[A-Z]/g;
        const numbers = /[0-9]/g;

        if(pwdInput.length >= 8 && pwdInput.match(lowerCaseLetters) && pwdInput.match(upperCaseLetters) && pwdInput.match(numbers)){
            document.getElementById('errorBoxPwd').classList.add('hidden');
            setPassword(pwdInput);
            nextInput.classList.remove('hidden');
            next.classList.add('hidden');
            ok.classList.remove('hidden');
        }
        else {
            document.getElementById('errorBoxPwd').classList.remove('hidden');
        }

    }

    return (
        <div id="signup">
            <div className="cont">

                <div className="navbarContainer">
                    <div className="navbar">
                        <div >
                            <Link to="/" className="link" id="barter">Barter</Link>
                        </div>
                        <div >
                            <span id="already">Already have an account?</span>
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
                                    <div className="xxx">
                                        <div className="form__group field">
                                            <input id="nameField" required="" placeholder="Name" className="form__field" type="input" onBlur ={nameNextInput} onFocus={iconInit.bind(this, "done1", "next1")}/>
                                            <label className="form__label" htmlFor="name">Name</label>
                                        </div>
                                        <div id="done1" className="DoneIcon hidden">
                                            <DoneIcon className="doneIcon"/>
                                        </div>
                                        <button id="next1" className="nextButton" onClick={nameNextInput}>→</button>
                                    </div>
                                </div>

                                <div id="surnameInput" className="inputContainer hidden">
                                    <div className="xxx">
                                        <div className="form__group field">
                                            <input id="surnameField" required="" placeholder="Surname" className="form__field" type="input" onBlur ={surnameNextInput} onFocus={iconInit.bind(this, "done2", "next2")}/>
                                            <label className="form__label" htmlFor="name">Surname</label>
                                        </div>

                                        <div id="done2" className="DoneIcon hidden">
                                            <DoneIcon className="doneIcon"/>
                                        </div>
                                        <button id="next2" className="nextButton" onClick={surnameNextInput}>→</button>
                                    </div>
                                </div>

                                <div id="emailInput" className="inputContainer hidden">
                                    <div className="xxx">
                                        <div className="form__group field">
                                            <input id="emailField" required="" placeholder="Email" className="form__field" type="input" onBlur ={emailNextInput} onFocus={iconInit.bind(this, "done3", "next3")}/>
                                            <label className="form__label" htmlFor="name">Email</label>
                                        </div>

                                        <div id="done3" className="DoneIcon hidden">
                                            <DoneIcon className="doneIcon"/>
                                        </div>
                                        <button id = "next3" className="nextButton" onClick={emailNextInput}>→</button>
                                    </div>
                                </div>

                                <div id="pwdInput" className="inputContainer hidden">
                                    <div className="xxx">
                                        <div className="form__group field">
                                            <input id="pwdField" required="" placeholder="Password" className="form__field" type="password" onBlur={pwdNextInput} onFocus={iconInit.bind(this, "done4", "next4")}/>
                                            <label className="form__label" htmlFor="name">Password</label>
                                        </div>

                                        <div id="done4" className="DoneIcon hidden">
                                            <DoneIcon className="doneIcon"/>
                                        </div>
                                        <button id="next4" className="nextButton" onClick={pwdNextInput}>→</button>
                                    </div>
                                </div>

                                <div id="subButton" className="subButton hidden">
                                    <div className="signupbtt">
                                        <BubblyButton name={"Signup"} onClick={SubmitHandler}/>
                                    </div>

                                </div>

                            </form>
                        </div>
                    </div>

                    <div className="errorBox">
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

        </div>

    );
}

export default Signup;