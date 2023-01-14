import {React, useState} from "react";
import useToken from "../App/useToken";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import './Marketplace.css';
export default function Marketplace() {
    const { token, setToken } = useToken();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [value, setValue] = useState("");
    const [location, setLocation] = useState("");

    let userID;

    fetch("http://localhost:4000/api/user/"+ token).then(res => res.json()).then(data => {
        userID = data._id;
    }).catch(err => console.log(err));

    fetch("http://localhost:4000/api/product/getbycategory/informatica").then(res => res.json()).then(data=>{
        console.log(data)
    }).catch(err => console.log(err));

    if(!token){
        window.location.href = '/signin';
    }

    function handleName(e){
        setName(e.target.value)
    }

    function handleDescription(e){
        setDescription(e.target.value)
    }

    function handleImage(e){
        setImage(e.target.files[0])
    }

    function handleCategory(e){
        setCategory(e.target.value)
    }

    function handleStatus(e){
        setStatus(e.target.value)
    }

    function handleValue(e){
        setValue(e.target.value)
    }

    function handleLocation(e){
        setLocation(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('category', category);
        formData.append('status', status);
        formData.append('value', value);
        formData.append('location', location);
        formData.append('userID', userID);
        axios.post('http://localhost:4000/api/product/upload', formData)
            .then(res => {
                console.log(res);
            }).catch(err => {
            console.log(err);
        })
    }
    /*Function For Retrieve images from mongodb*/
    /*function arrayBufferToBase64( buffer ) {
        let binary = '';
        let bytes = new Uint8Array( buffer );
        let len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }

    function handleProductSearch(e){
        e.preventDefault();
        let img = document.getElementById("images");
        let x = document.getElementById("search").value;
        console.log(x)
        fetch("http://localhost:4000/search/"+ x).then(res => res.json()).then(data => {
            console.log(data);
            img.innerHTML = "";
            for(let i = 0; i < data.length; i++){
                let imgTag = document.createElement("img");
                imgTag.src = "data:image/png;base64," + arrayBufferToBase64(data[i].img.data.data);
                imgTag.style.width = "400px";
                imgTag.style.height = "400px";
                img.appendChild(imgTag);
            }
        }).catch(err => console.log(err));
    }*/

    return(
        <div id="marketplace">
            <Navbar pagename={"Marketplace"} />

                            <input type="input" name="name"onChange={handleName}/>
                            <input type="input" name="description"onChange={handleDescription}/>
                            <input type="file" name="image" onChange={handleImage}/>

                            <select name="category" onChange={handleCategory}>
                                <option value="" selected disabled hidden>Choose here</option>
                                <option value="informatica">Informatica</option>
                                <option value="smarthpone">Smartphone</option>
                                <option value="console&game">Console&Game</option>
                                <option value="arredamento">Arredamento</option>
                                <option value="elettrodomestici">Elettrodomestici</option>
                                <option value="arte">Arte</option>
                                <option value="antiquariato">Antiquariato</option>
                                <option value="fotografia">Fotografia</option>
                                <option value="sport">Sport</option>
                                <option value="libri">Fotografia</option>
                                <option value="musica">Musica</option>
                                <option value="pelletteria"> Pelletteria</option>
                                <option value="abbigliamento"> Abbigliamento</option>
                                <option value="gioielleria"> Gioielleria</option>
                                <option value="orologi"> Orologi</option>
                            </select>

                            <select name="status" onChange={handleStatus}>
                                <option value="" selected disabled hidden>Choose here</option>
                                <option value="nuovo">Nuovo</option>
                                <option value="ottimo">Ottimo</option>
                                <option value="buono">Buono</option>
                                <option value="discreto">Discreto</option>
                                <option value="pessimo">Pessimo</option>
                            </select>

                            <input name="value" type="input" onChange={handleValue}/>
                            <input name="location" type="input" onChange={handleLocation}/>


                            <button id="submit" onClick={handleSubmit}>Submit</button>



        </div>

    );
}