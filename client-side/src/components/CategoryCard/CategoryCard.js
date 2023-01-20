import React from "react";

import "./CategoryCard.css";

/* ToDo: categoryCard on click handler: navigate to category page */
export default function CategoryCard(props) {
    const imgName = props.name;

    return (
        <div id="categoryCard" className="category">
            <div className="categoryTitle">{props.category}</div>
            <img  className="imga" src={"img/"+ imgName} alt=""/>
        </div>
    )
}