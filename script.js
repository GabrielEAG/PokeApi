const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Carga las variables de entorno

const app = express();
const PORT = 3000;

// Variables de entorno para el login
const VALID_USER = process.env.USERNAMELOG;
const VALID_PASS = process.env.PASSWORD;

console.log('Usuario:', process.env.USERNAMELOG);
console.log('Contraseña:', VALID_PASS);

// Middleware para servir archivos estáticos y parsear JSON
app.use(cors());
app.use(bodyParser.json());

// Ruta para manejar el login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === VALID_USER && password === VALID_PASS) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Credenciales incorrectas' });
  }
});

app.use(express.static('public'));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
