import React from 'react';
import Search from "../../components/Search/Search";
import useToken from "../../components/App/useToken";

export default function SearchPage(props) {
    const {token, setToken} = useToken();

    if (!token) {
        window.location.href = '/signin';
    }

    return (
        <Search userId={props.userId} product={props.product} num={props.num} setNum={props.setNum} transactions={props.transactions} socket={props.socket} userName={props.userName} notifications={props.notifications} unreadNotifications={props.unreadNotifications} num2={props.num2} setNum2={props.setNum2} />
    );
}