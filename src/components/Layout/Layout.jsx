import React from 'react';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <main className="layout">
      <div className="layout__container">{children}</div>
    </main>
  );
};

export default Layout;
