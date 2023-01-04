import React from "react";
import {Link} from "react-router-dom";
import {Notifications, Person, Search} from "@mui/icons-material";
import {Home} from "@mui/icons-material";
import {Storefront} from "@mui/icons-material";
import './Navbar.css'
export default function Navbar(props) {

    return (
        <div className="appNavContainer">
            <div className="navAll">
                <div className="navLeft">
                    <Link to="/home" className="linknav">Barter</Link>
                </div>

                <div className="navCenter">
                    <div className="navItem">
                        <Link to="/home" className="icons">
                            <span><Home id="iconHome" className="Icon"/></span>
                            <span>Home</span>
                        </Link>
                    </div>
                    <div className="navItem">
                        <Link to="/search" className="icons">
                            <span><Search id="iconSearch" className="Icon"/></span>
                            <span>Search</span>
                        </Link>
                    </div>
                    <div className="navItem">
                        <Link to="/marketplace" className="icons">
                            <span><Storefront id="iconMarket" className="Icon"/></span>
                            <span>Marketplace</span>
                        </Link>

                    </div>

                </div>
                <div className="navRight">
                    <div className="navItem">
                        <Link className="icons linknav">
                            <span><Notifications id="iconNotify" className="Icon"/></span>
                            <span>Notifications</span>
                        </Link>
                    </div>
                    <div className="navItem">
                        <Link to="/profile" className="icons">
                            <span><Person id="iconPerson" className="Icon"/></span>
                            <span>Profile</span>
                        </Link>
                    </div>

                </div>
            </div>
        </div>


    );


}