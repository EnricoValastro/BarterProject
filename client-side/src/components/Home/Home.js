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

export default function Home() {

    const [infProducts, setInfProducts] = useState([]);
    const [arrProducts, setArrProducts] = useState([]);
    const [sportProducts, setSportProducts] = useState([]);
    const [abbProducts, setAbbProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/product/search/category/informatica')
            .then(response => {
                setInfProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:4000/api/product/search/category/abbigliamento')
            .then(response => {
                setAbbProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    let arr = [1,2,3,4,5,6,7,8];

    return(
        <div id="home">
            <Navbar pagename={"Home"} />

            <div className="carousel">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {arr.map(() => (
                        <SwiperSlide >
                            <CarouselProductCard />
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
                            slidesPerView={4}
                            spaceBetween={5}
                            slidesPerGroup={4}
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
                                    <SwiperSlide >
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
                            slidesPerView={4}
                            spaceBetween={5}
                            slidesPerGroup={4}
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
                                <SwiperSlide >
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
                            slidesPerView={4}
                            spaceBetween={5}
                            slidesPerGroup={4}
                            loop={false}
                            loopFillGroupWithBlank={true}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {arr.map(() => (
                                <SwiperSlide >

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
                            slidesPerView={4}
                            spaceBetween={5}
                            slidesPerGroup={4}
                            loop={false}
                            loopFillGroupWithBlank={true}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {arr.map(() => (
                                <SwiperSlide >

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