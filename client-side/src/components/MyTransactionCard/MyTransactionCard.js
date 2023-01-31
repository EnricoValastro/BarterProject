import React, {useEffect, useState} from "react";
import axios from "axios";

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import './MyTransactionCard.css'
import arrayBufferToBase64 from "../../Utility/Utils";
import {Box, Modal} from "@mui/material";
import {toast} from "react-toastify";

export default function  MyTransactionCard(props){

    const [transaction, setTransaction] = useState([]);
    const [myProductName, setMyProductName] = useState();
    const [myProductImg, setMyProductImg] = useState([]);

    const [yourProductName, setYourProductName] = useState();
    const [yourProductImg, setYourProductImg] = useState([]);

    const [cancelOfferModal, setCancelOfferModal] = useState(false);
    const handleDelProductClose = () => setCancelOfferModal(false);
    const handleDelProductOpen = () => setCancelOfferModal(true);

    useEffect(() => {
        setTransaction(props.transaction);
    }, [props.transaction]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/product/market/getproductbyid/"+props.transaction.senderProductId)
            .then(response => {
                setMyProductName(response.data[0].name);
                setMyProductImg(response.data[0].image.data.data);
                const imgTag = document.createElement("img");
                imgTag.src = "data:"+response.data[0].image.contentType+";base64," + arrayBufferToBase64(response.data[0].image.data.data);
                imgTag.classList.add("myTransactionImg");
                const im = document.getElementById("left"+props.count);
                im.innerHTML = "";
                im.appendChild(imgTag);
            })
            .catch(error => {
                console.log(error);
            })
    }, [props.transaction, props.count]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/product/market/getproductbyid/"+props.transaction.receiverProductId)
            .then(response => {
                setYourProductName(response.data[0].name);
                setYourProductImg(response.data[0].image.data.data);
                const imgTag = document.createElement("img");
                imgTag.src = "data:"+response.data[0].image.contentType+";base64," + arrayBufferToBase64(response.data[0].image.data.data);
                imgTag.classList.add("myTransactionImg");
                const im = document.getElementById("right"+props.count);
                im.innerHTML = "";
                im.appendChild(imgTag);
            })
            .catch(error => {
                console.log(error);
            })
    }, [props.transaction, props.count]);

    /* Withdraw the offer */
    const cancelOffer = () => {
        axios.put("http://localhost:4000/api/product/unsetbusy/"+props.transaction.senderProductId, {
            busy: false
        }).then(response => {
            axios.delete("http://localhost:4000/api/transactions/removependingtransaction/"+props.transaction.senderProductId)
                .then(response => {
                    props.setNum(props.num+1);
                    handleDelProductClose();
                    toast.success('La tua offerta è stata ritirata️! 📪', {
                        position: "bottom-left",
                        autoClose: 6000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }).catch(error => {
                    console.log(error);
                });
        }).catch(error => {
                console.log(error);
        })
    }

    return(
        <div className="myTransactionCardContainer">
            <div className="myTransactionCardBtt tooltip" onClick={handleDelProductOpen}>
                <DeleteForeverRoundedIcon className={"myTDeleteIcon"}/>
            </div>
            <div className="myTransactionCardLeft">
                <div id={"left"+props.count} className="myTransactionLeftImage"></div>
                <div className="myTransactionLeftName">{myProductName}</div>
            </div>
            <div className="myTransactionCardCenter">
                <span className="loader"></span>
            </div>
            <div className="myTransactionCardRight">
                    <div className="myTransactionRightName">{yourProductName}</div>
                    <div id={"right"+props.count} className="myTransactionRightImage"></div>
            </div>
            <Modal
                open={cancelOfferModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <div className="deleteModalContainer">
                        <div className="deleteModal">
                            <div className="deleteModalText">
                                Sei sicuro di voler ritirare l'offerta?
                            </div>
                            <div className="deleteModalBtt">
                                <button className="deleteModalBttKo" onClick={handleDelProductClose}>Annulla</button>
                                <button className="deleteModalBttOk" onClick={cancelOffer}>Ritira</button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>

    )
}