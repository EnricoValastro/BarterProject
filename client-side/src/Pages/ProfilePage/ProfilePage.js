import React from 'react';

import useToken from '../App/useToken';
import Profile from "../../components/Profile/Profile";

export default function ProfilePage() {
    const {token, setToken} = useToken();

    if (!token) {
        window.location.href = '/signin';
    }

    return (
        <div>
            <Profile />
        </div>
    )
}