import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";

import {Box, Modal} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from "@mui/icons-material/Close";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

import './MyProductCard.css';

import BubblyButton from "../BubblyButton/BubblyButton";
import useToken from "../App/useToken";
import arrayBufferToBase64 from "../../Utility/Utils";


export default function MyProductCard(props) {
    /* User's token */
    const { token, setToken } = useToken();

    /* My product details */
    const [pr, setPr] = useState({
        id: "",
        name: "",
        value: "",
        description: "",
        category: "",
        status: "",
        location: "",
        busy: ""
    });

    const [img, setImg] = useState([]);
    const [editImg, setEditImg] = useState("");

    const [flag, setFlag] = useState(false);

    /* Catagory and status predefined list */
    const category2 = ["Informatica", "Smartphone", "Console-Game", "Arredamento", "Elettrodomestici", "Arte", "Antiquariato", "Fotografia", "Sport", "Libri", "Musica", "Pelletteria", "Abbigliamento", "Gioielleria", "Orologi"];
    const status2 = ["Nuovo", "Ottimo", "Buono", "Discreto", "Pessimo"];

    /* Edit and Delete modals control */
    const [editProductOpen, setEditProductOpen] = useState(false);
    const [deleteProductOpen, setDeleteProductOpen] = useState(false);

    const handleDelProductOpen = () => {
        if(pr.busy){
            toast.error('Attenzione! 🚨 Non puoi eliminare prodotti offerti ad altri clienti.', {
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
            setDeleteProductOpen(true);
        }
    };

    const handleDelProductClose = () => {
        setDeleteProductOpen(false);
    };

    const handleEditProductOpen = () => {
        if(pr.busy){
            toast.error('Attenzione! 🚨 Non puoi modificare prodotti offerti ad altri clienti.', {
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
            setEditProductOpen(true);
        }
    };

    const handleEditProductClose = () => {
        setEditProductOpen(false);
    };

    /* Set state from props */
    useEffect(() => {
        setPr({
            id: props.id,
            name: props.name,
            value: props.val,
            description: props.desc,
            category: props.cat,
            status: props.stat,
            location: props.loc,
            busy: props.busy
        });
    }, [props.busy, props.cat,  props.desc, props.id, props.loc, props.name, props.stat, props.val]);

    /* Retrieve image from db */
    useEffect(() => {
        getImg();
    }, []);

    /* Add border to busy products */
    useEffect(() =>{
        if(props.busy){
            const card = document.getElementById("myPCContainerLeft"+props.id)
            card.classList.add("busyProduct");
            document.getElementById("myPEdit"+props.id).classList.add("notAllowed");
            document.getElementById("myPDel"+props.id).classList.add("notAllowed");
        }
        else{
            const card = document.getElementById("myPCContainerLeft"+props.id)
            card.classList.remove("busyProduct");
            document.getElementById("myPEdit"+props.id).classList.remove("notAllowed");
            document.getElementById("myPDel"+props.id).classList.remove("notAllowed");
        }
    }, [props.busy])

    /* Retrieve image from db */
    const getImg = () => {
        axios.get("http://localhost:4000/api/product/getimgbyid/"+props.id)
            .then(response => {
                setImg(response.data[0].image.data.data);
                const imgTag = document.createElement("img");
                imgTag.src = "data:image/png;base64," + arrayBufferToBase64(response.data[0].image.data.data);
                imgTag.classList.add("myProductCardImgStyle");
                const im = document.getElementById(props.id);
                im.innerHTML = "";
                im.appendChild(imgTag);
            })
            .catch(error => {
                console.log(error);
            })
    }

    /* Update product's details after editing */
    const editNameProductHandler =  () => {
        setPr(previousState => {
            return {...previousState, name: document.getElementById("editNameField").value }
        });
    }

    const editDescProductHandler = () =>{
        setPr(previousState => {
            return {...previousState, description: document.getElementById("editDescField").value }
        });
    }

    const editValueProductHandler = () =>{
        setPr(previousState => {
            return {...previousState, value: document.getElementById("editValueField").value }
        });
    }

    const editCategoryProductHandler = () =>{
        setPr(previousState => {
            return {...previousState, category: document.getElementById("editCategoryField").value }
        });
    }

    const editStatusProductHandler = () =>{
        setPr(previousState => {
            return {...previousState, status: document.getElementById("editStatusField").value }
        });
    }

    const editLocationProductHandler = () =>{
        setPr(previousState => {
            return {...previousState, location: document.getElementById("editLocationField").value }
        });
    }

    const editImgProductHandler = (event) =>{
        setFlag(true);
        const preview = document.getElementById("editImgPreview");
        const input = document.getElementById("editImgField");
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
            setEditImg(curFiles[0]);
        }
    }


    /* Edit product */
    const editProduct = () => {
        if(flag){
            setFlag(false);
            const formD = new FormData();
            formD.append("image", editImg);
            axios.post("http://localhost:4000/api/product/update", formD )
                .then(response => {
                    let ima = {
                        filename: editImg.name,
                        type: editImg.type
                    }
                    axios.put("http://localhost:4000/api/product/market/editproductwithimg/"+props.id, {
                        name: pr.name,
                        description: pr.description,
                        category: pr.category,
                        status: pr.status,
                        value: pr.value,
                        location: pr.location,
                        image: ima
                    })
                        .then(response => {
                            handleEditProductClose();
                            toast.success('Prodotto modificato correttamente. ✏️', {
                                position: "bottom-left",
                                autoClose: 6000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                            getImg();
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })
                .catch(error => {
                    console.log(error);
                })
        }
        else{
            axios.put("http://localhost:4000/api/product/market/editproductwithoutimg/"+props.id, {
                name: pr.name,
                description: pr.description,
                category: pr.category,
                status: pr.status,
                value: pr.value,
                location: pr.location
            })
                .then(response => {
                    handleEditProductClose();
                    toast.success('Prodotto modificato correttamente. ✏️', {
                        position: "bottom-left",
                        autoClose: 6000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    /* Delete product */
    const deleteProduct = () => {
        axios.delete("http://localhost:4000/api/product/market/deleteproduct/"+pr.id+"/"+token)
            .then(response => {
                props.setNum(props.num+1);
                handleDelProductClose();
                toast.success('Prodotto eliminato correttamente. 🗑️', {
                    position: "bottom-left",
                    autoClose: 6000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

  return (
      <>
          <div className="myProductCardContainer">
              <div id={"myPCContainerLeft"+props.id} className="myProductCardContainerLeft">
                  <div className="myProductCard">
                      <div id={props.id} className="myProductCardImg">
                      </div>
                      <div className="myProductCardName">
                          {pr.name}
                      </div>
                  </div>
              </div>
              <div className="myProductCardContainerRight">
                  <div className="sideBar">
                      <div id={"myPEdit"+props.id} className="myProductIconCont">
                          <EditIcon className="myProductIcon" onClick={handleEditProductOpen} />
                      </div>
                      <div id={"myPDel"+props.id} className="myProductIconCont" onClick={handleDelProductOpen}>
                          <DeleteIcon className="myProductIcon" />
                      </div>
                  </div>
              </div>
          </div>

          <Modal
              open={deleteProductOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box>
                  <div className="deleteModalContainer">
                        <div className="deleteModal">
                            <div className="deleteModalText">
                                Sei sicuro di voler eliminare il prodotto? Questa azione è irreversibile.
                            </div>
                            <div className="deleteModalBtt">
                                <button className="deleteModalBttKo" onClick={handleDelProductClose}>Annulla</button>
                                <button className="deleteModalBttOk" onClick={deleteProduct}>Elimina</button>
                            </div>
                        </div>
                  </div>

              </Box>
          </Modal>
          <Modal
              open={editProductOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box>
                  <div className="newProductModalContainer">
                      <div className="newProductModal">
                          <div className="newProductModalIconClose">
                              <CloseIcon className="newProductModalXIcon" onClick={handleEditProductClose}></CloseIcon>
                          </div>
                          <div className="newProductModalFieldContainer">

                              <div className="newProductModalLeftContent">
                                  <div className="modalFormGroup">
                                      <label htmlFor="nameField" className="modalLabel">Nome</label>
                                      <input id="editNameField" type="input" required value={pr.name} name="nome" placeholder="Inserisci il nome del prodotto"  className="modalFormField modalNameInput" onChange={editNameProductHandler} />
                                  </div>
                                  <div className="modalFormGroup">
                                      <label htmlFor="descField" className="modalLabel">Descrizione</label>
                                      <textarea id="editDescField" value={pr.description} required placeholder="Descrivi brevemente il prodotto" name="desc" rows={3} className="modalFormField modalDescInput" onChange={editDescProductHandler} />
                                  </div>
                                  <div className="modalFormGroup">
                                      <label htmlFor="valField" className="modalLabel">Valore</label>
                                      <input id="editValueField" value={pr.value} type="input" required name="val" placeholder="Dai un valore al prodotto" className="modalFormField modalValInput" onChange={editValueProductHandler} />
                                  </div>
                                  <div className="modalFormGroup ">
                                      <label htmlFor="locField" className="modalLabel">Località</label>
                                      <input id="editLocationField" value={pr.location} type="input" required name="loc" placeholder="Dove si trova il prodotto" className="modalFormField modalLocInput" onChange={editLocationProductHandler} />
                                  </div>
                                  <div className="modalFormGroup">
                                      <label htmlFor="categoryField" className="modalLabel">Categoria</label>
                                      <select id="editCategoryField" placeholder="Scegli la categoria" name="category" className="modalFormField modalCategoryInput" onChange={editCategoryProductHandler}>
                                          <option value="" selected disabled hidden >{pr.category}</option>
                                          {category2.map((item, index) => (
                                              <option key={index} value={item}>{item}</option>
                                          ))}
                                      </select>
                                  </div>
                                  <div className="modalFormGroup">
                                      <label htmlFor="statusField" className="modalLabel">Stato</label>
                                      <select id="editStatusField" placeholder="Scegli lo stato" name="status" className="modalFormField modalStatusInput" onChange={editStatusProductHandler} >
                                          <option  value="" selected disabled hidden>{pr.status}</option>
                                          {status2.map((item, index) => (
                                              <option key={index} value={item}>{item}</option>
                                          ))}
                                      </select>
                                  </div>

                              </div>
                              <div className="newProductModalRightContent">
                                  <div className="newProductModalImgSelector">
                                      <div id= "editImgPreview" className="imgPreview">
                                          <img className="imgPreviewImg" src={"img/NoImg.png"} alt=""/>

                                      </div>
                                      <div className="imgSelectBtt">
                                          <label className="custom-file-upload">
                                              <input id="editImgField" name="image" accept=".jpg, .jpeg, .png" type="file" className="imgBtt" onChange={editImgProductHandler}/>
                                              <FileUploadOutlinedIcon />
                                              Carica un'immagine
                                          </label>
                                      </div>
                                  </div>
                                  <div className="newProductModalSubmitContainer">
                                      <div className="newProductModalSubmit">
                                          <BubblyButton name={"Modifica"} onClick={editProduct} />
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