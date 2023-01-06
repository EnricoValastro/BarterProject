import React from "react";

import useToken from '../../components/App/useToken';
import Marketplace from "../../components/Marketplace/Marketplace";

export default function MarketplacePage() {

    const {token, setToken} = useToken();

    if (!token) {
        window.location.href = '/signin';
    }

    return(

        <Marketplace />

    )
}