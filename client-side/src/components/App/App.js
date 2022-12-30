import './App.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import useToken from './useToken';
import Home     from '../Home/Home';
import Root     from '../Root/Root';
import SignIn   from '../SignIn/SignIn';
import SignUp   from '../SignUp/SignUp';


function App() {

    const { token, setToken } = useToken();
    console.log(token);

    return (
        <div className="wrapper">

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Root />}>
                    </Route>
                    <Route path="/signup" element={<SignUp />}>
                    </Route>
                    <Route path="/signin" element={<SignIn setToken={setToken} />}>
                    </Route>
                    <Route path="/home" element={<Home />}>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>

    );
}
export default App;
