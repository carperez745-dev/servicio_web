/**
 * server.js
 * -----------------------------------------------------------
 * Punto de entrada. Configura Express y levanta el servidor.
 */
const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PUERTO = process.env.PORT || 3000;

// Permite recibir y leer JSON en el body de las peticiones
app.use(express.json());

// Manejo de JSON mal formado
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ exito: false, mensaje: 'JSON inválido.' });
  }
  next(err);
});

// Ruta de prueba para saber que el servicio está activo
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de autenticación activa', version: '1.0.0' });
});

// Todos los endpoints de autenticación quedan bajo /api
app.use('/api', authRoutes);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ exito: false, mensaje: 'Ruta no encontrada.' });
});

// Solo levanta el servidor si se ejecuta directamente (facilita las pruebas)
if (require.main === module) {
  app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
  });
}

module.exports = app;
