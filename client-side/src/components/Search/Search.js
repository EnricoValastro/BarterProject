import React, {useState} from "react";

import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import "./Search.css";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import CategoryCard from "../CategoryCard/CategoryCard";
import ProductCard from "../ProductCard/ProductCard";

import axios from "axios";
import useToken from "../App/useToken";

export default function Search() {

    const {token, setToken} = useToken();
    const [catProduct, setCatProduct] = useState([])
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

    function showCategoryProduct (category)  {
        setCatProduct([]);
        axios.get("http://localhost:4000/api/product/search/bycategory/"+category+"/"+token)
            .then(response => {
                if(response.data.length === 0){
                    document.getElementById("noProduct").classList.remove("hidden");
                }
                setCatProduct(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        const x = document.getElementById("x");
        const y = document.getElementById("y");
        const z = document.getElementById("z");
        x.classList.add("hidden");
        y.classList.add("hidden");
        z.classList.remove("hidden");

    }

    function resumeSearchPage(){
        const x = document.getElementById("x");
        const y = document.getElementById("y");
        const z = document.getElementById("z");
        const emp = document.getElementById("noProduct");
        x.classList.remove("hidden");
        y.classList.remove("hidden");
        emp.classList.add("hidden");
        z.classList.add("hidden");
    }

    return (
        <div id="search">
            <Navbar pagename={"Search"} />

            <div id="y" className="searchBarContainer ">

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

            <div id="x" className="searchCategoryList ">
                <div className="categoryListTitle">
                    <span>Sfoglia tutto</span>
                </div>
                <div className="categoryListRow">
                    <CategoryCard name={"Pc.png"} category={"Informatica"} onClick={showCategoryProduct} />
                    <CategoryCard name={"Smartphone.png"} category={"Smartphone"} onClick={showCategoryProduct} />
                    <CategoryCard name={"Tablet.png"} category={"Tablet"} onClick={showCategoryProduct} />
                    <CategoryCard name={"Games.png"} category={"Console & Game"} onClick={showCategoryProduct} />
                </div>
                <div className="categoryListRow">
                    <CategoryCard name={"House.png"} category={"Arredamento"} onClick={showCategoryProduct} />
                    <CategoryCard name={"Appliances.png"} category={"Elettrodomestici"} onClick={showCategoryProduct} />
                    <CategoryCard name={"Art.png"} category={"Arte"} onClick={showCategoryProduct} />
                    <CategoryCard name={"Antique.png"} category={"Antiquariato"} onClick={showCategoryProduct} />

                </div>
                <div className="categoryListRow">
                    <CategoryCard name={"Photography.png"} category={"Fotografia"}  onClick={showCategoryProduct} />
                    <CategoryCard name={"Sport.png"} category={"Sport"} onClick={showCategoryProduct} />
                    <CategoryCard name={"Books.png"} category={"Libri"} onClick={showCategoryProduct} />
                    <CategoryCard name={"Music.png"} category={"Musica"} onClick={showCategoryProduct} />

                </div>
                <div className="categoryListRow">
                    <CategoryCard name={"Wallet.png"} category={"Pelletteria"} onClick={showCategoryProduct} />
                    <CategoryCard name={"Cloathing.png"} category={"Abbigliamento"} onClick={showCategoryProduct} />
                    <CategoryCard name={"Jewelry.png"} category={"Gioielleria"} onClick={showCategoryProduct} />
                    <CategoryCard name={"Watch.png"} category={"Orologi"} onClick={showCategoryProduct} />
                </div>

                <Footer />
            </div>

            <div id="z" className="productOfCategory hidden">
                <div className="navigation" onClick={resumeSearchPage}>
                    <ArrowBackIosIcon className="navigationIcon"/>
                    <div className="navigationText">Torna a Cerca</div>
                </div>
                <div id="noProduct" className="emptyPage hidden">
                    <div className="emptyPageTitle">Sembra che non ci sia ancora nulla qui !</div>
                    <img  className="emptyPageImg" src={"img/EmptyPage.png"} alt=""/>
                </div>
                <div className="res">
                    {catProduct.map((p) => (
                        <div key={p._id} className="pr">
                            <ProductCard id={p._id} name={p.name} value = {p.value} desc={p.description} category={p.category} status={p.status} location={p.location} date={p.date} user={p.userID} />
                        </div>
                    ))}
                    <Footer />
                </div>

            </div>
        </div>
    );
}
