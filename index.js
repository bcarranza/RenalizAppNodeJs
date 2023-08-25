<<<<<<< HEAD
const functions = require('firebase-functions');
const express = require('express');
const app = express();

// Requiere el enrutador desde home.controller.js
const blogRouter = require('./Home/home.controller');

// Define la función HTTP
exports.http = functions.https.onRequest(async (request, response) => {
  try {
    // Usa el enrutador como middleware para manejar la solicitud
    app.use('/', blogRouter);

    // Deja que el enrutador maneje la solicitud y obtenga los datos
    // Puedes acceder a los datos desde la respuesta del enrutador
    await new Promise((resolve) => app(request, response, resolve));

    // Ahora, puedes enviar los datos como respuesta
    if (response.locals && response.locals.data) {
      response.status(200).json(response.locals.data);
    } else {
      response.status(500).send('No se pudieron obtener los datos');
    }
  } catch (error) {
    console.error('Error en la función HTTP: ', error);
    response.status(500).send('Error interno del servidor');
  }
});
=======
exports.http = (request, response) =>{
    response.status(200).send('Hello World from GCP!');
};
>>>>>>> b414be0ba27e8e4af01de3d464a52d00a75f4019
