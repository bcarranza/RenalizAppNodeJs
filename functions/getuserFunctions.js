const admin = require('../database/firebase.js');
const cors = require('cors');
const corsHandler = cors({ origin: true });

exports.getUserByUid = async (request, response) => {
  corsHandler(request, response, async () => {
    try {
      const db = admin.firestore();
      const RegistroUsuariosCollection = db.collection('RegistroUsuarios');

      const uid = request.params.uid; 

      if (!uid) {
        return response.status(400).json({ message: 'El UID de usuario es obligatorio' });
      }

              const userQuery = await RegistroUsuariosCollection.where('uid', '==', uid).get();

      if (userQuery.empty) {
        return response.status(404).json({ message: 'Usuario no encontrado' });
      }

   
      const userDoc = userQuery.docs[0];
      const userData = userDoc.data();

      response.status(200).json({ message: 'Usuario encontrado exitosamente', user: userData });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Error al buscar el usuario' });
    }
  });
};
