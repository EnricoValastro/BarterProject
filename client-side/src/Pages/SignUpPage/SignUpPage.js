import React from 'react';

import useToken from '../../components/App/useToken';
import Signup from "../../components/SignUp/SignUp";

export default function SignUpPage() {
    const {token, setToken} = useToken();

    if (!token) {
        window.location.href = '/signin';
    }

    return (
        <div>
            <Signup />
        </div>
    )
}