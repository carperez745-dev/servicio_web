/**
 * almacenamiento.js
 * -----------------------------------------------------------
 * Persistencia sencilla en un archivo JSON (sustituye a una
 * base de datos para mantener el ejercicio simple).
 * Si se quisiera una BD real (MySQL, MongoDB, etc.), solo habría
 * que reemplazar las funciones de este archivo.
 */
const fs = require('fs');
const path = require('path');

// Ruta del archivo donde se guardan los usuarios
const RUTA_ARCHIVO = path.join(__dirname, '..', 'data', 'usuarios.json');

/** Lee todos los usuarios del archivo. Si no existe, devuelve []. */
function leerUsuarios() {
  if (!fs.existsSync(RUTA_ARCHIVO)) {
    return [];
  }
  const contenido = fs.readFileSync(RUTA_ARCHIVO, 'utf8');
  return contenido ? JSON.parse(contenido) : [];
}

/** Guarda la lista completa de usuarios en el archivo. */
function guardarUsuarios(usuarios) {
  fs.writeFileSync(RUTA_ARCHIVO, JSON.stringify(usuarios, null, 2), 'utf8');
}

/** Busca un usuario por su nombre de usuario (sin distinguir mayúsculas). */
function buscarPorUsuario(usuario) {
  return leerUsuarios().find(
    (u) => u.usuario.toLowerCase() === usuario.toLowerCase()
  );
}

module.exports = { leerUsuarios, guardarUsuarios, buscarPorUsuario };
