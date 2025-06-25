import React from 'react';
import './Header.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Header = () => {
  const slides = [
    {
      title: 'Order your favourite food here',
      desc: 'Choose from a wide variety of cuisines and get your food delivered to your doorstep.',
      img: 'https://img.freepik.com/free-photo/top-view-thanksgiving-food-border-composition-with-copy-space_23-2149114495.jpg?semt=ais_items_boosted&w=740'
    },
    {
      title: 'Fast & Fresh Delivery',
      desc: 'Experience lightning-fast delivery with fresh, hot meals delivered on time.',
      img: 'https://t3.ftcdn.net/jpg/02/81/50/18/360_F_281501867_XI5OBa4UuGVxMbv5gNLCcCkPDjsX6r0U.jpg'
    },
    {
      title: 'Delicious Meals Everyday',
      desc: 'Enjoy chef-crafted meals every day, tailored to your taste and mood.',
      img: 'https://img.freepik.com/premium-photo/abstract-background-restaurant-concept-blurred-background-evening-food-fork-knife-cutlery-table-setting_548821-3460.jpg'
    }
  ];

  return (
    <div className='header'>
      <Carousel
        showArrows={false}
        autoPlay
        infiniteLoop
        interval={3000}
        showStatus={false}
        showThumbs={false}
        swipeable
        emulateTouch
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className='header-slide'
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className='header-contents'>
              <h2>{slide.title}</h2>
              <p>{slide.desc}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Header;
