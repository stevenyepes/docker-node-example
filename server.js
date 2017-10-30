'use strict';

const express = require('express');

// Constantes
const PORT = 3200;
const HOST = '0.0.0.0'; // Hacemos bind a cualquier ip

// Inicializar App
const app = express();
// servir los archivos estáticos
app.use(express.static('public'));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
