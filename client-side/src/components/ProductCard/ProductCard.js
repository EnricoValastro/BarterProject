import React, {useEffect, useState} from "react";
import {Box, Modal} from "@mui/material";
import axios from "axios";

import MoreButton from "../MoreButton/MoreButton";

import CloseIcon from '@mui/icons-material/Close';
import "./ProductCard.css";
import BubblyButton from "../BubblyButton/BubblyButton";
export default function ProductCard(props) {

    const [id, setId] = useState();
    const [name, setName] = useState();
    const [value, setValue] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [status, setStatus] = useState();
    const [location, setLocation] = useState();
    const [date, setDate] = useState();
    const [user, setUser] = useState();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setId(props.id);
        setName(props.name);
        setValue(props.value);
        setDescription(props.desc);
        setCategory(props.category);
        setStatus(props.status);
        setLocation(props.location);
        setDate(props.date);
        setUser(props.user);
    }, [props.id, props.name, props.value, props.desc, props.category, props.status, props.location, props.date, props.user]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/product/search/imgbyid/"+props.id)
            .then(response => {
                let imgTag = document.createElement("img");
                imgTag.src = "data:image/png;base64," + arrayBufferToBase64(response.data[0].image.data.data);
                imgTag.classList.add("product-image");
                const im = document.getElementById(props.id);
                im.innerHTML = "";
                im.appendChild(imgTag);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    function arrayBufferToBase64( buffer ) {
        let binary = '';
        let bytes = new Uint8Array( buffer );
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);


    return (
        <>
            <div className="productCard">
                <div id={props.id} className="productImage">

                </div>
                <div className="productDescription">
                    <p className="productName">
                        {name}
                    </p>
                    <span className="productText" >
                        {description}
                    </span>
                    <div className="moreBtt">
                        <BubblyButton onClick={handleOpen} name={"Scopri"}/>
                    </div>

                </div>
                <div className="bttContainer">
                    <MoreButton onClick={handleOpen}/>
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box >
                    <div className="modalviewContainer">
                        <CloseIcon onClick={handleClose}></CloseIcon>
                        <h1 className="modalTitle">{name}</h1>
                        <p className="modalText">
                            {description}
                        </p>
                    </div>
                </Box>
            </Modal>
        </>

    );
}