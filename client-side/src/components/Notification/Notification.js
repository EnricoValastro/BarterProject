import React, {useEffect, useState} from 'react';
import axios from "axios";

import './Notification.css';


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

    useEffect(() =>{
        setNotify({
            id: props.notification.id,
            senderId: props.notification.senderId,
            receiverId: props.notification.receiverId,
            senderName: props.notification.senderName,
            receiverProductName: props.notification.receiverProductName,
            senderProductId: props.notification.senderProductId,
            receiverProductId: props.notification.receiverProductId,
            read: props.notification.read
        });
    },[props.notification])

    const markRead = () => {
        if(!notify.read){
            axios.put('http://localhost:4000/api/notify/update/'+props.notification._id, {
                read: true
            }).then(res => {
                setNotify(previousState => {
                    return {...previousState, read: true }
                });
                props.setNum2(props.num2 + 1);
            })
        }
    }

    return(
        <>
            <div className="back" onClick={markRead}>
                {props.notification.senderName+ " ha fatto un'offerta per " + props.notification.receiverProductName}
            </div>
        </>
    )



}

