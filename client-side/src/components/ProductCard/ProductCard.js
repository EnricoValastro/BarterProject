import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";

import {Box, Modal} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import arrayBufferToBase64 from "../../Utility/Utils";
import BubblyButton from "../BubblyButton/BubblyButton";
import useToken from "../App/useToken";

import "./ProductCard.css";
import 'react-toastify/dist/ReactToastify.css';



export default function ProductCard(props) {

    /* User's id */
    const [userId, setUserId] = useState("");

    /* This user's product list & transactions list */
    const [product, setProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState();

    const[disabledP, setDisabledP] = useState([]);
    const [transactions, setTransactions] = useState([]);

    /* Other user's products details */
    const [pr, setPr] = useState({
        id: "",
        name: "",
        value: "",
        description: "",
        category: "",
        status: "",
        location: "",
        date: "",
        user: ""
    });
    const [img, setImg] = useState([])

    /* Product modal control */
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    /* Set state from props */
    useEffect(() => {
        setPr({
            id: props.id,
            name: props.name,
            value: props.value,
            description: props.desc,
            category: props.category,
            status: props.status,
            location: props.location,
            date: props.date.split("T")[0],
            user: props.user
        });
        setProduct(props.product);
        setUserId(props.myId);
    }, [props.product]);

    /* Retrieves image from database */
    useEffect(() => {
        axios.get("http://localhost:4000/api/product/getimgbyid/"+props.id)
            .then(response => {
                setImg(response.data[0].image.data.data);
                const imgTag = document.createElement("img");
                imgTag.src = "data:"+response.data[0].image.contentType+";base64," + arrayBufferToBase64(response.data[0].image.data.data);
                imgTag.classList.add("product-image");
                const im = document.getElementById(props.id);
                im.innerHTML = "";
                im.appendChild(imgTag);
            })
            .catch(error => {
                console.log(error);
            })
    }, [props.id]);

    useEffect(() => {
        const arr = [];
        props.transactions.forEach((transaction) => {
            arr.push(transaction.receiverProductId);
        });
        setTransactions(arr);
    }, [props.transactions]);

    /* Handle selection from select */
    const handleSelectedProduct = (event) => {
        setSelectedProduct(event.target.value);
    }

    /* Trade product  */
    function someFun(){
        if(transactions.includes(pr.id)){
            toast.error('Perfavore attendi che l\'offerta che hai già fatto venga accettata o rifiutata! 🙏🏻', {
                position: "bottom-left",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            handleClose();
        }
        else{
            if(selectedProduct === undefined){
                toast.error('Per fare un\' offerta devi selezionare un prodotto! 😅', {
                    position: "bottom-left",
                    autoClose: 6000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            else {
                axios.put("http://localhost:4000/api/product/setbusy/"+selectedProduct, {
                    busy: true
                }).then(response => {

                }).catch(error => {
                    console.log(error);
                });
                axios.post("http://localhost:4000/api/transactions/addnewpendingtransaction", {
                    senderId: userId,
                    senderProductId: selectedProduct,
                    receiverId: pr.user,
                    receiverProductId: pr.id
                }).then(response => {
                    props.setNum(props.num+1);
                }).catch(error => {
                    console.log(error);
                });
                handleClose();
                toast.success('Offerta inviata! 📬', {
                    position: "bottom-left",
                    autoClose: 6000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
        }



    /* Add image on madal */
    function afterOpenModal(){
        const modalImg = document.createElement("img")
        const modIm = document.getElementById("modalview"+pr.id);
        modalImg.src = "data:image/png;base64," + arrayBufferToBase64(img);
        modalImg.classList.add("modalImg");
        modIm.innerHTML = "";
        modIm.appendChild(modalImg);
    }

    return (
        <>
            <div className="productCard" onClick={handleOpen}>

                <div id={props.id} className="productImage"></div>
                <div className="productDescription">
                    <p className="productName"> {pr.name} </p>
                    <span className="productText" > {pr.description} </span>
                    <div className="moreBtt">
                        <div className="mbtt"><BubblyButton onClick={handleOpen} name={"Scopri"}/></div>
                    </div>
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
                                <div id={"modalview"+pr.id} className="modalviewLeftCont">

                                </div>
                                <div className="modalviewRightCont">
                                    <div className="modalTitle">{pr.name}</div>
                                    <div className="modalCategory">{pr.category}</div>
                                    <div className="modalText">
                                        <div className="modalLocAndDate">{pr.location} - {pr.date}</div>
                                        <div className="modalDescription">{pr.description}</div>
                                        <div className="modalValAndStatus">
                                            Valore commerciale: {pr.value} €
                                            <br/>
                                            Stato: {pr.status}
                                        </div>
                                    </div>
                                    <div className="modalButton">
                                        <select className="modalOfferSelect" name="productSelect" id="productCardSelect" onChange={handleSelectedProduct}>
                                            <option value="" selected disabled hidden>Seleziona un prodotto</option>
                                            {product.map((p, index) => (
                                                <option key={"prodCard"+index} value={p._id} disabled={p.busy}>{p.name}</option>
                                            ))}
                                        </select>
                                        <div className="modalOfferBtt">
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