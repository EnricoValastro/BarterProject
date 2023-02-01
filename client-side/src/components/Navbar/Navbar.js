import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {Person, Search} from "@mui/icons-material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import {Storefront} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {Badge, IconButton, Menu, MenuItem, styled, Tooltip} from "@mui/material";

import Notification from "../Notification/Notification";
import MenuMobile from "../MenuMobile/MenuMobile";
import './Navbar.css'

export default function Navbar(props) {
    //Hamburger menu
    const [menuOpen, setMenuOpen] = useState(false);

    /* Notifications dropdown */
    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationDropdown, setNotificationDropdown] = useState(false);

    /* Styled notifications badge */
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: 55,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 5px',
            color: 'white',
            backgroundColor: '#EE6C4D',
        },
    }));

    /* Notifications dropdown controller */
    const handleDropdownOpen = (event) =>{
        setAnchorEl(event.currentTarget);
        setNotificationDropdown(true);
    }

    const handleDropdownClose = () =>{
        setNotificationDropdown(false);
        props.setNum2(props.num2 + 1);
    }

   useEffect(() => {
       const PageControl =  () => {
           if(props.pagename === "Home"){
                document.getElementById('iconHome').classList.add('selected');
                document.getElementById('iconSearch').classList.remove('selected');
                document.getElementById('iconMarket').classList.remove('selected');
           }
           else if(props.pagename === "Search"){
                document.getElementById('iconSearch').classList.add('selected');
                document.getElementById('iconHome').classList.remove('selected');
                document.getElementById('iconMarket').classList.remove('selected');
           }
           else {
                document.getElementById('iconMarket').classList.add('selected');
                document.getElementById('iconHome').classList.remove('selected');
                document.getElementById('iconSearch').classList.remove('selected');
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
                <div className="navMobile navMobile-hidden">
                    <MenuIcon className="menu-btn" onClick={()=>setMenuOpen(true)} />
                    <MenuMobile isOpen={menuOpen} onChange={setMenuOpen}></MenuMobile>
                </div>
                <div className="navCenter">
                    <div id="iconHome"className="navItem">
                        <Link to="/home" className="icons">
                            <span><HomeRoundedIcon className="Icon"/></span>
                            <span>Home</span>
                        </Link>
                    </div>
                    <div id="iconSearch" className="navItem">
                        <Link to="/search" className="icons">
                            <span><Search className="Icon"/></span>
                            <span>Cerca</span>
                        </Link>
                    </div>
                    <div className="navItem" id="iconMarket">
                        <Link  to="/marketplace" className="icons">
                            <span><Storefront className="Icon"/></span>
                            <span>La tua vetrina</span>
                        </Link>

                    </div>

                </div>
                <div className="navRight">
                    <div className="navItem">

                        <Tooltip title={`You have ${props.unreadNotifications} notifications`}>
                            <IconButton
                                aria-label="more"
                                onClick={handleDropdownOpen}
                                size="small"
                                id="long-button"
                                aria-controls={notificationDropdown ? 'long-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={notificationDropdown ? 'true' : undefined}
                                disableRipple={true}
                            >
                                <StyledBadge badgeContent={props.unreadNotifications} showZero={false} color="error">
                                    <NotificationsRoundedIcon className="Icon" />
                                </StyledBadge>
                            </IconButton>

                        </Tooltip>

                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            open={notificationDropdown && props.notifications.length > 0}
                            onClose={handleDropdownClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 0.8,
                                    '& .MuiSvgIcon-root': {
                                        width: 32,
                                        height: 32,
                                        ml: 1,
                                        mr: 1,
                                    },
                                },
                            }}
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                        >

                            {
                                props.notifications.map((notification, index) => (
                                    <MenuItem key={index} divider={true} sx = {{backgroundColor: notification.read ? "rgba(217, 227, 231, 0.9)" : "rgba(49,122,199,0.8)"}}>
                                        <Notification notification={notification} num2={props.num2} setNum2={props.setNum2} socket={props.socket} />
                                    </MenuItem>
                                ))
                            }

                        </Menu>

                    </div>
                    <div className="navItem" id="iconProfile">
                        <span><Person className="Icon"/></span>
                    </div>
                </div>


            </div>
        </div>
    );

}