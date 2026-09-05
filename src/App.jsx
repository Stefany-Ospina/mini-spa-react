import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Layout from './components/Layout/Layout';
import Inicio from './components/pages/Inicio/Inicio';
import AcercaDe from './components/pages/AcercaDe/AcercaDe';
import Inscripcion from './components/pages/Inscripcion/Inscripcion';
import './styles/global.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('inicio');

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'acerca', label: 'Acerca de' },
    { id: 'inscripcion', label: 'Inscripcion' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'inicio':
        return <Inicio />;
      case 'acerca':
        return <AcercaDe />;
      case 'inscripcion':
        return <Inscripcion />;
      default:
        return <Inicio />;
    }
  };

  return (
    <>
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        logo="Mini SPA"
        navItems={navItems}
      />
      <Layout>{renderPage()}</Layout>
    </>
  );
};

export default App;
