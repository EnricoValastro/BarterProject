import React from "react";
import {Link} from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import './MenuMobile.css';
export default function MenuMobile({isOpen, onChange}) {

    return (
        <div className={`Menu ${isOpen && "open"}`}>
            <CloseIcon onClick={()=>onChange(false)} className="btn-close"/>
            <div className="Menu-items">
                <Link to="/home" className="Menu-item">Home</Link>
                <Link to="/search" className="Menu-item">Search</Link>
                <Link to="/marketplace" className="Menu-item">Marketplace</Link>
            </div>
        </div>
    )
}