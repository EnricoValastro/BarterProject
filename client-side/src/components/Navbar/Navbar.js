import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Notifications, Person, Search} from "@mui/icons-material";
import {Home} from "@mui/icons-material";
import {Storefront} from "@mui/icons-material";
import './Navbar.css'
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "../Menu/Menu";
export default function Navbar(props) {
    //Hamburger menu
    const [isOpen, setOpen] = useState(false);

   useEffect(() => {
       const PageControl =  () => {
           if(props.pagename === "Home"){
                document.getElementById('iconHome').classList.add('selected');
                document.getElementById('iconSearch').classList.remove('selected');
                document.getElementById('iconMarket').classList.remove('selected');
                document.getElementById('iconProfile').classList.remove('selected');
           }
           else if(props.pagename === "Search"){
                document.getElementById('iconSearch').classList.add('selected');
                document.getElementById('iconHome').classList.remove('selected');
                document.getElementById('iconMarket').classList.remove('selected');
                document.getElementById('iconProfile').classList.remove('selected');
           }
           else if(props.pagename === "Profile"){
                document.getElementById('iconProfile').classList.add('selected');
                document.getElementById('iconHome').classList.remove('selected');
                document.getElementById('iconSearch').classList.remove('selected');
                document.getElementById('iconMarket').classList.remove('selected');
           }
              else if(props.pagename === "Marketplace"){
                document.getElementById('iconMarket').classList.add('selected');
                document.getElementById('iconHome').classList.remove('selected');
                document.getElementById('iconSearch').classList.remove('selected');
                document.getElementById('iconProfile').classList.remove('selected');
           }

       }

       if(document.readyState === 'complete'){
           PageControl();
       }
       else {
           window.addEventListener('load', PageControl);
       }
   });

    return (
        <div className="appNavContainer" >
            <div className="navAll">
                <div className="navLeft">
                    <Link to="/home" className="linknav">Barter</Link>
                </div>

                <div className="navCenter">
                    <div id="iconHome"className="navItem">
                        <Link to="/home" className="icons">
                            <span><Home className="Icon"/></span>
                            <span>Home</span>
                        </Link>
                    </div>
                    <div id="iconSearch" className="navItem">
                        <Link to="/search" className="icons">
                            <span><Search className="Icon"/></span>
                            <span>Search</span>
                        </Link>
                    </div>
                    <div className="navItem" id="iconMarket">
                        <Link  to="/marketplace" className="icons">
                            <span><Storefront className="Icon"/></span>
                            <span>Marketplace</span>
                        </Link>

                    </div>

                </div>

                <div className="navRight">
                    <div className="navMobile navMobile-hidden">
                        <MenuIcon className="menu-btn" onClick={()=>setOpen(true)} />
                        <Menu isOpen={isOpen} onChange={setOpen}></Menu>
                    </div>
                    <div className="navItem">
                        <Link className="icons ">
                            <span><Notifications className="Icon"/></span>
                            <span>Notifications</span>
                        </Link>
                    </div>
                    <div className="navItem" id="iconProfile">
                        <Link to="/profile" className="icons">
                            <span><Person className="Icon"/></span>
                            <span>Profile</span>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );

}