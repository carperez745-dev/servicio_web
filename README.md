# API de Registro e Inicio de Sesión
Evidencia **GA7-220501096-AA5-EV01** – Diseño y desarrollo de servicios web.

Servicio web REST hecho con **Node.js + Express**. Recibe un usuario y una contraseña:
- Si la autenticación es correcta → `Autenticación satisfactoria`
- Si no → `Error en la autenticación`

## Requisitos
- Node.js 18 o superior

## Instalación y ejecución
```bash
npm install
npm start          # servidor en http://localhost:3000
npm test           # pruebas automáticas (con el servidor apagado)
```

## Endpoints
| Método | Ruta            | Descripción            |
|--------|-----------------|------------------------|
| GET    | `/`             | Verifica que la API esté activa |
| POST   | `/api/registro` | Registra un usuario    |
| POST   | `/api/login`    | Inicia sesión          |

Body (JSON) para ambos POST:
```json
{ "usuario": "aprendiz", "contrasena": "clave123" }
```

### Respuestas
| Caso                         | Código | Mensaje                              |
|------------------------------|--------|--------------------------------------|
| Registro exitoso             | 201    | Usuario registrado correctamente.    |
| Usuario ya existe            | 409    | El usuario ya existe.                |
| Faltan campos / clave corta  | 400    | Mensaje del campo faltante           |
| Login correcto               | 200    | Autenticación satisfactoria          |
| Login incorrecto             | 401    | Error en la autenticación            |

### Ejemplo con curl
```bash
curl -X POST http://localhost:3000/api/registro -H "Content-Type: application/json" \
  -d '{"usuario":"aprendiz","contrasena":"clave123"}'

curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" \
  -d '{"usuario":"aprendiz","contrasena":"clave123"}'
```
También se puede probar con Postman o Thunder Client.

## Estructura
```
src/
 ├─ server.js                      Configuración y arranque
 ├─ routes/authRoutes.js           Endpoints
 ├─ controllers/authController.js  Lógica de registro y login
 ├─ middlewares/validarCredenciales.js  Validación de datos
 ├─ utils/almacenamiento.js        Guardado en archivo JSON
 └─ data/                          Aquí se crea usuarios.json
test/pruebas.js                    Pruebas automáticas
```

## Seguridad
Las contraseñas se cifran con **bcrypt** antes de guardarse; nunca se almacenan en texto plano.
