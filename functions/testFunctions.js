const admin = require('firebase-admin');
admin.initializeApp();

exports.getTests = async (request, response) => {
    try {
        const db = admin.firestore();
        const testCollection = db.collection('Tests');
        
        // Obteniendo el ID desde los parámetros de la URL
        const testId = request.params.id;
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
};

exports.postTestResults = async (request, response) => {
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
};
