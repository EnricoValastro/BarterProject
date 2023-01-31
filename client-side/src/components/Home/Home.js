import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";

import Navbar from "../Navbar/Navbar";
import ProductCard from "../ProductCard/ProductCard";
import Footer from "../Footer/Footer";
import CarouselProductCard from "../CarouselProductCard/CarouselProductCard";
import useToken from "../App/useToken";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './Home.css';

export default function Home(props) {

    let count = 0;

    /* User's token and id */
    const {token, setToken} = useToken();
    const [userId, setUserId] = useState("");

    /* Product list for category and carousel */
    const [infProducts, setInfProducts]     = useState([]);
    const [arrProducts, setArrProducts]     = useState([]);
    const [sportProducts, setSportProducts] = useState([]);
    const [abbProducts, setAbbProducts]     = useState([]);
    const [topProducts, setTopProducts]     = useState([]);

    useEffect(() => {
        setUserId(props.userId);
    }, [props.userId]);


    /* Fetch most recent product from DB */
    useEffect(() => {
        axios.get('http://localhost:4000/api/product/home/gettopproducts/'+token)
            .then(response => {
                setTopProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    /* Fetch first product from each category */
    useEffect(() => {
        axios.get('http://localhost:4000/api/product/home/getfirstproductincategory/Informatica/'+token)
            .then(response => {
                setInfProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:4000/api/product/home/getfirstproductincategory/Arredamento/'+token)
            .then(response => {
                setArrProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:4000/api/product/home/getfirstproductincategory/Sport/'+token)
            .then(response => {
                setSportProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:4000/api/product/home/getfirstproductincategory/Abbigliamento/'+token)
            .then(response => {
                setAbbProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return(
        <div id="home">
            <Navbar pagename={"Home"} notifications={props.notifications} unreadNotifications={props.unreadNotifications} num2={props.num2} setNum2={props.setNum2} />

            <div className="carousel">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[ Pagination, Navigation]}
                    className="mySwiper"
                >
                    {topProducts.map((p, index) => (
                        count++,
                        <SwiperSlide key={"carousel"+index} >
                            <CarouselProductCard count={count} id={p._id} name={p.name} value = {p.value} desc={p.description} category={p.category} status={p.status} location={p.location} date={p.date} user={p.userID} product={props.product} num={props.num} setNum={props.setNum} myId={props.userId} transactions={props.transactions} socket={props.socket} userName={props.userName} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="secContainer">
                <div className="productSection">
                    <div className="secTitle">
                        Informatica
                    </div>
                    <div className="carouselNew">
                        <Swiper
                            breakpoints={{
                                300: {
                                    slidesPerView: 1,
                                    slidesPerGroup: 1,
                                },
                                700: {
                                    slidesPerView: 2,
                                    slidesPerGroup: 2,
                                },
                                850: {
                                    slidesPerView: 4,
                                    slidesPerGroup: 4,
                                },
                            }}
                            spaceBetween={5}
                            loop={false}
                            loopFillGroupWithBlank={true}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {infProducts.map((p, index) => (
                                    <SwiperSlide key={"inf"+index} >
                                        <ProductCard product={props.product} id={p._id} name={p.name} value = {p.value} desc={p.description} category={p.category} status={p.status} location={p.location} date={p.date} user={p.userID} num={props.num} setNum={props.setNum} myId={props.userId} transactions={props.transactions} socket={props.socket} userName={props.userName} />
                                    </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className="productSection">
                    <div className="secTitle">
                        Arredamento
                    </div>
                    <div className="carouselNew">


                        <Swiper
                            breakpoints={{
                                300: {
                                    slidesPerView: 1,
                                    slidesPerGroup: 1,
                                },
                                700: {
                                    slidesPerView: 2,
                                    slidesPerGroup: 2,
                                },
                                850: {
                                    slidesPerView: 4,
                                    slidesPerGroup: 4,
                                },
                            }}
                            spaceBetween={5}
                            loop={false}
                            loopFillGroupWithBlank={true}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {arrProducts.map((p, index) => (
                                <SwiperSlide key={"arr"+index}>
                                    <ProductCard product={props.product} id={p._id} name={p.name} value = {p.value} desc={p.description} category={p.category} status={p.status} location={p.location} date={p.date} user={p.userID} num={props.num} setNum={props.setNum} myId={props.userId} transactions={props.transactions} socket={props.socket} userName={props.userName} />
                                </SwiperSlide>
                            ))}
                        </Swiper>


                    </div>
                </div>
                <div className="productSection">
                    <div className="secTitle">
                        Sport
                    </div>
                    <div className="carouselNew">

                        <Swiper
                            breakpoints={{
                                300: {
                                    slidesPerView: 1,
                                    slidesPerGroup: 1,
                                },
                                700: {
                                    slidesPerView: 2,
                                    slidesPerGroup: 2,
                                },
                                850: {
                                    slidesPerView: 4,
                                    slidesPerGroup: 4,
                                },
                            }}
                            spaceBetween={5}
                            loop={false}
                            loopFillGroupWithBlank={true}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {sportProducts.map((p, index) => (
                                <SwiperSlide key={"sport"+index}>
                                    <ProductCard product={props.product} id={p._id} name={p.name} value = {p.value} desc={p.description} category={p.category} status={p.status} location={p.location} date={p.date} user={p.userID} num={props.num} setNum={props.setNum} myId={props.userId} transactions={props.transactions} socket={props.socket} userName={props.userName} />
                                </SwiperSlide>
                            ))}
                        </Swiper>


                    </div>
                </div>
                <div className="productSection">
                    <div className="secTitle">
                        Abbigliamento
                    </div>
                    <div className="carouselNew">

                        <Swiper
                            breakpoints={{
                                300: {
                                    slidesPerView: 1,
                                    slidesPerGroup: 1,
                                },
                                700: {
                                    slidesPerView: 2,
                                    slidesPerGroup: 2,
                                },
                                850: {
                                    slidesPerView: 4,
                                    slidesPerGroup: 4,
                                },
                            }}
                            spaceBetween={5}
                            loop={false}
                            loopFillGroupWithBlank={true}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {abbProducts.map((p, index) => (
                                <SwiperSlide key={"abb"+index} >
                                    <ProductCard product={props.product} id={p._id} name={p.name} value = {p.value} desc={p.description} category={p.category} status={p.status} location={p.location} date={p.date} user={p.userID} num={props.num} setNum={props.setNum} myId={props.userId} transactions={props.transactions} socket={props.socket} userName={props.userName} />
                                </SwiperSlide>
                            ))}
                        </Swiper>


                    </div>
                </div>
                <Footer />
            </div>

        </div>
    );
}