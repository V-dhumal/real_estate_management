"use client";  // 👈 This makes the component a client component

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RealEstateSlider = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const sliderImages = [
    "/images/dream-house-banner.jpg",
    "/images/property-1.jpg",
    "/images/property-2.jpg",
    "/images/property-3.jpg",
    "/images/property-4.jpg",
  ];

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 mb-8 rounded-2xl overflow-hidden shadow-2xl">
      <Slider {...sliderSettings}>
        {sliderImages.map((image, index) => (
          <div key={index} className="w-full h-full">
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover rounded-2xl" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RealEstateSlider;
