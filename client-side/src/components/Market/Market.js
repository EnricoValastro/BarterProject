import React, {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from "@mui/icons-material/Close";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import {Box, Modal} from "@mui/material";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import BubblyButton from "../BubblyButton/BubblyButton";
import MyProductCard from "../MyProductCard/MyProductCard";
import useToken from "../App/useToken";

import './Market.css';
import MyTransactionCard from "../MyTransactionCard/MyTransactionCard";

export default function Market(props){

    /* Token & userId */
    const { token, setToken } = useToken();
    const [userId, setUserId] = useState();

    let count = 0;

    /* Modals state  */
    const [newProductOpen, setNewProductOpen] = useState(false);

    /* New product data */
    const [newProductName, setNewProductName] = useState("");
    const [newProductDescription, setNewProductDescription] = useState("");
    const [newProductImage, setNewProductImage] = useState("");
    const [newProductValue, setNewProductValue] = useState("");
    const [newProductLocation, setNewProductLocation] = useState("");
    const [newProductCategory, setNewProductCategory] = useState("");
    const [newProductStatus, setNewProductStatus] = useState("");

    /* My product and transactions */
    const [myProd, setMyProd] = useState([]);
    const [myTransactions, setMyTransactions] = useState([]);

    /* Select option list */
    const category = ["Informatica", "Smartphone", "Tablet", "Console-Game", "Arredamento", "Elettrodomestici", "Arte", "Antiquariato", "Fotografia", "Sport", "Libri", "Musica", "Pelletteria", "Abbigliamento", "Gioielleria", "Orologi"];
    const status = ["Nuovo", "Ottimo", "Buono", "Discreto", "Pessimo"];


    useEffect(() => {
        setMyProd(props.product);
        setMyTransactions(props.transactions);
        setUserId(props.userId);
    }, [props.product, props.transactions]);

    useEffect(() => {
        if(props.product.length === 0){
            document.getElementById("myProduct").classList.add("hidden");
            document.getElementById("myPTitle").classList.add("hidden");
            document.getElementById("myProductEmpty").classList.remove("hidden");
        }
        else{
            document.getElementById("myProduct").classList.remove("hidden");
            document.getElementById("myPTitle").classList.remove("hidden");
            document.getElementById("myProductEmpty").classList.add("hidden");
        }
        if(props.transactions.length===0){
            document.getElementById("myTransaction").classList.add("hidden");
            document.getElementById("myTTitle").classList.add("hidden");
        }
        else{
            document.getElementById("myTransaction").classList.remove("hidden");
            document.getElementById("myTTitle").classList.remove("hidden");
        }

    },[props.product, props.transactions])

    /* Modal controllers */
    const handleNewProductOpen = () => {
        setNewProductOpen(true);
    };
    const handleNewProductClose = () => {
        setNewProductOpen(false);
    };

    /* onChange handler */
    const newProdNameHandler = (event) => {
        setNewProductName(event.target.value);
    }
    const newProdDescHandler = (event) => {
        setNewProductDescription(event.target.value);
    }
    const newProdValHandler = (event) => {
        setNewProductValue(event.target.value);
    }
    const newProdLocHandler = (event) => {
        setNewProductLocation(event.target.value);
    }
    const newProdCatHandler = (event) => {
        setNewProductCategory(event.target.value);
    }
    const newProdStatHandler = (event) => {
        setNewProductStatus(event.target.value);
    }
    const newProdImgHandler = (event) => {
        const preview = document.getElementById("imgPreview");
        const input = document.getElementById("imgField");
        while(preview.firstChild) {
            preview.removeChild(preview.firstChild);
        }
        const curFiles = input.files;
        if (curFiles.length === 0) {
            const para = document.createElement('p');
            para.textContent = 'No files currently selected for upload';
            preview.appendChild(para);
        }
        else{
            const image = document.createElement('img');
            image.src = URL.createObjectURL(curFiles[0]);
            image.classList.add("imgPreviewImg");
            preview.appendChild(image);
            setNewProductImage(curFiles[0]);
        }
    }

    /* Submit handler */
    const newProdSubmitHandler = (event) => {
        if(newProductName.length === 0 || newProductDescription.length === 0 || newProductValue.length === 0 || newProductLocation.length === 0 || newProductCategory.length === 0 || newProductStatus.length === 0 ){
            toast.error('Ops! 🤔 Sembra che tu non abbia compilato tutti i campi.', {
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
        else{
            const formData = new FormData();
            formData.append("name", newProductName);
            formData.append("description", newProductDescription);
            formData.append("image", newProductImage);
            formData.append("category", newProductCategory);
            formData.append("status", newProductStatus);
            formData.append("value", newProductValue);
            formData.append("location", newProductLocation);
            formData.append("userID", userId);
            axios.post('http://localhost:4000/api/product/upload', formData)
                .then(res => {
                    toast.success(newProductName +' è stato aggiunto alla tua vetrina! 🥳', {
                        position: "bottom-left",
                        autoClose: 6000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    props.setNum(props.num + 1);
                    handleNewProductClose();
                })
                .catch(err => {
                    toast.error( 'Ops! Qualcosa è andato storto 😱, riprova più tardi.', {
                        position: "bottom-left",
                        autoClose: 6000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    handleNewProductClose();
                });
        }
    }

    return (
        <div id="marketplace" className="marketplace">
            <Navbar pagename={"Marketplace"} notifications={props.notifications} unreadNotifications={props.unreadNotifications} num2={props.num2} setNum2={props.setNum2} socket={props.socket} userEmail={props.userEmail} />
            <div className="newProduct">
                <button onClick={handleNewProductOpen} className="newProductButton">
                    <AddCircleOutlineIcon className="newProductIcon"/>
                    <div className="newProductText">
                        Aggiungi in vetrina
                    </div>
                </button>
                <Modal
                    open={newProductOpen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box>
                        <div className="newProductModalContainer">
                            <div className="newProductModal">
                                <div className="newProductModalIconClose">
                                    <CloseIcon className="newProductModalXIcon" onClick={handleNewProductClose}></CloseIcon>
                                </div>
                                <div className="newProductModalFieldContainer">

                                    <div className="newProductModalLeftContent">
                                        <div className="modalFormGroup">
                                            <label htmlFor="nameField" className="modalLabel">Nome</label>
                                            <input id="nameField" type="input" required name="nome" placeholder="Inserisci il nome del prodotto"  className="modalFormField modalNameInput" onChange={newProdNameHandler}/>
                                        </div>
                                        <div className="modalFormGroup">
                                            <label htmlFor="descField" className="modalLabel">Descrizione</label>
                                            <textarea id="descField"  required placeholder="Descrivi brevemente il prodotto" name="desc" rows={3} className="modalFormField modalDescInput" onChange={newProdDescHandler}/>
                                        </div>
                                        <div className="modalFormGroup">
                                            <label htmlFor="valField" className="modalLabel">Valore</label>
                                            <input id="valField" type="input" required name="val" placeholder="Dai un valore al prodotto" className="modalFormField modalValInput" onChange={newProdValHandler} />
                                        </div>
                                        <div className="modalFormGroup ">
                                            <label htmlFor="locField" className="modalLabel">Località</label>
                                            <input id="locField" type="input" required name="loc" placeholder="Dove si trova il prodotto" className="modalFormField modalLocInput" onChange={newProdLocHandler}/>
                                        </div>
                                        <div className="modalFormGroup">
                                            <label htmlFor="categoryField" className="modalLabel">Categoria</label>
                                            <select id="categoryField" placeholder="Scegli la categoria" name="category" className="modalFormField modalCategoryInput" onChange={newProdCatHandler}>
                                                <option value="" selected disabled hidden >Scegli una categoria</option>
                                                {category.map((item, index) => (
                                                    <option key={index} value={item}>{item}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="modalFormGroup">
                                            <label htmlFor="statusField" className="modalLabel">Stato</label>
                                            <select id="statusField" placeholder="Scegli lo stato" name="status" className="modalFormField modalStatusInput" onChange={newProdStatHandler}>
                                                <option  value="" selected disabled hidden>Scegli lo stato</option>
                                                {status.map((item, index) => (
                                                    <option key={index} value={item}>{item}</option>
                                                ))}
                                            </select>
                                        </div>

                                    </div>
                                    <div className="newProductModalRightContent">
                                        <div className="newProductModalImgSelector">
                                            <div id= "imgPreview" className="imgPreview">
                                                <img className="imgPreviewImg" src={"img/NoImg.png"} alt=""/>

                                            </div>
                                            <div className="imgSelectBtt">
                                                <label className="custom-file-upload">
                                                    <input id="imgField" name="image" accept=".jpg, .jpeg, .png" type="file" className="imgBtt" onChange={newProdImgHandler}/>
                                                    <FileUploadOutlinedIcon />
                                                    Carica un'immagine
                                                </label>
                                            </div>
                                        </div>
                                        <div className="newProductModalSubmitContainer">
                                            <div className="newProductModalSubmit">
                                                <BubblyButton name={"Aggiungi"} onClick={newProdSubmitHandler} />
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>

                    </Box>
                </Modal>

            </div>
            <div id="myPTitle" className="myProductTitle">
                La tua vetrina
            </div>
            <div id="myProductEmpty" className="myProductEmpty hidden">
                <div className="emptyPageTitle">Inizia subito, metti il tuo primo prodotto in vetrina!</div>
                <img  className="emptyPageImg" src={"img/EmptyPage.png"} alt=""/>
            </div>
            <div id="myProduct" className="myProduct">
                {
                    myProd.map((p, index) => (
                        <div key={index} className="myProductC">
                            <MyProductCard name={p.name} desc={p.description} val={p.value} loc={p.location} cat={p.category} stat={p.status} busy={p.busy} id={p._id} num={props.num} setNum={props.setNum}  />
                        </div>
                    ))
                }
                <div id="myTTitle" className="myTransactionTitle">
                    Transazioni pendenti
                </div>
                <div id="myTransaction" className="myTransaction">
                    {
                        myTransactions.map((t, index) => (
                            count++,
                                <div key={index} className="myTransactionC">
                                    <MyTransactionCard transaction={t} count={count} num={props.num} setNum={props.setNum}/>
                                </div>
                        ))
                    }

                </div>
                <Footer />
            </div>

        </div>
    )

}