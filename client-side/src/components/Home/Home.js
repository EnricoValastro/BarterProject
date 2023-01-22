import React, {useEffect, useState} from 'react';

import Navbar from "../Navbar/Navbar";
import ProductCard from "../ProductCard/ProductCard";
import Footer from "../Footer/Footer";
import CarouselProductCard from "../CarouselProductCard/CarouselProductCard";

import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './Home.css';

import axios from "axios";
import useToken from "../App/useToken";

export default function Home() {

    let count = 0;
    const {token, setToken} = useToken();

    const [infProducts, setInfProducts] = useState([]);
    const [arrProducts, setArrProducts] = useState([]);
    const [sportProducts, setSportProducts] = useState([]);
    const [abbProducts, setAbbProducts] = useState([]);
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/product/search/topproducts/'+token)
            .then(response => {
                setTopProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:4000/api/product/search/firstincategory/Informatica/'+token)
            .then(response => {
                setInfProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);
    useEffect(() => {
        axios.get('http://localhost:4000/api/product/search/firstincategory/Arredamento/'+token)
            .then(response => {
                setArrProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);
    useEffect(() => {
        axios.get('http://localhost:4000/api/product/search/firstincategory/Sport/'+token)
            .then(response => {
                setSportProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);
    useEffect(() => {
        axios.get('http://localhost:4000/api/product/search/firstincategory/Abbigliamento/'+token)
            .then(response => {
                setAbbProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return(
        <div id="home">
            <Navbar pagename={"Home"} />

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
                    {topProducts.map((p) => (
                        count++,
                        <SwiperSlide key={p._id} >
                            <CarouselProductCard count={count} id={p._id} name={p.name} value = {p.value} desc={p.description} category={p.category} status={p.status} location={p.location} date={p.date} user={p.userID} />
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
                            {infProducts.map((p) => (
                                    <SwiperSlide key={p._id} >
                                        <ProductCard id={p._id} name={p.name} value = {p.value} desc={p.description} category={p.category} status={p.status} location={p.location} date={p.date} user={p.userID} />
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
                            {arrProducts.map((p) => (
                                <SwiperSlide key={p._id}>
                                    <ProductCard id={p._id} name={p.name} value = {p.value} desc={p.description} category={p.category} status={p.status} location={p.location} date={p.date} user={p.userID} />
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
                            {sportProducts.map((p) => (
                                <SwiperSlide key={p._id}>
                                    <ProductCard id={p._id} name={p.name} value = {p.value} desc={p.description} category={p.category} status={p.status} location={p.location} date={p.date} user={p.userID} />
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
                            {abbProducts.map((p) => (
                                <SwiperSlide key={p._id} >
                                    <ProductCard id={p._id} name={p.name} value = {p.value} desc={p.description} category={p.category} status={p.status} location={p.location} date={p.date} user={p.userID} />
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