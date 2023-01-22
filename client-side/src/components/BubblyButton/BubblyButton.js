import React from "react";

import "./BubblyButton.css";

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
        <button className="bubblyButton" onClick={animateButton}>{props.name}</button>
    );
}

export default BubblyButton;