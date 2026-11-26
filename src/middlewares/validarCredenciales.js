/**
 * validarCredenciales.js
 * -----------------------------------------------------------
 * Middleware que verifica que el cuerpo (body) de la petición
 * traiga "usuario" y "contrasena" como textos no vacíos.
 * Si falta alguno, responde 400 y no continúa al controlador.
 */
function validarCredenciales(req, res, next) {
  const { usuario, contrasena } = req.body || {};

  if (typeof usuario !== 'string' || usuario.trim() === '') {
    return res.status(400).json({
      exito: false,
      mensaje: 'El campo "usuario" es obligatorio.',
    });
  }

  if (typeof contrasena !== 'string' || contrasena.trim() === '') {
    return res.status(400).json({
      exito: false,
      mensaje: 'El campo "contrasena" es obligatorio.',
    });
  }

  // Todo correcto: se pasa al siguiente paso (el controlador)
  next();
}

module.exports = validarCredenciales;
