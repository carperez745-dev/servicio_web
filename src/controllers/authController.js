/**
 * authController.js
 * -----------------------------------------------------------
 * Lógica de negocio del servicio:
 *  - registrar: crea un usuario nuevo con la contraseña cifrada.
 *  - login: valida usuario y contraseña.
 */
const bcrypt = require('bcryptjs');
const { guardarUsuarios, leerUsuarios, buscarPorUsuario } = require('../utils/almacenamiento');

/**
 * POST /api/registro
 * Recibe: { "usuario": "...", "contrasena": "..." }
 */
function registrar(req, res) {
  const { usuario, contrasena } = req.body;

  // La contraseña debe tener mínimo 6 caracteres
  if (contrasena.length < 6) {
    return res.status(400).json({
      exito: false,
      mensaje: 'La contraseña debe tener al menos 6 caracteres.',
    });
  }

  // No se permiten usuarios repetidos
  if (buscarPorUsuario(usuario)) {
    return res.status(409).json({
      exito: false,
      mensaje: 'El usuario ya existe.',
    });
  }

  // Se cifra la contraseña (NUNCA se guarda en texto plano)
  const contrasenaCifrada = bcrypt.hashSync(contrasena, 10);

  const usuarios = leerUsuarios();
  usuarios.push({
    id: usuarios.length + 1,
    usuario: usuario.trim(),
    contrasena: contrasenaCifrada,
    fechaRegistro: new Date().toISOString(),
  });
  guardarUsuarios(usuarios);

  return res.status(201).json({
    exito: true,
    mensaje: 'Usuario registrado correctamente.',
  });
}

/**
 * POST /api/login
 * Recibe: { "usuario": "...", "contrasena": "..." }
 * Si las credenciales son correctas -> "Autenticación satisfactoria"
 * En caso contrario               -> "Error en la autenticación"
 */
function login(req, res) {
  const { usuario, contrasena } = req.body;

  // 1. Se busca el usuario
  const encontrado = buscarPorUsuario(usuario);

  // 2. Se compara la contraseña enviada con la cifrada guardada
  const credencialesValidas =
    encontrado && bcrypt.compareSync(contrasena, encontrado.contrasena);

  if (!credencialesValidas) {
    // Mismo mensaje para usuario inexistente o clave errónea (más seguro)
    return res.status(401).json({
      exito: false,
      mensaje: 'Error en la autenticación',
    });
  }

  return res.status(200).json({
    exito: true,
    mensaje: 'Autenticación satisfactoria',
  });
}

module.exports = { registrar, login };
