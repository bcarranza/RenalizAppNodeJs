const admin = require('../database/firebase.js');
const cors = require('cors');
const corsHandler = cors({ origin: true });

exports.getLugaresAtencion = async (request, response) => {
  corsHandler(request, response, async () => {
    try {
      const db = admin.firestore();
      const LugaresAtencionCollection = db.collection('LugaresAtencion');

      const lugaresQuery = await LugaresAtencionCollection.get();

      if (lugaresQuery.empty) {
        return response.status(404).json({ message: 'No se encontraron lugares de atención' });
      }
      
      const lugaresData = [];
      lugaresQuery.forEach((doc) => {
        lugaresData.push(doc.data());
      });

      response.status(200).json({
        message: 'Lugares de atención encontrados exitosamente',
        lugares: lugaresData,
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Error al buscar lugares de atención' });
    }
  });
};



exports.getLugaresAtencionbyUID = async (request, response) => {
  corsHandler(request, response, async () => {
    try {
      const db = admin.firestore();
      const uid = request.body.uid; 

      // Realizar una consulta para obtener un solo documento por su UID
      const lugarDoc = await db.collection('LugaresAtencion').doc(uid).get();

      if (!lugarDoc.exists) {
        return response.status(404).json({ message: 'No se encontró el lugar de atención con el UID proporcionado' });
      }

      response.status(200).json({
        message: 'Lugar de atención encontrado exitosamente',
        lugar: lugarDoc.data(),
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Error al buscar el lugar de atención por UID' });
    }
  });
};
