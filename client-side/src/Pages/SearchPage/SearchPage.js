import React from 'react';
import Search from "../../components/Search/Search";
import useToken from "../../components/App/useToken";

export default function SearchPage() {
    const {token, setToken} = useToken();

    if (!token) {
        window.location.href = '/signin';
    }

    return (
        <div>
        <Search />
        </div>
    );
}