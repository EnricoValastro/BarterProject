import React from 'react';

import {Link, useNavigate} from "react-router-dom";

import useToken from '../App/useToken';
import Navbar from "../Navbar/Navbar";
import ProductCard from "../ProductCard/ProductCard";
import Footer from "../Footer/Footer";

import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './Home.css';
import CarouselProductCard from "../CarouselProductCard/CarouselProductCard";

export default function Home() {
    const navigate = useNavigate();
    const { token, setToken } = useToken();

    if(!token){
        window.location.href = '/signin';
    }
    const arr = [1,2,3,4,5,6,7,8]

    return(
        <div id="home">
            <Navbar pagename={"Home"} />

            <div className="carousel">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 10000,
                        disableOnInteraction: false,
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
                        Some title for the section
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
                                        <ProductCard />
                                    </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className="productSection">
                    <div className="secTitle">
                        Some title for the section
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
                                    <ProductCard />
                                </SwiperSlide>
                            ))}
                        </Swiper>


                    </div>
                </div>
                <div className="productSection">
                    <div className="secTitle">
                        Some title for the section
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
                                    <ProductCard />
                                </SwiperSlide>
                            ))}
                        </Swiper>


                    </div>
                </div>
                <div className="productSection">
                    <div className="secTitle">
                        Some title for the section
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
                                    <ProductCard />
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