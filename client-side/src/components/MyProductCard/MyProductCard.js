import React, {useEffect, useState} from "react";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import './MyProductCard.css';
import axios from "axios";
import {Box, Modal} from "@mui/material";
import BubblyButton from "../BubblyButton/BubblyButton";
import {toast} from "react-toastify";
import useToken from "../App/useToken";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import {Description} from "@mui/icons-material";

export default function MyProductCard(props) {
    const { token, setToken } = useToken();

    const [flag, setFlag] = useState(false);
    const category2 = ["Informatica", "Smartphone", "Console-Game", "Arredamento", "Elettrodomestici", "Arte", "Antiquariato", "Fotografia", "Sport", "Libri", "Musica", "Pelletteria", "Abbigliamento", "Gioielleria", "Orologi"];
    const status2 = ["Nuovo", "Ottimo", "Buono", "Discreto", "Pessimo"];

    const [editProductOpen, setEditProductOpen] = useState(false);
    const [deleteProductOpen, setDeleteProductOpen] = useState(false);

    const [id, setId] = useState();
    const [name, setName] = useState();
    const [value, setValue] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [status, setStatus] = useState();
    const [location, setLocation] = useState();
    const [date, setDate] = useState();
    const [user, setUser] = useState();
    const [img, setImg] = useState([]);
    const [editImg, setEditImg] = useState("");

    useEffect(() => {
        setId(props.id);
        setName(props.name);
        setValue(props.value);
        setDescription(props.description);
        setCategory(props.category);
        setStatus(props.status);
        setLocation(props.location);
        setDate(props.date);
        setUser(props.user);
    }, [props.id, props.name, props.value, props.description, props.category, props.status, props.location, props.date, props.user]);

    useEffect(() => {
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

    const handleDelProductOpen = () => {
        setDeleteProductOpen(true);
    };
    const handleDelProductClose = () => {
        setDeleteProductOpen(false);
    };

    const handleEditProductOpen = () => {
        setEditProductOpen(true);
    };
    const handleEditProductClose = () => {
        setEditProductOpen(false);
    };

    const deleteProduct = () => {
        axios.delete("http://localhost:4000/api/product/market/deleteproduct/"+id+"/"+token)
            .then(response => {
                handleDelProductClose();
                toast.success('Prodotto eliminato correttamente. 👍🏼', {
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

    const editNameProductHandler =  () => {
        setName(document.getElementById("editNameField").value);
    }

    const editDescProductHandler = () =>{
        setDescription(document.getElementById("editDescField").value);
    }

    const editValueProductHandler = () =>{
        setValue(document.getElementById("editValueField").value);
    }

    const editCategoryProductHandler = () =>{
        setCategory(document.getElementById("editCategoryField").value);
    }

    const editStatusProductHandler = () =>{
        setStatus(document.getElementById("editStatusField").value);
    }

    const editLocationProductHandler = () =>{
        setLocation(document.getElementById("editLocationField").value);
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
            console.log(curFiles[0]);
            const image = document.createElement('img');
            image.src = URL.createObjectURL(curFiles[0]);
            image.classList.add("imgPreviewImg");
            preview.appendChild(image);
            setEditImg(curFiles[0]);
            console.log(editImg);
        }
    }

    const editProduct = () => {
        if(flag){
            const formD = new FormData();
            formD.append("image", editImg);
            axios.post("http://localhost:4000/api/product/update", formD )
                .then(response => {
                    console.log(editImg.name);
                    let ima = {
                        filename: editImg.name,
                        type: editImg.type
                    }
                    axios.put("http://localhost:4000/api/product/market/editproductwithimg/"+props.id, {
                        name: name,
                        description: description,
                        category: category,
                        status: status,
                        value: value,
                        location: location,
                        image: ima
                    })
                        .then(response => {
                            handleEditProductClose();
                            toast.success('Prodotto modificato correttamente.', {
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
                })
                .catch(error => {
                    console.log(error);
                })
        }
/*
        axios.put("http://localhost:4000/api/product/market/editproduct/"+props.id, {
            name: name,
            description: description,
            category: category,
            status: status,
            value: value,
            location: location
        })
            .then(response => {
                handleEditProductClose();
                toast.success('Prodotto modificato correttamente.', {
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
*/
    }

  return (

      <>
          <div className="myProductCardContainer">
              <div className="myProductCardContainerLeft">
                  <div className="myProductCard">

                      <div id={props.id} className="myProductCardImg">

                      </div>
                      <div className="myProductCardName">
                          {name}
                      </div>

                  </div>

              </div>
              <div className="myProductCardContainerRight">
                  <div className="sideBar">
                      <div className="myProductIconCont">
                          <EditIcon className="myProductIcon" onClick={handleEditProductOpen} />
                      </div>
                      <div className="myProductIconCont" onClick={handleDelProductOpen}>
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
                                      <input id="editNameField" type="input" required name="nome" placeholder="Inserisci il nome del prodotto"  className="modalFormField modalNameInput" onChange={editNameProductHandler} />
                                  </div>
                                  <div className="modalFormGroup">
                                      <label htmlFor="descField" className="modalLabel">Descrizione</label>
                                      <textarea id="editDescField"  required placeholder="Descrivi brevemente il prodotto" name="desc" rows={3} className="modalFormField modalDescInput" onChange={editDescProductHandler} />
                                  </div>
                                  <div className="modalFormGroup">
                                      <label htmlFor="valField" className="modalLabel">Valore</label>
                                      <input id="editValueField" type="input" required name="val" placeholder="Dai un valore al prodotto" className="modalFormField modalValInput" onChange={editValueProductHandler} />
                                  </div>
                                  <div className="modalFormGroup ">
                                      <label htmlFor="locField" className="modalLabel">Località</label>
                                      <input id="editLocationField" type="input" required name="loc" placeholder="Dove si trova il prodotto" className="modalFormField modalLocInput" onChange={editLocationProductHandler} />
                                  </div>
                                  <div className="modalFormGroup">
                                      <label htmlFor="categoryField" className="modalLabel">Categoria</label>
                                      <select id="editCategoryField" placeholder="Scegli la categoria" name="category" className="modalFormField modalCategoryInput" onChange={editCategoryProductHandler}>
                                          <option value="" selected disabled hidden >Scegli una categoria</option>
                                          {category2.map((item, index) => (
                                              <option key={index} value={item}>{item}</option>
                                          ))}
                                      </select>
                                  </div>
                                  <div className="modalFormGroup">
                                      <label htmlFor="statusField" className="modalLabel">Stato</label>
                                      <select id="editStatusField" placeholder="Scegli lo stato" name="status" className="modalFormField modalStatusInput" onChange={editStatusProductHandler} >
                                          <option  value="" selected disabled hidden>Scegli lo stato</option>
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