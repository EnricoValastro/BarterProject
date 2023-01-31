import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import axios from "axios";

import arrayBufferToBase64 from "../../Utility/Utils";
import BubblyButton from "../BubblyButton/BubblyButton";
import useToken from "../App/useToken";

import 'react-toastify/dist/ReactToastify.css';
import './CarouselProductCard.css';

export default function CarouselProductCard(props) {

    /* User's id and name */
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState();

    /* This user's product list */
    const [product, setProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState();

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
        setUserName(props.userName);
    }, [props.product]);

    /* Retrieves image from database */
    useEffect(() => {
        axios.get("http://localhost:4000/api/product/getimgbyid/"+props.id)
            .then(response => {
                let imgTag = document.createElement("img");
                imgTag.src = "data:"+response.data[0].image.contentType+";base64," + arrayBufferToBase64(response.data[0].image.data.data);
                imgTag.classList.add("carousel-product-image");
                let im = document.getElementById(props.count);
                im.innerHTML = "";
                im.appendChild(imgTag);
            })
            .catch(error => {
                console.log(error);
            })
    }, [props.count, props.id]);

    /* Retrieves user's transactions */
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

    /* Send notification to product owner */
    function tradeIt(){
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
        }
        else{
            if(selectedProduct === undefined){
                toast.error('Per fare un\' offerta devi selezionare un prodotto! 😅' , {
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
                })
                    .then(response => {
                        props.setNum(props.num+1);
                    }).catch(error => {
                        console.log(error);
                    });
                props.socket.emit('sendNotification', {
                    senderId: userId,
                    receiverId: pr.user,
                    senderName: userName,
                    receiverProductName: pr.name,
                    senderProductId: selectedProduct,
                    receiverProductId: pr.id
                });
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

    return (
       <div id="CarouselProductCard">

           <div className="leftContent">
               <div id={props.count} className="carouselBottomContentImg"></div>
           </div>
           <div className="rightContent">
               <div className="ctitle">
                   <div className="carouselRightContentTitle">
                       {pr.name}
                   </div>
                   <div className="carouselRightContentCategory">
                       {pr.category}
                   </div>
               </div>
               <div className="ccontent">
                   <div className="carouselBottomContentLocationTime">
                       {pr.location} - {pr.date}
                   </div>
                   <div className="carouselBottomContentDescription">
                       {pr.description}
                   </div>
                   <div className="carouselBottomContentValueState">
                       Valore commerciale: {pr.value} €
                       <br/>
                       Stato: {pr.status}
                   </div>
               </div>
               <div className="cbtt">
                   <select className="carouselCardOfferSelect" name="productSelect" id="productSelect" onChange={handleSelectedProduct}>
                       <option value="" selected disabled hidden>Seleziona un prodotto</option>
                       {product.map((p, index) => (
                           <option key={"carouselSel"+index} value={p._id} disabled={p.busy}>{p.name}</option>
                       ))}
                   </select>
                   <div className="carouselCardOfferBtt">
                       <BubblyButton name={"Trade it!"} onClick={tradeIt} />
                   </div>

               </div>
           </div>

       </div>
    );
}