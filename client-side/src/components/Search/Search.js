import React from "react";

import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import "./Search.css";

import Navbar from "../Navbar/Navbar";
import ProductCard from "../ProductCard/ProductCard";
import Footer from "../Footer/Footer";
import CategoryCard from "../CategoryCard/CategoryCard";

export default function Search() {

    function focus(){
        document.getElementById("searchInput").focus();
        document.getElementById("searchBar").classList.add("focused");
    }
    function unfocus(){
        document.getElementById("searchBar").classList.remove("focused");
    }

    function showCancelBtt(){
        document.getElementById("cancelIcon").classList.remove("hidden");
    }
    function clearInput(){
        document.getElementById("searchInput").value = "";
        document.getElementById("cancelIcon").classList.add("hidden");
    }
    function showDet(event){
        event.preventDefault();
    }


    return (
        <div id="search">
            <Navbar pagename={"Search"} />



            <div className="searchBarContainer">

                <div id="searchBar" className="searchBar" onClick={focus} onBlur={unfocus}>
                    <div className="searchIconContainer">
                        <SearchIcon className="searchIcon" />
                    </div>
                    <form className="search-form" onSubmit={showDet}>
                        <input id="searchInput" type="text" placeholder="Cerca su Barter" className="searchInput" onChange={showCancelBtt}/>
                    </form>

                    <div  className="cIconContainer " onClick={clearInput}>
                        <span id="cancelIcon" className="cancelSpan hidden">
                            <HighlightOffIcon className="cancelIcon" />
                        </span>

                    </div>
                </div>

            </div>

            <div id="x" className="searchCategoryList">
                <div className="categoryListTitle">
                    <span>Sfoglia tutto</span>
                </div>
                <div className="categoryListRow">

                    <div className="categoryItem"><CategoryCard name={"Pc.png"} category={"Informatica"} /></div>
                    <div className="categoryItem"><CategoryCard name={"Smartphone.png"} category={"Smartphone"} /></div>
                    <div className="categoryItem"><CategoryCard name={"Tablet.png"} category={"Tablet"}/></div>
                    <div className="categoryItem"><CategoryCard name={"Games.png"} category={"Console & Game"}/></div>

                </div>
                <div className="categoryListRow">
                    <div className="categoryItem"><CategoryCard name={"House.png"} category={"Arredamento"}/></div>
                    <div className="categoryItem"><CategoryCard name={"Appliances.png"} category={"Elettrodomestici"}/></div>
                    <div className="categoryItem"><CategoryCard name={"Art.png"} category={"Arte"}/></div>
                    <div className="categoryItem"><CategoryCard name={"Antique.png"} category={"Antiquariato"}/></div>

                </div>
                <div className="categoryListRow">

                    <div className="categoryItem"><CategoryCard name={"Photography.png"} category={"Fotografia"}/></div>
                    <div className="categoryItem"><CategoryCard name={"Sport.png"} category={"Sport"}/></div>
                    <div className="categoryItem"><CategoryCard name={"Books.png"} category={"Libri"}/></div>
                    <div className="categoryItem"><CategoryCard name={"Music.png"} category={"Musica"}/></div>

                </div>
                <div className="categoryListRow">

                    <div className="categoryItem"><CategoryCard name={"Wallet.png"} category={"Pelletteria"}/></div>
                    <div className="categoryItem"><CategoryCard name={"Cloathing.png"} category={"Abbigliamento"}/></div>
                    <div className="categoryItem"><CategoryCard name={"Jewelry.png"} category={"Gioielleria"}/></div>
                    <div className="categoryItem"><CategoryCard name={"Watch.png"} category={"Orologi"}/></div>

                </div>

                <Footer />
            </div>
        </div>
    );
}
