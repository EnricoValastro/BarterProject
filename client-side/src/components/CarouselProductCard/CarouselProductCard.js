import React, {useEffect, useState} from 'react';

import './CarouselProductCard.css';
import BubblyButton from "../BubblyButton/BubblyButton";
import useToken from "../App/useToken";
import axios from "axios";

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
        setDate(props.date);
        setUser(props.user);
    }, [props.id, props.name, props.value, props.desc, props.category, props.status, props.location, props.date, props.user]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/product/search/imgbyid/"+props.id)
            .then(response => {
                let imgTag = document.createElement("img");
                imgTag.src = "data:image/png;base64," + arrayBufferToBase64(response.data[0].image.data.data);
                //imgTag.classList.add("product-image");
                let im = document.getElementById(props.count);
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

    function arrayBufferToBase64( buffer ) {
        let binary = '';
        let bytes = new Uint8Array( buffer );
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }


    function someFun(){
        console.log("someFun");
    }
    
    return (
       <div id="CarouselProductCard">
            <div className="upContent">
                <div className="carouselUpContentTitle">
                    {props.name}
                </div>
                <div className="carouselUpContentCategory">
                    {props.category}
                </div>
            </div>
            <div className="bottomContent">

               <div id={props.count} className="carouselBottomContentImg">

               </div>
               <div className="carouselBottomContent">
                   <div className="carouselBottomContentLocationTime">
                       {props.location} - {props.date.split("T")[0]}
                   </div>
                   <div className="carouselBottomContentDescription">
                          {props.desc}
                   </div>
                   <div className="carouselBottomContentValueState">
                       Valore commerciale: {props.value} €
                       <br/>
                       Stato: {props.status}
                   </div>
                   <div className="carouselBottomContentOffer">
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
       </div>
    );
}