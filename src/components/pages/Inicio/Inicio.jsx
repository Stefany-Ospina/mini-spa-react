import React, { useState, useEffect } from 'react';
import './Inicio.css';

const Inicio = () => {
  const [horaCarga, setHoraCarga] = useState('--:--:--');

  useEffect(() => {
    const ahora = new Date().toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    setHoraCarga(ahora);
  }, []);

  return (
    <section className="page">
      <h2>Bienvenido a Produccion de Software</h2>

      <p>
        Esta es la seccion de <strong>Inicio</strong>. Todo el contenido que ves
        esta siendo renderizado por React; no hubo ninguna recarga del navegador
        para llegar aqui.
      </p>

      <p>
        Hora en la que se cargo esta pagina por primera vez:
        <span className="highlight">{horaCarga}</span>
      </p>

      <div className="info-box">
        <h3>Que es una SPA?</h3>
        <p>
          Una <strong>Single Page Application (SPA)</strong> es una aplicacion web
          que carga una unica pagina HTML y actualiza dinamicamente el contenido
          mediante JavaScript, sin solicitar un nuevo documento al servidor.
        </p>
      </div>

      <div className="info-box info-box--highlight">
        <h3>Diferencia: Vanilla JS vs React</h3>
        <ul>
          <li>
            <strong>Vanilla JS:</strong> Manipulamos el DOM directamente con
            <code>document.getElementById()</code>
          </li>
          <li>
            <strong>React:</strong> El estado (<code>useState</code>) maneja los datos,
            y React actualiza el DOM automaticamente
          </li>
          <li>
            <strong>Ventaja:</strong> Codigo mas predecible, testeable y escalable
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Inicio;
