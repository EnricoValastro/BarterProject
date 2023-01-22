import React from "react";

import "./CategoryCard.css";

/* ToDo: categoryCard on click handler: navigate to category page */
export default function CategoryCard(props) {
    const imgName = props.name;

    function onClickHandler(){
        props.onClick(props.category);
    }

    return (
        <div id="categoryCard" className="category" onClick={onClickHandler}>
            <div className="categoryTitle">{props.category}</div>
            <img  className="imga" src={"img/"+ imgName} alt=""/>
        </div>
    )
}