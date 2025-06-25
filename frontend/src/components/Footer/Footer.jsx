import React from 'react';
import './Footer.css';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
          <p>
            Food-Zone is a food delivery service that brings your favorite meals right to your doorstep.
            We partner with local restaurants to offer a wide variety of cuisines, ensuring you have the best
            dining experience at home.
          </p>
          <p>Follow us on social media for the latest updates and offers.</p>
          <div className='footer-social-icons'>
            <a href="https://facebook.com" target='_blank' rel="noreferrer"><FaFacebookF className='footer-icon' /></a>
            <a href="https://twitter.com" target='_blank' rel="noreferrer"><FaTwitter className='footer-icon' /></a>
            <a href="https://linkedin.com" target='_blank' rel="noreferrer"><FaLinkedinIn className='footer-icon' /></a>
          </div>
        </div>

        <div className='footer-content-center'>
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className='footer-content-right'>
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 6309284605</li>
            <li>satishmadhunala03@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr />
      <p className='footer-copyright'>
        Copyright 2025 &copy; Satish - All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
