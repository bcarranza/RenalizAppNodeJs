const admin = require('../database/firebase.js');

const cors = require('cors');
const corsHandler = cors({ origin: true });

exports.getDetailTest = async (request, response) => {
  corsHandler(request, response, async () => {
    try {
      const db = admin.firestore();
      const TestResultsCollection = db.collection('TestResults');
      const TestResultsId = request.body.id;
            if (!TestResultsId) {
                response.status(400).send('ID is required in the request body');
                return;
            }

            const doc = await TestResultsCollection.doc(TestResultsId).get();

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