import React, { useState, useEffect } from 'react';
import './Inscripcion.css';

const API_URL = 'http://localhost:3001/api/inscritos';

const Inscripcion = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    programa: '',
    semestre: '',
    comentarios: '',
  });

  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);
  const [inscritos, setInscritos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorServidor, setErrorServidor] = useState('');

  /**
   * useEffect: Carga los inscritos desde el backend al montar el componente.
   *
   * Antes (sin backend): los datos vivian en useState y se perdian al recargar.
   * Ahora (con backend): los datos se cargan desde el servidor y persisten.
   */
  useEffect(() => {
    cargarInscritos();
  }, []);

  const cargarInscritos = async () => {
    try {
      setCargando(true);
      setErrorServidor('');
      const respuesta = await fetch(API_URL);
      if (!respuesta.ok) throw new Error('Error al cargar inscritos');
      const datos = await respuesta.json();
      setInscritos(datos);
    } catch (error) {
      setErrorServidor('No se pudo conectar al servidor. Verifica que el backend este corriendo.');
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errores[name]) {
      setErrores({ ...errores, [name]: '' });
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!formData.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio';
    if (!formData.email.trim()) {
      nuevosErrores.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nuevosErrores.email = 'Ingresa un email valido';
    }
    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = 'El telefono es obligatorio';
    } else if (!/^\d{7,10}$/.test(formData.telefono)) {
      nuevosErrores.telefono = 'Ingresa un telefono valido (7-10 digitos)';
    }
    if (!formData.programa) nuevosErrores.programa = 'Selecciona un programa';
    if (!formData.semestre) nuevosErrores.semestre = 'Selecciona un semestre';
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  /**
   * handleSubmit: Envia los datos al backend via POST.
   *
   * Antes: setInscritos([...inscritos, nuevoInscrito])  → solo memoria
   * Ahora: fetch(API_URL, { method: 'POST' })           → guarda en servidor
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      setErrorServidor('');
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        // El servidor devolvio errores de validacion
        if (datos.errores) {
          setErrores(datos.errores);
        }
        return;
      }

      // Exito: agregar a la lista y limpiar formulario
      setInscritos([...inscritos, datos]);
      setEnviado(true);
      setFormData({
        nombre: '', email: '', telefono: '',
        programa: '', semestre: '', comentarios: '',
      });
      setTimeout(() => setEnviado(false), 3000);
    } catch (error) {
      setErrorServidor('Error al enviar. Verifica que el backend este corriendo.');
    }
  };

  /**
   * eliminarInscrito: Elimina un inscrito via DELETE al backend.
   *
   * Antes: setInscritos(inscritos.filter(...))             → solo memoria
   * Ahora: fetch(API_URL + id, { method: 'DELETE' })      → elimina en servidor
   */
  const eliminarInscrito = async (id) => {
    try {
      setErrorServidor('');
      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) throw new Error('Error al eliminar');

      setInscritos(inscritos.filter((i) => i.id !== id));
    } catch (error) {
      setErrorServidor('Error al eliminar. Verifica que el backend este corriendo.');
    }
  };

  return (
    <section className="page">
      <h2>Formulario de Inscripcion</h2>

      {/* Error de conexion al servidor */}
      {errorServidor && (
        <div className="alerta alerta--error">
          {errorServidor}
          <button className="alerta__retry" onClick={cargarInscritos}>Reintentar</button>
        </div>
      )}

      {/* Mensaje de exito */}
      {enviado && (
        <div className="alerta alerta--exito">
          Inscripcion realizada correctamente (guardada en el servidor)
        </div>
      )}

      {/* Formulario */}
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="nombre">Nombre completo *</label>
          <input type="text" id="nombre" name="nombre"
            className={`formulario__input ${errores.nombre ? 'formulario__input--error' : ''}`}
            value={formData.nombre} onChange={handleChange} placeholder="Ej: Juan Perez" />
          {errores.nombre && <span className="formulario__error">{errores.nombre}</span>}
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="email">Correo electronico *</label>
          <input type="email" id="email" name="email"
            className={`formulario__input ${errores.email ? 'formulario__input--error' : ''}`}
            value={formData.email} onChange={handleChange} placeholder="Ej: juan@ucatolica.edu.co" />
          {errores.email && <span className="formulario__error">{errores.email}</span>}
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="telefono">Telefono *</label>
          <input type="tel" id="telefono" name="telefono"
            className={`formulario__input ${errores.telefono ? 'formulario__input--error' : ''}`}
            value={formData.telefono} onChange={handleChange} placeholder="Ej: 3001234567" />
          {errores.telefono && <span className="formulario__error">{errores.telefono}</span>}
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="programa">Programa academico *</label>
          <select id="programa" name="programa"
            className={`formulario__input ${errores.programa ? 'formulario__input--error' : ''}`}
            value={formData.programa} onChange={handleChange}>
            <option value="">-- Selecciona un programa --</option>
            <option value="Ingenieria de Sistemas">Ingenieria de Sistemas</option>
            <option value="Ingenieria Electronica">Ingenieria Electronica</option>
            <option value="Ingenieria Civil">Ingenieria Civil</option>
            <option value="Ingenieria Industrial">Ingenieria Industrial</option>
          </select>
          {errores.programa && <span className="formulario__error">{errores.programa}</span>}
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="semestre">Semestre *</label>
          <select id="semestre" name="semestre"
            className={`formulario__input ${errores.semestre ? 'formulario__input--error' : ''}`}
            value={formData.semestre} onChange={handleChange}>
            <option value="">-- Selecciona el semestre --</option>
            {[1,2,3,4,5,6,7,8,9,10].map((num) => (
              <option key={num} value={num}>{num} semestre</option>
            ))}
          </select>
          {errores.semestre && <span className="formulario__error">{errores.semestre}</span>}
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="comentarios">Comentarios (opcional)</label>
          <textarea id="comentarios" name="comentarios"
            className="formulario__input formulario__textarea"
            value={formData.comentarios} onChange={handleChange}
            placeholder="Escribe un comentario..." rows="3" />
        </div>

        <button type="submit" className="formulario__btn">Inscribirse</button>
      </form>

      {/* Lista de inscritos desde el servidor */}
      {cargando ? (
        <p className="cargando">Cargando inscritos...</p>
      ) : inscritos.length > 0 ? (
        <div className="inscritos">
          <h3>Inscritos ({inscritos.length})</h3>
          <div className="inscritos__lista">
            {inscritos.map((inscrito) => (
              <div key={inscrito.id} className="inscritos__card">
                <div className="inscritos__info">
                  <p className="inscritos__nombre">{inscrito.nombre}</p>
                  <p className="inscritos__detalle">{inscrito.email}</p>
                  <p className="inscritos__detalle">
                    {inscrito.programa} - Semestre {inscrito.semestre}
                  </p>
                  <p className="inscritos__fecha">{inscrito.fecha}</p>
                </div>
                <button className="inscritos__eliminar" onClick={() => eliminarInscrito(inscrito.id)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Inscripcion;
