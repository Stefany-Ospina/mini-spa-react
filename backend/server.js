/**
 * Servidor Backend - API REST para Inscripciones
 *
 * Endpoints:
 *   GET    /api/inscritos      → Lista todos los inscritos
 *   POST   /api/inscritos      → Crea un nuevo inscrito
 *   DELETE /api/inscritos/:id  → Elimina un inscrito por ID
 *
 * Base de datos: archivo JSON (data/inscritos.json)
 * Puerto: 3001
 */

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, 'data', 'inscritos.json');

// Middleware
app.use(cors());
app.use(express.json());

// =============================================
// FUNCIONES DE BASE DE DATOS (lectura/escritura JSON)
// =============================================

const leerInscritos = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const guardarInscritos = (inscritos) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(inscritos, null, 2), 'utf-8');
};

// =============================================
// ENDPOINTS DE LA API
// =============================================

// GET /api/inscritos - Obtener todos los inscritos
app.get('/api/inscritos', (req, res) => {
  const inscritos = leerInscritos();
  res.json(inscritos);
});

// POST /api/inscritos - Crear un nuevo inscrito
app.post('/api/inscritos', (req, res) => {
  const { nombre, email, telefono, programa, semestre, comentarios } = req.body;

  // Validacion en el servidor
  const errores = {};
  if (!nombre || !nombre.trim()) errores.nombre = 'El nombre es obligatorio';
  if (!email || !email.trim()) {
    errores.email = 'El email es obligatorio';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errores.email = 'Email invalido';
  }
  if (!telefono || !telefono.trim()) {
    errores.telefono = 'El telefono es obligatorio';
  } else if (!/^\d{7,10}$/.test(telefono)) {
    errores.telefono = 'Telefono invalido';
  }
  if (!programa) errores.programa = 'Selecciona un programa';
  if (!semestre) errores.semestre = 'Selecciona un semestre';

  if (Object.keys(errores).length > 0) {
    return res.status(400).json({ errores });
  }

  // Verificar email duplicado
  const inscritos = leerInscritos();
  const existe = inscritos.find((i) => i.email === email);
  if (existe) {
    return res.status(400).json({
      errores: { email: 'Este email ya esta registrado' },
    });
  }

  // Crear nuevo inscrito
  const nuevoInscrito = {
    id: Date.now(),
    nombre: nombre.trim(),
    email: email.trim(),
    telefono: telefono.trim(),
    programa,
    semestre,
    comentarios: comentarios ? comentarios.trim() : '',
    fecha: new Date().toLocaleString('es-CO'),
  };

  inscritos.push(nuevoInscrito);
  guardarInscritos(inscritos);

  console.log(`Nuevo inscrito: ${nuevoInscrito.nombre} (${nuevoInscrito.email})`);
  res.status(201).json(nuevoInscrito);
});

// DELETE /api/inscritos/:id - Eliminar un inscrito
app.delete('/api/inscritos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let inscritos = leerInscritos();

  const index = inscritos.findIndex((i) => i.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Inscrito no encontrado' });
  }

  const eliminado = inscritos[index];
  inscritos = inscritos.filter((i) => i.id !== id);
  guardarInscritos(inscritos);

  console.log(`Eliminado: ${eliminado.nombre}`);
  res.json({ mensaje: 'Inscrito eliminado', eliminado });
});

// =============================================
// INICIAR SERVIDOR
// =============================================

app.listen(PORT, () => {
  console.log('');
  console.log('===========================================');
  console.log(`  Backend corriendo en http://localhost:${PORT}`);
  console.log('');
  console.log('  Endpoints disponibles:');
  console.log(`    GET    http://localhost:${PORT}/api/inscritos`);
  console.log(`    POST   http://localhost:${PORT}/api/inscritos`);
  console.log(`    DELETE http://localhost:${PORT}/api/inscritos/:id`);
  console.log('===========================================');
  console.log('');
});
