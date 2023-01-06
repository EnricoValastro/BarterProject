import React from 'react';

import useToken from '../App/useToken';
import {Link, useNavigate} from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ProductCard from "../ProductCard/ProductCard";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './Home.css';

import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";
import {createRoot} from "react-dom";


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

            <div className="carousel"></div>

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
            </div>

        </div>
    );
}