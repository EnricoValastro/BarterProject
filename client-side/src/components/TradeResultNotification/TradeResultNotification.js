import React, {useEffect} from "react";
import {toast} from "react-toastify";
import axios from "axios";

export default function TradeResultNotification(props){

    useEffect(() => {
        if(props.trade.result){
            document.getElementById("accept"+props.trade._id).classList.remove("hidden");
            document.getElementById("decline"+props.trade._id).classList.add("hidden");
        }else{
            document.getElementById("decline"+props.trade._id).classList.remove("hidden");
            document.getElementById("accept"+props.trade._id).classList.add("hidden");
        }
    }, [props.trade]);

    const markRead = () =>{
        if(props.trade.result){
            toast("Contatta "+ props.trade.senderEmail+" per concludere lo scambio.", {
                position: "bottom-left",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            toast.info("Abbiamo provveduto a rimuovere il tuo prodotto dalla vetrina.", {
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

        axios.delete('http://localhost:4000/api/tradeResult/deleteTradeResult/'+props.trade._id)
            .then(res => {
                props.setNum2(props.num2+1);
            })
            .catch(err => {

            });
    }


    return(
        <div className="notificationDetails" onClick={markRead}>
            <div id={"accept"+props.trade._id} className="notificationMessage">
                {"La tua offerta per "+props.trade.productName+" è stata accettata."}
            </div>
            <div id={"decline"+props.trade._id} className="notificationMessage">
                {"La tua offerta per "+props.trade.productName+" è stata rifiutata."}
            </div>
            <div id={"notificationUnreadBadge"+props.trade._id} className="notificationUnreadBadge hidden">
                <div className="pendingIcon"></div>
            </div>
        </div>
    )
}