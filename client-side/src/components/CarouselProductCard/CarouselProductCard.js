import React, {useEffect, useState} from 'react';

import './CarouselProductCard.css';
import BubblyButton from "../BubblyButton/BubblyButton";
import useToken from "../App/useToken";
import axios from "axios";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function CarouselProductCard(props) {

    const {token, setToken} = useToken();
    const [product, setProduct] = useState([]); //I prodotti dell'utente attivo

    /* Dati di ogni card */
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [value, setValue] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [status, setStatus] = useState();
    const [location, setLocation] = useState();
    const [date, setDate] = useState();
    const [user, setUser] = useState();

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
        axios.get("http://localhost:4000/api/product/getimgbyid/"+props.id)
            .then(response => {
                let imgTag = document.createElement("img");
                imgTag.src = "data:image/png;base64," + arrayBufferToBase64(response.data[0].image.data.data);
                imgTag.classList.add("carousel-product-image");
                let im = document.getElementById(props.count);
                im.innerHTML = "";
                im.appendChild(imgTag);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        axios.get("http://localhost:4000/api/product/getuserproductbytoken/"+token)
            .then(response => {
                setProduct(response.data);
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

    /* Funzione per inviare notifica di scambio prodotto ad un altro utente, necessita recuperare valore della select */
    function someFun(){
        toast.success('Trattativa avviata !', {
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

    return (
       <div id="CarouselProductCard">

           <div className="leftContent">
               <div id={props.count} className="carouselBottomContentImg"></div>
           </div>

           <div className="rightContent">
               <div className="ctitle">
                   <div className="carouselRightContentTitle">
                       {name}
                   </div>
                   <div className="carouselRightContentCategory">
                       {category}
                   </div>
               </div>
               <div className="ccontent">
                   <div className="carouselBottomContentLocationTime">
                       {location} - {date}
                   </div>
                   <div className="carouselBottomContentDescription">
                       {description}
                   </div>
                   <div className="carouselBottomContentValueState">
                       Valore commerciale: {value} €
                       <br/>
                       Stato: {status}
                   </div>
               </div>
               <div className="cbtt">
                   <select className="carouselCardOfferSelect" name="productSelect" id="productSelect">
                       <option value="" selected disabled hidden>Seleziona un prodotto</option>
                       {product.map((p) => (
                           <option value={p._id}>{p.name}</option>
                       ))}
                   </select>
                   <div className="carouselCardOfferBtt">
                       <BubblyButton name={"Trade it!"} onClick={someFun} />
                   </div>

               </div>
           </div>

       </div>
    );
}