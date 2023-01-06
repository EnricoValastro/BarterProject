import React from "react";


import CloseIcon from '@mui/icons-material/Close';
import "./ProductCard.css";
import {Box, Modal, Typography} from "@mui/material";

export default function ProductCard() {


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="productCard">
            <div className="productImage">

            </div>
            <div className="productDescription">
                <p className="productName">
                    Some name
                </p>
                <span className="productText" >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ommodo consequat.
                </span>
                <button className="productCardBtt" onClick={handleOpen}>View More →</button>
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
        </div>
    );
}