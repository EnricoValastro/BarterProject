import React from "react";
import './Footer.css';

export default function Footer() {
    return (
        <div id="appfooter">
            <div className="footerContainer">
                <div className="footertitle">
                    Barter
                </div>
                <div className="footerdescription">
                    <span>Progetto finale di Applicazioni e Servizi Web (UniBo - Campus di Cesena) </span>
                    <br/>
                    <span>Powered by: <a href="https://github.com/EnricoValastro" className='footerlink'>Enrico Valastro</a> & <a href="https://github.com/ale-rei" className='footerlink'>Alessio Reitano</a> </span>
                </div>

            </div>
        </div>
    )
}