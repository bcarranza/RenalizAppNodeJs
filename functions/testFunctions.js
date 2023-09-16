const admin = require('../database/firebase.js');
const cors = require('cors');
const corsHandler = cors({ origin: true });

exports.getTests = async (request, response) => {
    corsHandler(request, response, async () => {
        try {
            const db = admin.firestore();
            const testCollection = db.collection('Tests');
            
            // Obteniendo el ID desde el cuerpo de la solicitud JSON
            const testId = request.body.id;
            if (!testId) {
                response.status(400).send('ID is required in the request body');
                return;
            }

            const doc = await testCollection.doc(testId).get();

            if (!doc.exists) {
                response.status(404).send('Document not found');
                return;
            }

            response.status(200).json(doc.data());
        } catch (error) {
            console.error('Error fetching test data:', error);
            response.status(500).send('Internal Server Error');
        }
    });
};

exports.postTestResults = async (request, response) => {
    corsHandler(request, response, async () => {
        try {
            const db = admin.firestore();
            const testResultsCollection = db.collection('TestResults');

            const resultData = request.body;

            await testResultsCollection.add(resultData);

            response.status(200).send('Test results added successfully');
        } catch (error) {
            console.error('Error adding test results:', error);
            response.status(500).send('Internal Server Error');
        }
    });
};
