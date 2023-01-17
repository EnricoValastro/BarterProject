import React from "react";


import CloseIcon from '@mui/icons-material/Close';
import "./ProductCard.css";
import {Box, Modal, Typography} from "@mui/material";
import MoreButton from "../MoreButton/MoreButton";
import axios from "axios";

export default function ProductCard(props) {


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    console.log(props.id);

    return (
        <div className="productCard">
            <div className="productImage">

            </div>
            <div className="productDescription">
                <p className="productName">
                    {props.name}
                </p>
                <span className="productText" >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ommodo consequat.
                </span>

            </div>
            <div className="bttContainer">
                <MoreButton onClick={handleOpen}/>
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
                        <h1 className="modalTitle">Some title for the modal card</h1>
                        <p className="modalText">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ommodo consequat.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ommodo consequat.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ommodo consequat.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ommodo consequat.
                        </p>
                    </div>
                </Box>
            </Modal>

        </div>
    );
}