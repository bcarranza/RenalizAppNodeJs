const admin = require('../database/firebase.js');
const cors = require('cors');
const corsHandler = cors({ origin: true });

exports.getLugaresAtencion = async (request, response) => {
  corsHandler(request, response, async () => {
    try {
      const db = admin.firestore();
      const LugaresAtencionCollection = db.collection('LugaresAtencion');

      // Realizar una consulta para obtener todos los lugares de atención
      const lugaresQuery = await LugaresAtencionCollection.get();

      if (lugaresQuery.empty) {
        return response.status(404).json({ message: 'No se encontraron lugares de atención' });
      }
      
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
