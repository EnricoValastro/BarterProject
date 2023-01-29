import React from "react";

import useToken from '../../components/App/useToken';
import Market from "../../components/Market/Market";

export default function MarketplacePage(props) {

    const {token, setToken} = useToken();

    if (!token) {
        window.location.href = '/signin';
    }

    return(
        <Market userId={props.userId} product={props.product} num={props.num} setNum={props.setNum} transactions={props.transactions} />
    )
}