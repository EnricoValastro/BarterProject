import React from 'react';
import {Link} from "react-router-dom";

import './OnBoarding.css';

export default function OnBoarding() {
    return(
        <div id="onBoarding">
            <div className="navContainer">
                <div className="nav">
                    <div className="logo">
                        <Link to="/" className="logoLink">Barter</Link>
                    </div>
                    <div className="navigate">
                        <Link to="/signin" className="links eff">Signin</Link>
                        <Link to="/signup" className="links eff">Signup</Link>
                    </div>
                </div>
            </div>

            <div className="animated-title">
                <div className="text-top">
                    <div>
                        <span>Barter</span>
                    </div>
                </div>
                <div className="text-bottom">
                    <div>Scambia il futuro!</div>
                </div>
            </div>


            <div className="sectionContainer">
                <div className="section1">
                    <div className="presentation"></div>
                    <div className="description">
                        <h1 className="descriptionTitle">
                            <span>Barter, la piattaforma di scambio online </span>
                        </h1>
                        <p className="descriptionText">
                            <span>
                                Barter è una piattaforma di scambio online che permette agli utenti di scambiare i propri beni
                                con altri utenti.
                            </span>
                        </p>

                    </div>
                </div>
                <div className="section2">
                    <div className="description2">
                        <h1 className="descriptionTitle2">
                            <span>Barter, la piattaforma di scambio online </span>
                        </h1>
                        <p className="descriptionText2">
                            <span>
                                Barter è una piattaforma di scambio online che permette agli utenti di scambiare i propri beni
                                con altri utenti.
                            </span>
                        </p>
                    </div>
                    <div className="presentation2"></div>
                </div>

            </div>


        </div>

    );
}