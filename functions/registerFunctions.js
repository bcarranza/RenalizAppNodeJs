const admin = require('../database/firebase.js');
const cors = require('cors');
const corsHandler = cors({ origin: true });

exports.postRegister = async (request, response) => {
  corsHandler(request, response, async () => {
    try {
      const db = admin.firestore();
      const RegistroUsuariosCollection = db.collection('RegistroUsuarios');

      const resultData = request.body;

      if (!resultData.name ||!resultData.dob || !resultData.phoneNumber) {
        return response.status(400).json({ message: 'Nombre, fecha de nacimiento y número de teléfono son campos obligatorios' });
      }

      const { name, dob, address, phoneNumber } = resultData;

      const userData = {
        name,
        dob, 
        address: address || null, 
        phoneNumber,
      };

      await RegistroUsuariosCollection.add(resultData);

      response.status(201).json({ message: 'Usuario registrado exitosamente', user: userData });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Error en el registro' });
    }
  });
};/*
const admin = require('../database/firebase.js');
const cors = require('cors');
const corsHandler = cors({ origin: true });

exports.postRegister = async (request, response) => {
  corsHandler(request, response, async () => {
    try {
      const db = admin.firestore();
      const RegistroUsuariosCollection = db.collection('RegistroUsuarios');

      const resultData = request.body;

      // Validaciones para campos obligatorios
      if (!resultData.name || !resultData.phoneNumber) {
        return response.status(400).json({ message: 'Nombre y número de teléfono son campos obligatorios' });
      }

      const { uid, name, dob, address, phoneNumber } = resultData;

      // Crear un documento en Firestore usando el UID del usuario como identificador
      const userDocRef = RegistroUsuariosCollection.doc(uid);

      const userData = {
        userId: uid, // Guardar el UID en un campo llamado 'userId'
        name,
        dob: dob || null,
        address: address || null,
        phoneNumber,
      };

      // Establecer la información del usuario en el documento Firestore
      await userDocRef.set(userData);

      response.status(201).json({ message: 'Usuario registrado exitosamente', user: userData });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Error en el registro' });
    }
  });
};
*/
