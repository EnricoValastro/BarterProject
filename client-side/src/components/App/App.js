import './App.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import useToken from './useToken';
import Home     from '../Home/Home';
import OnBoarding     from '../OnBoarding/OnBoarding';
import SignIn   from '../SignIn/SignIn';
import SignUp   from '../SignUp/SignUp';
import Search from "../Search/Search";
import Marketplace from "../Marketplace/Marketplace";
import Profile from "../Profile/Profile";
import NotFound from "../../Pages/NotFoundPage/NotFound";

function App() {

    const { token, setToken } = useToken();

    return (
        <div className="wrapper">

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<OnBoarding />}>
                    </Route>
                    <Route path="/signup" element={<SignUp />}>
                    </Route>
                    <Route path="/signin" element={<SignIn setToken={setToken} />}>
                    </Route>
                    <Route path="/home" element={<Home />}>
                    </Route>
                    <Route path="/search" element={<Search />}>
                    </Route>
                    <Route path="/profile" element={<Profile />}>
                    </Route>
                    <Route path="/marketplace" element={<Marketplace />}>
                    </Route>
                    <Route path="*" element={<NotFound />}>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>

    );
}
export default App;
