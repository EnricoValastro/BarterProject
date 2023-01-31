import React, {useEffect, useState} from "react";
import axios from "axios";

import './MyTransactionCard.css'
import arrayBufferToBase64 from "../../Utility/Utils";

export default function  MyTransactionCard(props){

    const [transaction, setTransaction] = useState([]);
    const [myProductName, setMyProductName] = useState();
    const [myProductImg, setMyProductImg] = useState([]);

    const [yourProductName, setYourProductName] = useState();
    const [yourProductImg, setYourProductImg] = useState([]);

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



    return(
        <div className="myTransactionCardContainer">
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
        </div>
    )
}