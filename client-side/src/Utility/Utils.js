import axios from "axios";

export default function arrayBufferToBase64( buffer ) {
    let binary = '';
    let bytes = new Uint8Array( buffer );
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

export  function getUserProducts (setProduct, token){
    if(token !== null){
        axios.get("http://localhost:4000/api/product/getuserproductbytoken/"+token)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export function getUserTransactions(setTransactions, token){
    if(token !== null){
        axios.get("http://localhost:4000/api/transactions/getpendingtransactions/"+token)
            .then(response => {
                setTransactions(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
}