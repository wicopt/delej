import React from 'react';
import Header from '../Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import './Layout.css'
const Layout = ({ children }) => {



  const { pathname } = useLocation();

  const isAuthPage =
    pathname === '/' || pathname === '/register';

  return (
    <div>
      <Header/>
    <div className={isAuthPage ? '' : 'app-layout'}>
      {!isAuthPage}
      <Outlet />
    </div></div>
  );
};

export default Layout;
