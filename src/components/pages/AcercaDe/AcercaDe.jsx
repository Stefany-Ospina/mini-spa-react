import React, { useState } from 'react';
import './AcercaDe.css';

const AcercaDe = () => {
  const [contador, setContador] = useState(0);

  const incrementarContador = () => {
    setContador(contador + 1);
  };

  const resetearContador = () => {
    setContador(0);
  };

  return (
    <section className="page">
      <h2>Acerca de este ejercicio</h2>

      <p>
        Este codigo es la demostracion de una migracion de <strong>JavaScript Vanilla</strong> a
        <strong> React</strong>, manteniendo la misma funcionalidad pero con una arquitectura
        profesional y escalable.
      </p>

      <h3>Conceptos clave:</h3>
      <ul className="concepts-list">
        <li><strong>Componentes funcionales:</strong> Bloques reutilizables de codigo</li>
        <li><strong>Estado (useState):</strong> Datos reactivos que cambian la interfaz</li>
        <li><strong>Props:</strong> Parametros que se pasan entre componentes</li>
        <li><strong>Efectos (useEffect):</strong> Logica que se ejecuta en momentos especificos</li>
        <li><strong>Eventos:</strong> Responden a acciones del usuario</li>
      </ul>

      <div className="counter-section">
        <h3>Demostracion Interactiva</h3>
        <p>Este contador demuestra como React maneja el estado:</p>

        <div className="counter-display">
          <p>Veces que has hecho clic:</p>
          <div className="counter-value">{contador}</div>
        </div>

        <div className="counter-actions">
          <button className="btn btn--primary" onClick={incrementarContador}>
            Incrementar
          </button>
          <button className="btn btn--secondary" onClick={resetearContador}>
            Resetear
          </button>
        </div>
      </div>

      <div className="comparison">
        <h3>Vanilla JS vs React</h3>
        <div className="comparison-grid">
          <div className="comparison-item comparison-item--vanilla">
            <h4>Vanilla JS</h4>
            <pre className="code-block">{`let contador = 0;
btn.addEventListener('click', () => {
  contador++;
  display.textContent = contador;
});`}</pre>
          </div>
          <div className="comparison-item comparison-item--react">
            <h4>React</h4>
            <pre className="code-block">{`const [contador, setContador] =
  useState(0);

const incrementar = () =>
  setContador(contador + 1);`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcercaDe;
