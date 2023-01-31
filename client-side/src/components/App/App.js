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

    const [transactions, setTransactions] = useState([]);

    useEffect(() =>{
        if(token === null){
            return;
        }
        getUserProducts(setProduct, token);
        getUserTransactions(setTransactions, token);
    }, [num]);

    useEffect(() =>{
        if(token === null){
            return;
        }
        axios.get('http://localhost:4000/api/user/getuseridname/'+token)
            .then(res => {
                setNum(num+1);
                setUserId(res.data._id);
                setUserName(res.data.name);
                socket.emit('newUser', res.data._id);
            })
            .catch(err => console.log(err))
    }, [token]);

    useEffect(() =>{
        socket.on('getNotification', (data) => {
            toast.info(data.senderName+" ha fatto un offerta per "+data.productNameDest, {
                position: "bottom-left",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
        return () => {
            socket.off('getNotification');
        }
    }, []);


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
                    <Route path="/home" element={<HomePage userId={userId} product={product} num={num} setNum={setNum} transactions={transactions} socket={socket} userName={userName} />}>
                    </Route>
                    <Route path="/search" element={<SearchPage userId={userId} product={product} num={num} setNum={setNum} transactions={transactions} socket={socket} userName={userName} />}>
                    </Route>
                    <Route path="/marketplace" element={<MarketplacePage userId={userId} product={product} num={num} setNum={setNum} transactions={transactions} socket={socket} userName={userName} />}>
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
