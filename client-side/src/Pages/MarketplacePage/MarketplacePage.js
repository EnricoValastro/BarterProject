import React from "react";

import useToken from '../../components/App/useToken';
import Market from "../../components/Market/Market";

export default function MarketplacePage() {

    const {token, setToken} = useToken();

    if (!token) {
        window.location.href = '/signin';
    }

    return(
        <Market />
    )
}