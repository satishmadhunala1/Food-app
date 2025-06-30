import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({ ...item, quantity: cartItems[item._id] }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 20,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        alert('Error placing order');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="form-section card">
        <h2>Delivery Information</h2>
        <div className="form-row">
          <input name="firstName" value={data.firstName} onChange={onChangeHandler} required placeholder="First Name" />
          <input name="lastName" value={data.lastName} onChange={onChangeHandler} required placeholder="Last Name" />
        </div>
        <input name="email" value={data.email} onChange={onChangeHandler} required type="email" placeholder="Email" />
        <input name="street" value={data.street} onChange={onChangeHandler} required placeholder="Street Address" />
        <div className="form-row">
          <input name="city" value={data.city} onChange={onChangeHandler} required placeholder="City" />
          <input name="state" value={data.state} onChange={onChangeHandler} required placeholder="State" />
        </div>
        <div className="form-row">
          <input name="zipcode" value={data.zipcode} onChange={onChangeHandler} required placeholder="Zip Code" />
          <input name="country" value={data.country} onChange={onChangeHandler} required placeholder="Country" />
        </div>
        <input name="phone" value={data.phone} onChange={onChangeHandler} required placeholder="Phone Number" />
      </div>

      <div className="summary-section card">
        <h2>Order Summary</h2>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{getTotalCartAmount()}</span>
        </div>
        <div className="summary-row">
          <span>Delivery Fee</span>
          <span>₹{getTotalCartAmount() === 0 ? 0 : 20}</span>
        </div>
        <hr />
        <div className="summary-row total">
          <b>Total</b>
          <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</b>
        </div>
        <button type="submit" className="place-order-btn">Proceed to Payment</button>
      </div>
    </form>
  );
};

export default PlaceOrder;
