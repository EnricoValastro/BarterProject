import React from "react";
import {Link} from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import './Menu.css';
export default function Menu({isOpen, onChange}) {

    return (
        <div className={`Menu ${isOpen && "open"}`}>
            <CloseIcon onClick={()=>onChange(false)} className="btn-close"/>
            <div className="Menu-items">
                <Link to="/home" className="Menu-item">Home</Link>
                <Link to="/search" className="Menu-item">Search</Link>
                <Link to="/marketplace" className="Menu-item">Marketplace</Link>
                <Link to="/notifications" className="Menu-item">Notifications</Link>
                <Link to="/profile" className="Menu-item">Profile</Link>
            </div>
        </div>
    )
}