import React from 'react';

import useToken from '../../components/App/useToken';
import Home from "../../components/Home/Home";

export default function HomePage(props) {
    const {token, setToken} = useToken();

    if (!token) {
        window.location.href = '/signin';
    }

    return (
            <Home userId={props.userId} product={props.product} num={props.num} setNum={props.setNum} transactions={props.transactions} socket={props.socket} userName={props.userName} notifications={props.notifications} unreadNotifications={props.unreadNotifications} num2={props.num2} setNum2={props.setNum2} userEmail={props.email} />
    )
}


