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
                        <button className="icons">
                            <span><Home className="Icon"/></span>
                            <span>Home</span>
                        </button>
                    </div>
                    <div className="navItem">
                        <button className="icons">
                            <span><Search className="Icon"/></span>
                            <span>Search</span>
                        </button>
                    </div>
                    <div className="navItem">
                        <button className="icons">
                            <span><Storefront className="Icon"/></span>
                            <span>Marketplace</span>
                        </button>

                    </div>

                </div>
                <div className="navRight">
                    <div className="navItem">
                        <button className="icons">
                            <span><Notifications className="Icon"/></span>
                            <span>Notifications</span>
                        </button>
                    </div>
                    <div className="navItem">
                        <button className="icons">
                            <span><Person className="Icon"/></span>
                            <span>Profile</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>


    );


}