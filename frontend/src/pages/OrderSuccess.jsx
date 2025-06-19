import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSuccess.css'; // optional for styling

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="order-success">
      <h1>🎉 Order Placed Successfully!</h1>
      <p>Thank you for your order. Your food is being prepared. 🍔</p>
      <button onClick={() => navigate('/')}>🏠 Back to Home</button>
    </div>
  );
};

export default OrderSuccess;
