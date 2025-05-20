import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="layout-container">
      <Header />
      <main className="content-area">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
