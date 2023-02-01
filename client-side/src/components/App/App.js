import './App.css';

import React, {useEffect, useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from "axios";
import {io} from "socket.io-client";

import useToken from './useToken';
import NotFound from "../../Pages/NotFoundPage/NotFound";
import HomePage from "../../Pages/HomePage/HomePage";
import SearchPage from "../../Pages/SearchPage/SearchPage";
import OnBoardingPage from "../../Pages/OnBoardingPage/OnBoardingPage";
import MarketplacePage from "../../Pages/MarketplacePage/MarketplacePage";
import SignupPage from "../../Pages/SignupPage/SignupPage";
import SigninPage from "../../Pages/SigninPage/SigninPage";

import {getUserProducts, getUserTransactions} from "../../Utility/Utils";

const socket = io.connect('http://localhost:4000');

function App() {

    /* User's id, token and name  */
    const { token, setToken } = useToken();
    const [userId, setUserId] = useState();
    const [userName, setUserName] = useState();

    /* User's product list & triggers var */
    const [num, setNum] = useState(0);
    const [product, setProduct] = useState([]);

    /* User's transactions and notifications and triggers */
    const [transactions, setTransactions] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [unreadNotifications, setUnreadNotifications] = useState();
    const [num2, setNum2] = useState(0);

    /* Fetch user's transaction & products */
    useEffect(() =>{
        if(token === null){
            return;
        }
        getUserProducts(setProduct, token);
        getUserTransactions(setTransactions, token);
    }, [num]);

    /* Fetch user's id & name and send id to socket */
    useEffect(() =>{
        if(token === null){
            return;
        }
        axios.get('http://localhost:4000/api/user/getuseridname/'+token)
            .then(res => {
                setNum(num+1);
                setNum2(num2+1);
                setUserId(res.data._id);
                setUserName(res.data.name);
                socket.emit('newUser', res.data._id);
            })
            .catch(err => console.log(err))
    }, [token]);

    /* Receives real time notifications from socket */
    useEffect(() =>{
        socket.on('getNotification', (data) => {
            toast(data.senderName+" ha fatto un offerta per "+data.receiverProductName+" 📫", {
                position: "bottom-left",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setNum2(num2+1);
        });
        return () => {
            socket.off('getNotification');
        }
    } );

    useEffect(() =>{
        socket.on('response', (data) => {
            if(data.result){
                toast("La tua offerta per "+data.productName+" è stata accettata. 🎉", {
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
            else{
                toast("La tua offerta per "+data.productName+" è stata rifiutata. 😔", {
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
        });
        return () => {
            socket.off('response');
        }
    } );

    /* Fetch user's notifications  */
    useEffect(() =>{
        if(token === null){
            return;
        }
        axios.get('http://localhost:4000/api/notify/getnotify/'+token)
            .then(res => {
                setNotifications(res.data.sort((a, b) => (!b.read) - (!a.read)));
                setUnreadNotifications(res.data.filter((item) => !item.read).length);
            })
            .catch(err => {
                console.log(err)
            })
    }, [num2]);


    return (
        <div className="wrapper">

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<OnBoardingPage />}>
                    </Route>
                    <Route path="/signup" element={<SignupPage />}>
                    </Route>
                    <Route path="/signin" element={<SigninPage setToken={setToken} socket={socket} />}>
                    </Route>
                    <Route path="/home" element={<HomePage userId={userId} product={product} num={num} setNum={setNum} transactions={transactions} socket={socket} userName={userName} notifications={notifications} unreadNotifications={unreadNotifications} num2={num2} setNum2={setNum2} />}>
                    </Route>
                    <Route path="/search" element={<SearchPage userId={userId} product={product} num={num} setNum={setNum} transactions={transactions} socket={socket} userName={userName} notifications={notifications} unreadNotifications={unreadNotifications} num2={num2} setNum2={setNum2} />}>
                    </Route>
                    <Route path="/marketplace" element={<MarketplacePage userId={userId} product={product} num={num} setNum={setNum} transactions={transactions} socket={socket} userName={userName} notifications={notifications} unreadNotifications={unreadNotifications} num2={num2} setNum2={setNum2} />}>
                    </Route>
                    <Route path="*" element={<NotFound />}>
                    </Route>
                </Routes>
            </BrowserRouter>

            <ToastContainer />
        </div>

    );
}
export default App;
