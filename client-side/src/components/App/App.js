import './App.css';

import React from 'react';
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
function App() {

    const { token, setToken } = useToken();

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
                    <Route path="/home" element={<HomePage />}>
                    </Route>
                    <Route path="/search" element={<SearchPage />}>
                    </Route>
                    <Route path="/profile" element={<ProfilePage />}>
                    </Route>
                    <Route path="/marketplace" element={<MarketplacePage />}>
                    </Route>
                    <Route path="*" element={<NotFound />}>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>

    );
}
export default App;
