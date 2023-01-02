import React from "react";
import Signup from "../SignUp/SignUp";

import "./BubblyButton.css";
import * as events from "events";

function BubblyButton(props) {
    function animateButton(event){
        event.preventDefault();
        event.target.classList.remove('animate');
        event.target.classList.add('animate');
        setTimeout(function(){
            event.target.classList.remove('animate');
        }, 700);
        setTimeout(function(){
            props.onClick();
        },800);

    }


    return (
        <div>
          <button className="bubblyButton" onClick={animateButton}>{props.name}</button>
        </div>
    );
}

export default BubblyButton;