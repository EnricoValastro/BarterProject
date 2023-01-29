import './App.css';

import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import useToken from './useToken';
import NotFound from "../../Pages/NotFoundPage/NotFound";
import HomePage from "../../Pages/HomePage/HomePage";
import SearchPage from "../../Pages/SearchPage/SearchPage";
import OnBoardingPage from "../../Pages/OnBoardingPage/OnBoardingPage";
import ProfilePage from "../../Pages/ProfilePage/ProfilePage";
import MarketplacePage from "../../Pages/MarketplacePage/MarketplacePage";
import SignupPage from "../../Pages/SignupPage/SignupPage";
import SigninPage from "../../Pages/SigninPage/SigninPage";
import {ToastContainer} from "react-toastify";
import axios from "axios";
import {getUserProducts, getUserTransactions} from "../../Utility/Utils";
function App() {

    /* User's id & Token */
    const { token, setToken } = useToken();
    const [userId, setUserId] = useState();

    /* User's product list & triggers var */
    const [num, setNum] = useState(0);
    const [product, setProduct] = useState([]);

    const [transactions, setTransactions] = useState([]);

    useEffect(() =>{
        console.log("ok");
        getUserProducts(setProduct, token);
    }, [num]);

    useEffect(() =>{
        console.log("ok1");
        getUserTransactions(setTransactions, userId);
    }, [num, userId]);

    useEffect(() =>{
        axios.get('http://localhost:4000/api/user/getuserid/'+token)
            .then(res => {
                setUserId(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <div className="wrapper">

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<OnBoardingPage />}>
                    </Route>
                    <Route path="/signup" element={<SignupPage />}>
                    </Route>
                    <Route path="/signin" element={<SigninPage setToken={setToken} />}>
                    </Route>
                    <Route path="/home" element={<HomePage userId={userId} product={product} num={num} setNum={setNum} transactions={transactions} />}>
                    </Route>
                    <Route path="/search" element={<SearchPage userId={userId} product={product} num={num} setNum={setNum} transactions={transactions} />}>
                    </Route>
                    <Route path="/profile" element={<ProfilePage />}>
                    </Route>
                    <Route path="/marketplace" element={<MarketplacePage userId={userId} product={product} num={num} setNum={setNum} transactions={transactions} />}>
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
