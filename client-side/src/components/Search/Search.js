import React, {useEffect, useState} from "react";
import axios from "axios";

import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import CategoryCard from "../CategoryCard/CategoryCard";
import ProductCard from "../ProductCard/ProductCard";
import useToken from "../App/useToken";

import "./Search.css";
import {getUserProducts} from "../../Utility/Utils";

export default function Search() {

    /* User's token */
    const {token, setToken} = useToken();

    /* List of products founded by category */
    const [catProduct, setCatProduct] = useState([])

    /* List of products founded by research */
    const [searchProduct, setSearchProduct] = useState([])

    /* List of my products */
    const [num, setNum] = useState(0);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        getUserProducts(setProduct, token);
    }, [num]);

    /* Search bar style and behavior manager */
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

    /* x icon handler clear search bar and search result */
    function clearInput(){
        document.getElementById("searchInput").value = "";
        document.getElementById("noProduct2").classList.add("hidden");
        document.getElementById("t").classList.add("hidden");
        document.getElementById("cancelIcon").classList.add("hidden");
        setCatProduct([]);
        document.getElementById("x").classList.remove("hidden");
    }


    function searchForProduct(event){
        event.preventDefault();
        document.getElementById("noProduct2").classList.add("hidden");
        setSearchProduct([]);
        const name = document.getElementById("searchInput").value;
        document.getElementById("x").classList.add("hidden");
        document.getElementById("t").classList.remove("hidden");
        axios.get("http://localhost:4000/api/product/search/getproductbyname/"+name+"/"+token)
            .then(response => {
                console.log(response.data);
                if(response.data.length === 0){
                    document.getElementById("noProduct2").classList.remove("hidden");
                }
                else {
                    setSearchProduct(response.data);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    function showCategoryProduct (category)  {
        console.log("ciao")
        setCatProduct([]);
        document.getElementById("x").classList.add("hidden");
        document.getElementById("y").classList.add("hidden");
        document.getElementById("z").classList.remove("hidden");
        axios.get("http://localhost:4000/api/product/search/getproductbycategory/"+category+"/"+token)
            .then(response => {
                if(response.data.length === 0){
                    document.getElementById("noProduct").classList.remove("hidden");
                }
                setCatProduct(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function resumeSearchPage(){
        setCatProduct([]);
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
                    <form className="search-form" onSubmit={searchForProduct}>
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
                    <CategoryCard name={"Games.png"} category={"Console-Game"} onClick={showCategoryProduct} />
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
                    {catProduct.map((p,index) => (
                        <div key={"cat"+index} className="pr">
                            <ProductCard product={product} id={p._id} name={p.name} value = {p.value} desc={p.description} category={p.category} status={p.status} location={p.location} date={p.date} user={p.userID} num={num} setNum={setNum} />
                        </div>
                    ))}
                    <Footer />
                </div>


            </div>

            <div id="t" className="searchResultContainer hidden">
                <div id="noProduct2" className="emptyPage hidden">
                    <div className="emptyPageTitle">Sembra che non ci sia ancora nulla qui !</div>
                    <img  className="emptyPageImg" src={"img/EmptyPage.png"} alt=""/>
                </div>
                <div className="res">
                    {searchProduct.map((p, index) => (
                        <div key={"search"+index} className="pr">
                            <ProductCard product={product} id={p._id} name={p.name} value = {p.value} desc={p.description} category={p.category} status={p.status} location={p.location} date={p.date} user={p.userID} num={num} setNum={setNum} />
                        </div>
                    ))}
                    <Footer />
                </div>
            </div>
        </div>
    );
}
