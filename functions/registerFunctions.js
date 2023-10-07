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
      if (!resultData.First_Name|| !resultData.Last_Name || !resultData.Birth_Date || !resultData.DPI
        || !resultData.Telephone_Number || !resultData.Address || !resultData.Department || !resultData.City) {
        return response.status(400).json({ message: 'Completa los campos oblicatorios' });
      }

      const { uid, First_Name,
        Second_Name,
        Last_Name,
        Second_Last_Name,
        Birth_Date,
        DPI,
        Telephone_Number,
        Email,
        Address,
        Department,
        City,
        Blood_Type,
        Civil_Status,
        Gender,
} = resultData;

      // Crear un documento en Firestore usando el UID del usuario como identificador
      const userDocRef = RegistroUsuariosCollection.doc(uid);

      const userData = {
         userId: uid, // Guardar el UID en un campo llamado 'userId'
         First_Name,
         Second_Name: Second_Name || null,
         Last_Name,
         Second_Last_Name: Second_Last_Name || null,
         Birth_Date,
         DPI,
         Telephone_Number,
         Email: Email || null,
         Address,
         Department,
         City,
         Blood_Type: Blood_Type || null,
         Civil_Status: Civil_Status|| null,
         Gender: Gender|| null,

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

