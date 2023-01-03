import React from "react";
import {Link} from "react-router-dom";
import {Notifications, Person, Search} from "@mui/icons-material";
import {Home} from "@mui/icons-material";
import {Storefront} from "@mui/icons-material";
import './Navbar.css'
export default function Navbar() {

    return (
        <div className="appNavContainer">
            <div className="navAll">
                <div className="navLeft">
                    <Link to="/home" className="linknav">Barter</Link>
                </div>

                <div className="navCenter">
                    <div className="navItem">
                        <div className="icons">
                            <div className="layer">
                                <span></span>
                                <span></span>
                                <span className="Icon">
                                    <Link className="linknav" to="/home">
                                        <Home />
                                    </Link>
                                </span>
                            </div>
                            <div className="text">
                                Home
                            </div>
                        </div>
                    </div>
                    <div className="navItem">
                        <div className="icons">
                            <div className="layer">
                                <span></span>
                                <span></span>
                                <span className="Icon">
                                    <Link className="linknav" to="">
                                        <Search />
                                    </Link>
                                </span>
                            </div>
                            <div className="text">
                                Search
                            </div>
                        </div>
                    </div>
                    <div className="navItem">
                        <div className="icons">
                            <div className="layer">
                                <span></span>
                                <span></span>
                                <span className="Icon">
                                    <Link className="linknav" to="">
                                        <Storefront />
                                    </Link>
                                </span>
                            </div>
                            <div className="text">
                                Marketplace
                            </div>
                        </div>

                    </div>

                </div>
                <div className="navRight">
                    <div className="navItem">
                        <div className="icons">
                            <div className="layer">
                                <span></span>
                                <span></span>
                                <span className="Icon">
                                    <Link className="linknav" to="">
                                        <Notifications />
                                    </Link>
                                </span>
                            </div>
                            <div className="text">
                                Notifications
                            </div>
                        </div>
                    </div>
                    <div className="navItem">
                        <div className="icons">
                            <div className="layer">
                                <span></span>
                                <span></span>
                                <span className="Icon">
                                    <Link className="linknav" to="">
                                        <Person />
                                    </Link>
                                </span>
                            </div>
                            <div className="text">
                                Profile
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


    );



}