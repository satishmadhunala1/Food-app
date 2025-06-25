import React, { useContext, useEffect } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className='food-display' id='food-display'>
      <h2 data-aos="fade-up">Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === 'All' || category === item.category) {
            return (
              <div key={index} data-aos="zoom-in">
                <FoodItem
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
