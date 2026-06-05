import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import {useAuth} from "../../../features/authorisation/context/AuthContext.jsx"
const Header = () => {
  const location = useLocation();
 const {logout} = useAuth();
  const isAuthPage =
    location.pathname === "/" || location.pathname === "/RegisterPage";
  return (
    <header className="header d-flex justify-content-between">
        {isAuthPage ? (
          < div className="logoContainer d-flex align-items-center centered">
            <img src={logo} alt="Логотип" className="logoImage " />
            <span className="logoText ">делЁЖ</span>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center w-100">
            <Link to="/EventsPage" className="logoLink">
              <img src={logo} alt="Логотип" className="logoImage" />
              <span className="logoText ">делЁЖ</span>
            </Link>
            <div className=" d-flex justify-content-center gap-2">
              <Link to="/ProfilePage" className="">
                <span className="logoText ">профиль</span>
              </Link>
              <Link to="/" onClick={logout}>
                <span className="logoText ">выход</span>
              </Link>
            </div>
          </div>
        )}
      {!isAuthPage && (
        <nav>
          <Link to="/"></Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
