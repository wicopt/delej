import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
const Header = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/" || location.pathname === "/RegisterPage";
  return (
    <header className="header">
      <div className={`logoContainer ${isAuthPage ? "centered" : ""}`}>
        {isAuthPage ? (
          <>
            <img src={logo} alt="Логотип" className="logoImage " />
            <span className="logoText ">делЁЖ</span>
          </>
        ) : (
          <Link to="/" className="logoLink">
            <img src={logo} alt="Логотип" className="logoImage" />
            <span className="logoText ">делЁЖ</span>
          </Link>
        )}</div>
        {!isAuthPage && (
          <nav>
            <Link to="/Events"></Link>
          </nav>
        )}
      
    </header>
  );
};

export default Header;
