import React, {useEffect, useState} from "react";
import {Box, Modal} from "@mui/material";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';

import MoreButton from "../MoreButton/MoreButton";
import BubblyButton from "../BubblyButton/BubblyButton";
import useToken from "../App/useToken";

import "./ProductCard.css";

export default function ProductCard(props) {

    const {token, setToken} = useToken();
    const [product, setProduct] = useState([]); //I prodotti dell'utente attivo

    const [id, setId] = useState();
    const [name, setName] = useState();
    const [value, setValue] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [status, setStatus] = useState();
    const [location, setLocation] = useState();
    const [date, setDate] = useState();
    const [user, setUser] = useState();
    const [img, setImg] = useState([])

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setId(props.id);
        setName(props.name);
        setValue(props.value);
        setDescription(props.desc);
        setCategory(props.category);
        setStatus(props.status);
        setLocation(props.location);
        setDate(props.date.split("T")[0]);
        setUser(props.user);
    }, [props.id, props.name, props.value, props.desc, props.category, props.status, props.location, props.date, props.user]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/product/search/imgbyid/"+props.id)
            .then(response => {
                setImg(response.data[0].image.data.data);
                const imgTag = document.createElement("img");
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

    useEffect(() => {
        axios.get("http://localhost:4000/api/product/getuserproductfromtoken/"+token)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    /* Funzione per inviare notifica di scambio prodotto ad un altro utente, necessita recuperare valore della select */
    function someFun(){
        console.log("someFun");
    }

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

    function afterOpenModal(){
        console.log("ciao");
        const modalImg = document.createElement("img")
        modalImg.src = "data:image/png;base64," + arrayBufferToBase64(img);
        modalImg.classList.add("modalImg");
        const modIm = document.getElementById("modalview"+id);
        modIm.innerHTML = "";
        modIm.appendChild(modalImg);
    }

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
                onFocus={afterOpenModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box >
                    <div className="modal">
                        <div className="modalviewContainer">
                            <div className="iconClose">
                                <CloseIcon className="xIcon" onClick={handleClose}></CloseIcon>
                            </div>
                            <div className="modalviewContentContainer">
                                <div id={"modalview"+id} className="modalviewLeftCont">

                                </div>
                                <div className="modalviewRightCont">
                                    <div className="modalTitle">{name}</div>
                                    <div className="modalCategory">{category}</div>
                                    <div className="modalText">
                                        <div className="modalLocAndDate">{location} - {date}</div>
                                        <div className="modalDescription">{description}</div>
                                        <div className="modalValAndStatus">
                                            Valore commerciale: {value} €
                                            <br/>
                                            Stato: {status}
                                        </div>
                                    </div>
                                    <div className="modalButton">
                                        <select className="carouselCardOfferSelect" name="productSelect" id="productSelect">
                                            <option value="" selected disabled hidden>Seleziona un prodotto</option>
                                            {product.map((p) => (
                                                <option value={p._id}>{p.name}</option>
                                            ))}
                                        </select>
                                        <div className="carouselCardOfferBtt">
                                            <BubblyButton name={"Trade it!"} onClick={someFun}  />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>

    );
}