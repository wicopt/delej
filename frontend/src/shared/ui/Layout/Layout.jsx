import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import './Layout.css'
const Layout = ({ children }) => {
  return (
    <div className='app-layout'>
      <Header />
      <Outlet/>
    </div>
  );
};

export default Layout;