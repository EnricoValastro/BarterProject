import React from "react";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import './MyProductCard.css';

export default function MyProductCard() {
  return (

      <>
          <div className="myProductCardContainer">
              <div className="myProductCardContainerLeft">
                  <div className="myProductCard">

                      <div className="myProductCardImg">
                          <img src={"img/Pc.png"} alt="" className="myProductCardImgStyle" />
                      </div>
                      <div className="myProductCardName">
                          iPhone 12 Pro Max
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