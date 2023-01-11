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
                        <Link to="/signin" className="links">Signin</Link>
                        <Link to="/signup" className="links">Signup</Link>
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
                            <span>
                                Sbarazzati dei prodotti che non usi più
                            </span>
                        </h1>
                        <p className="descriptionText2">
                           <span>
                                Entra in Barter, metti in vetrina i tuoi prodotti,
                                riceverai offerte da altri utenti,
                                sarai tu a scegliere ciò che ti interessa di più.
                            </span>
                        </p>
                    </div>
                    <div className="presentation2"></div>
                </div>
                <div className="section3">
                    <div className="presentation3"></div>
                    <div className="description3">
                        <h1 className="descriptionTitle3">
                            <span>
                                Desideri qualcosa in particolare?
                            </span>
                        </h1>
                        <p className="descriptionText3">
                            <span>
                                Ricerca su Barter tra i prodotti messi in vetrina
                                dagli altri utenti, trova ciò che fa al caso tuo,
                                fai un'offerta e concludi la trattativa.
                            </span>
                        </p>
                    </div>
                </div>
                <div className="section4">
                    <div className="description4">
                        <h1 className="descriptionTitle4">
                            <span>
                                Porta a termine la trattativa
                            </span>
                        </h1>
                        <p className="descriptionText4">
                            <span>
                                Concludi gli scambi ricevi e goditi i tuoi nuovi prodotti.
                            </span>
                        </p>
                    </div>
                    <div className="presentation4"></div>
                </div>
                <div className="section5">
                    <div className="presentation5"></div>
                    <div className="description5">
                        <h1 className="descriptionTitle5">
                            <span>Sei interessato e vorresti provare Barter?</span>
                        </h1>
                        <p className="descriptionText5">
                            <span>
                               Registrati compilando il form e accedi alla piattaforma per scoprire un mondo di offerte.
                            </span>
                            <span className="spanLink">
                                <Link to="/signup" className="links eff" id="SignupLink">Registrati</Link>
                            </span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}