import React from 'react';
import Title from './Title';
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const reviews = [
  {
    id: 1,
    name: "Rohan Das",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "Shopverse se maine jacket order ki thi, quality ekdum premium hai! Delivery bhi super fast thi. Highly recommended!",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Fashion Blogger",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.5,
    text: "I love the ethnic collection here. The fabric is so soft and the fit is just perfect. Sea Green theme is lovely too!",
  },
  {
    id: 3,
    name: "Amit Verma",
    role: "Student",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    rating: 5,
    text: "Best deals on sneakers! Mujhe market se 40% sasta mila yahan. Customer support bhi bahot helpful hai.",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    role: "HR Manager",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    text: "Shopping experience was so smooth. The app UI is amazing and the return policy is very hassle-free.",
  },
];

const CustomerLove = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "0px",
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <div className="py-20 bg-gradient-to-b from-white to-teal-50">

      <div className="text-center mb-16">
        <Title text1="Customer " text2="Love" />
        <p className="text-teal-600 mt-2 font-medium">See what our customers say about us</p>
      </div>

      {/* Desktop Slider */}
      <div className="hidden md:block max-w-7xl mx-auto px-4">
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review.id} className="p-4">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-teal-100 relative">

                <FaQuoteLeft className="absolute right-6 top-6 text-teal-200 text-4xl"/>

                <div className="flex items-center gap-4 mb-6">
                  <img src={review.image} alt="" className="w-16 h-16 rounded-full border-4 border-teal-500"/>
                  <div>
                    <h3 className="font-bold text-xl">{review.name}</h3>
                    <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider">{review.role}</p>
                  </div>
                </div>

                <p className="text-gray-600 italic leading-relaxed mb-4">
                  "{review.text}"
                </p>

                <div className="text-yellow-400 text-lg flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Mobile Cards - NO SLIDER */}
      <div className="md:hidden px-4 space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-2xl shadow-lg border border-teal-100 relative">

            <FaQuoteLeft className="absolute right-4 top-4 text-teal-200 text-3xl"/>

            <div className="flex items-center gap-4 mb-4">
              <img src={review.image} alt="" className="w-14 h-14 rounded-full border-4 border-teal-500"/>
              <div>
                <h3 className="font-bold text-lg">{review.name}</h3>
                <p className="text-teal-600 text-xs font-semibold uppercase tracking-wider">{review.role}</p>
              </div>
            </div>

            <p className="text-gray-600 italic leading-relaxed mb-3">
              "{review.text}"
            </p>

            <div className="text-yellow-400 text-base flex gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default CustomerLove;
