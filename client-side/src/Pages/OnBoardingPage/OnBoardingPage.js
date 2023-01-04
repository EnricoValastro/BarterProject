import React from 'react';

import useToken from '../../components/App/useToken';
import OnBoarding from "../../components/OnBoarding/OnBoarding";

export default function OnBoardingPage() {
    const {token, setToken} = useToken();

    if (!token) {
        window.location.href = '/signin';
    }

    return (
        <div>
            <OnBoarding />
        </div>
    )
}