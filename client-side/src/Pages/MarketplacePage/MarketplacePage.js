import React from "react";

import useToken from '../../components/App/useToken';
import Marketplace from "../../components/Marketplace/Marketplace";
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