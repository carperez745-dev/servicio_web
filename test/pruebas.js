/**
 * pruebas.js
 * -----------------------------------------------------------
 * Pruebas básicas del servicio (sin librerías extra).
 * Ejecutar con:  npm test   (con el servidor apagado)
 */
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const app = require('../src/server');

const archivoDatos = path.join(__dirname, '..', 'src', 'data', 'usuarios.json');
if (fs.existsSync(archivoDatos)) fs.unlinkSync(archivoDatos); // empezar limpio

const servidor = app.listen(0, async () => {
  const base = `http://localhost:${servidor.address().port}/api`;
  const post = (ruta, cuerpo) =>
    fetch(base + ruta, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpo),
    }).then(async (r) => ({ estado: r.status, datos: await r.json() }));

  try {
    let r = await post('/registro', { usuario: 'aprendiz', contrasena: 'clave123' });
    assert.strictEqual(r.estado, 201);

    r = await post('/registro', { usuario: 'aprendiz', contrasena: 'clave123' });
    assert.strictEqual(r.estado, 409);

    r = await post('/login', { usuario: 'aprendiz', contrasena: 'clave123' });
    assert.strictEqual(r.estado, 200);
    assert.strictEqual(r.datos.mensaje, 'Autenticación satisfactoria');

    r = await post('/login', { usuario: 'aprendiz', contrasena: 'incorrecta' });
    assert.strictEqual(r.estado, 401);
    assert.strictEqual(r.datos.mensaje, 'Error en la autenticación');

    r = await post('/login', { usuario: 'noexiste', contrasena: 'clave123' });
    assert.strictEqual(r.estado, 401);

    r = await post('/login', { usuario: 'aprendiz' });
    assert.strictEqual(r.estado, 400);

    console.log('✔ Todas las pruebas pasaron correctamente');
  } catch (e) {
    console.error('✘ Falló una prueba:', e.message);
    process.exitCode = 1;
  } finally {
    servidor.close();
    if (fs.existsSync(archivoDatos)) fs.unlinkSync(archivoDatos);
  }
});
