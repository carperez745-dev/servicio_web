/**
 * authRoutes.js
 * -----------------------------------------------------------
 * Define los endpoints del servicio y los conecta con
 * su middleware de validación y su controlador.
 */
const express = require('express');
const { registrar, login } = require('../controllers/authController');
const validarCredenciales = require('../middlewares/validarCredenciales');

const router = express.Router();

router.post('/registro', validarCredenciales, registrar); // Crear usuario
router.post('/login', validarCredenciales, login);        // Iniciar sesión

module.exports = router;
