const admin = require('../database/firebase.js');
const cors = require('cors');
const corsHandler = cors({ origin: true });

exports.postFeedback = async (request, response) => {
    corsHandler(request, response, async () => {
        try {
            const db = admin.firestore();
            const feedbackCollection = db.collection('Feedback'); // Colección 'Feedback'

            const { willVisitDoctor, appRating, comments, uid } = request.body;

            // Validación básica de los datos
            if (
                typeof willVisitDoctor !== 'boolean' || 
                typeof appRating !== 'number' || 
                typeof comments !== 'string' ||
                typeof uid !== 'string'
            ) {
                response.status(400).send('Invalid data format');
                return;
            }

            // Crear y guardar el feedback con el uid del usuario
            await feedbackCollection.add({
                willVisitDoctor,
                appRating,
                comments,
                uid
            });

            response.status(200).send('Feedback saved successfully');
        } catch (error) {
            console.error('Error saving feedback:', error);
            response.status(500).send('Internal Server Error');
        }
    });
};