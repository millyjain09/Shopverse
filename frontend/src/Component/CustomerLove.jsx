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
  {
    id: 5,
    name: "Vikram Singh",
    role: "Gym Trainer",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    rating: 4,
    text: "Ordered sportswear. The material is breathable and fits perfectly for my workouts. Will order again.",
  },
  {
    id: 6,
    name: "Anjali Mehta",
    role: "Artist",
    image: "https://randomuser.me/api/portraits/women/90.jpg",
    rating: 5,
    text: "Absolutely in love with the trendy tops! The colors are vibrant and exactly as shown in the pictures.",
  }
];

const CustomerLove = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "0px",
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          className: "",
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          className: "",
          centerPadding: "0px",
        }
      }
    ]
  };

  return (
    <div className='py-20 bg-gradient-to-b from-white to-teal-50 overflow-hidden font-sans'>

      {/* FULL CSS FIX */}
      <style>{`
        /* Desktop animation */
        @media(min-width:1024px){
          .slick-slide > div {
            transform: scale(0.9);
            opacity: 0.6;
            filter: blur(1px);
            transition: all 0.4s ease;
          }
          .slick-center > div {
            transform: scale(1.1);
            opacity: 1 !important;
            filter: blur(0);
            z-index: 10;
          }
        }

        /* MOBILE FIX — remove scaling + add padding */
        @media(max-width:768px){
          .slick-slide {
            padding: 0 14px !important;
          }

          .slick-slide > div {
            transform: scale(1) !important;
            opacity: 1 !important;
            filter: blur(0) !important;
          }

          .slick-center > div {
            transform: scale(1) !important;
          }
        }

        .slick-slide:focus { outline: none; }
      `}</style>

      <div className='text-center mb-16'>
        <Title text1={"Customer "} text2={"Love"} />
        <p className='text-teal-600 mt-2 font-medium'>
          See what our happy customers say about us
        </p>
      </div>

      <div className='max-w-7xl mx-auto px-2 md:px-4'>
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review.id} className="py-10 px-2 outline-none">

              <div className='bg-white p-8 rounded-2xl shadow-xl border border-teal-100 h-full flex flex-col justify-between relative'>
                
                <div className='absolute top-4 right-6 text-teal-100'>
                  <FaQuoteLeft size={40} />
                </div>

                <div className='flex items-center gap-4 mb-6'>
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className='w-14 h-14 rounded-full border-2 border-teal-500 object-cover shadow-md'
                  />
                  <div>
                    <h3 className='font-bold text-gray-800 text-lg'>{review.name}</h3>
                    <p className='text-xs text-teal-600 font-bold uppercase tracking-wider'>
                      {review.role}
                    </p>
                  </div>
                </div>

                <p className='text-gray-600 text-sm md:text-base leading-relaxed italic'>
                  "{review.text}"
                </p>

                <div className='flex gap-1 mt-6 text-yellow-400 text-sm'>
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={i < Math.floor(review.rating) ? "text-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>

              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CustomerLove;
