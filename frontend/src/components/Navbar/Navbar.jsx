import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "./../context/StoreContext";
import {
  FaSearch,
  FaShoppingBasket,
  FaUserCircle,
  FaSignOutAlt,
  FaBoxOpen,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobile = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <h1>Food-Zone</h1>
        </Link>
        <div className="hamburger" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      <ul className={`navbar-menu ${mobileMenuOpen ? "show" : ""}`}>
        <Link
          to="/"
          onClick={() => {
            setMenu("home");
            closeMobile();
          }}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => {
            setMenu("menu");
            closeMobile();
          }}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#footer"
          onClick={() => {
            setMenu("contact-us");
            closeMobile();
          }}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      <div className="navbar-right">
        <FaSearch className="icon" />
        <div className="navbar-cart">
          <Link to="/cart">
            <FaShoppingBasket className="icon" />
          </Link>
          {getTotalCartAmount() !== 0 && <div className="dot" />}
        </div>

        {!token ? (
          <button className="btn-login" onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        ) : (
          <div className="navbar-profile-wrapper">
            <div className="navbar-profile">
              <FaUserCircle className="icon profile-icon" />
            </div>
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <FaBoxOpen /> <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <FaSignOutAlt /> <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
