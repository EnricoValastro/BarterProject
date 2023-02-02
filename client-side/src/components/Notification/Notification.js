import React, {useEffect, useState} from 'react';
import axios from "axios";

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {Box, Modal} from "@mui/material";

import './Notification.css';
import arrayBufferToBase64 from "../../Utility/Utils";

export default function Notification(props) {

    const [notify, setNotify] = useState({
        id: '',
        senderId: '',
        receiverId: '',
        senderName: '',
        receiverProductName: '',
        senderProductId: '',
        receiverProductId: '',
        read: false,
    });

    const [pr, setPr] = useState({
        name: '',
        description: '',
        category: '',
        date: '',
        status: '',
        value: '',
        location: '',
        userId: '',
        image: [],
    });

    const [notificationDetailsOpen, setNotificationDetailsOpen] = useState(false);

    /* Fetch sender product details */
    useEffect(() =>{
        axios.get('http://localhost:4000/api/product/market/getproductbyid/'+props.notification.senderProductId)
            .then(res => {
                setPr({
                    name: res.data[0].name,
                    description: res.data[0].description,
                    category: res.data[0].category,
                    date: res.data[0].date.split("T")[0],
                    status: res.data[0].status,
                    value: res.data[0].value,
                    location: res.data[0].location,
                    userId: res.data[0].userId,
                    image: res.data[0].image.data.data,
                })
            })
            .catch(err => {
                console.log(err);
            });
    },[props.notification]);

    /* Set notifications details from props */
    useEffect(() =>{
        setNotify({
            id: props.notification._id,
            senderId: props.notification.senderId,
            receiverId: props.notification.receiverId,
            senderName: props.notification.senderName,
            receiverProductName: props.notification.receiverProductName,
            senderProductId: props.notification.senderProductId,
            receiverProductId: props.notification.receiverProductId,
            read: props.notification.read
        });
    },[props.notification])

    /* Show and hide unread notification badge */
    useEffect(() =>{
        if(props.notification.read){
            document.getElementById("notificationUnreadBadge"+props.notification._id).classList.add("hidden");
        }
        else{
            document.getElementById("notificationUnreadBadge"+props.notification._id).classList.remove("hidden");
        }
    },[props.notification]);

    /* Details modal controller */
    const handleNotificationDetailsOpen = () => {
        setNotificationDetailsOpen(true);
    };

    /* Add img to modal */
    const afterNotificationModalOpen = () => {
        const modalImg = document.createElement("img");
        const modIm = document.getElementById("modalNotificationImg"+props.notification._id);
        modalImg.src = "data:image/png;base64," + arrayBufferToBase64(pr.image);
        modalImg.classList.add("modalNotificationImg");
        modIm.innerHTML = "";
        modIm.appendChild(modalImg);
    }

    const handleNotificationDetailsClose = () => {
        setNotificationDetailsOpen(false);
    };

    /* Mark notification as read and open modal */
    const markRead = () => {
        if(!notify.read){
            axios.put('http://localhost:4000/api/notify/update/'+props.notification._id, {
                read: true
            }).then(res => {
                props.setNum2(props.num2 + 1);
            })
        }
        handleNotificationDetailsOpen();
    }

    const declineOffer = () => {
        axios.delete('http://localhost:4000/api/notify/deletenotify/'+props.notification.senderProductId+"/"+props.notification.receiverProductId)
            .then(res => {
                axios.delete('http://localhost:4000/api/transactions/removependingtransaction/'+props.notification.senderProductId)
                    .then(res => {
                        axios.put("http://localhost:4000/api/product/unsetbusy/"+props.notification.senderProductId, {
                            busy: false
                        }).then(res => {
                                handleNotificationDetailsClose();
                                props.setNum2(props.num2 + 1);
                            }).catch(err => {
                                console.log(err);
                            });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
        props.socket.emit('resOffer', {
            receiverId: props.notification.senderId,
            result: false,
            productName: props.notification.receiverProductName,
            senderEmail: props.userEmail
        });
    }
    const acceptOffer = () =>{
        axios.delete('http://localhost:4000/api/keepconsistency/'+props.notification.senderId+"/"+props.notification.receiverId+"/"+props.notification.senderProductId+"/"+props.notification.receiverProductId)
            .then(res=>{
                handleNotificationDetailsClose();
                props.setNum2(props.num2 + 1);
            })
            .catch(err => {
                console.log(err);
            });

        props.socket.emit('resOffer', {
            receiverId: props.notification.senderId,
            result: true,
            productName: props.notification.receiverProductName,
            senderEmail: props.userEmail
        });
    }

    return(
        <>
            <div className="notificationDetails" onClick={markRead}>
                <div className="notificationMessage">
                    {props.notification.senderName+ " ha fatto un'offerta per " + props.notification.receiverProductName}
                </div>
                <div id={"notificationUnreadBadge"+props.notification._id} className="notificationUnreadBadge hidden">
                    <div className="pendingIcon"></div>
                </div>
            </div>

            <Modal
                open={notificationDetailsOpen}
                onFocus={afterNotificationModalOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <div className="modalNotificationDetailsContainer">
                        <div className="modalNotificationDetails">
                            <div className="modalNotificationCancel">
                                <CloseRoundedIcon className="modalNotificationCancelIcon" onClick={handleNotificationDetailsClose}/>
                            </div>
                            <div className="modalNotificationContent">
                                <div id={"modalNotificationImg"+props.notification._id} className="modalNotificationContentLeft"></div>
                                <div className="modalNotificationContentRight">
                                    <div className="modalNotificationPName">{pr.name}</div>
                                    <div className="modalNotificationPCategory">{pr.category}</div>
                                    <div className="modalNotificationPDetails">
                                        <div className="modalNotificationPLocDate">
                                            {pr.location} - {pr.date}
                                        </div>
                                        <div className="modalNotificationPDescription">
                                            {pr.description}
                                        </div>
                                        <div className="modalNotificationPStaVal">
                                            Valore commerciale: {pr.value} €
                                            <br/>
                                            Stato: {pr.status}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modalNotificationBtt">
                                <button className="modalNotificationBttDecline" onClick={declineOffer}>Rifiuta</button>
                                <button className="modalNotificationBttAccept" onClick={acceptOffer}>Accetta</button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )



}

