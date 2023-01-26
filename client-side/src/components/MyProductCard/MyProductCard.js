import React, {useEffect, useState} from "react";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import './MyProductCard.css';
import axios from "axios";

export default function MyProductCard(props) {

    const [id, setId] = useState();
    const [name, setName] = useState();
    const [value, setValue] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [status, setStatus] = useState();
    const [location, setLocation] = useState();
    const [date, setDate] = useState();
    const [user, setUser] = useState();
    const [img, setImg] = useState([]);


    useEffect(() => {
        setId(props.id);
        setName(props.name);
        setValue(props.value);
        setDescription(props.description);
        setCategory(props.category);
        setStatus(props.status);
        setLocation(props.location);
        setDate(props.date);
        setUser(props.user);
        setImg(props.img);
    }, [props.id, props.name, props.value, props.description, props.category, props.status, props.location, props.date, props.user, props.img]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/product/getimgbyid/"+props.id)
            .then(response => {
                setImg(response.data[0].image.data.data);
                const imgTag = document.createElement("img");
                imgTag.src = "data:image/png;base64," + arrayBufferToBase64(response.data[0].image.data.data);
                imgTag.classList.add("myProductCardImgStyle");
                const im = document.getElementById(props.id);
                im.innerHTML = "";
                im.appendChild(imgTag);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    function arrayBufferToBase64( buffer ) {
        let binary = '';
        let bytes = new Uint8Array( buffer );
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }

  return (

      <>
          <div className="myProductCardContainer">
              <div className="myProductCardContainerLeft">
                  <div className="myProductCard">

                      <div id={props.id} className="myProductCardImg">

                      </div>
                      <div className="myProductCardName">
                          {name}
                      </div>

                  </div>

              </div>
              <div className="myProductCardContainerRight">
                  <div className="sideBar">
                      <div className="myProductIconCont">
                          <EditIcon className="myProductIcon" />
                      </div>
                      <div className="myProductIconCont">
                          <DeleteIcon className="myProductIcon" />
                      </div>
                  </div>

              </div>
          </div>
      </>


  );
}