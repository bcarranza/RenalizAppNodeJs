const admin = require('../database/firebase.js');

const cors = require('cors');
const corsHandler = cors({ origin: true });

exports.getTestsByUid = async (request, response) => {
    corsHandler(request, response, async () => {
        try {
            const db = admin.firestore();
            const testCollection = db.collection('TestResults');
            
            // Obteniendo el uid desde el cuerpo de la solicitud JSON
            const uid = request.body.uid;
            if (!uid) {
                response.status(400).send('UID is required in the request body');
                return;
            }

            // Crear una consulta para obtener todos los documentos donde el campo uid es igual al uid proporcionado
            const query = testCollection.where('uid', '==', uid);
            
            // Ejecutar la consulta
            const querySnapshot = await query.get();
            
            // Verificar si la consulta devolvió algún documento
            if (querySnapshot.empty) {
                response.status(404).send('No tests found for the specified user');
                return;
            }

            // Lista para almacenar los resultados de cada test
            const testsResults = [];
            // Lista para almacenar las cadenas formateadas de cada test
            const formattedTests = [];

            // Iterar sobre los documentos devueltos y procesarlos
            querySnapshot.forEach(documentSnapshot => {
                const docData = documentSnapshot.data();
                
                // Verificar si docData y docData.testResult están definidos
                if (!docData || !docData.testResult) {
                    console.error('Unexpected document structure:', documentSnapshot.id);
                    return;  // skip this iteration
                }
                
                const score = docData.testResult.score;
                const timestamp = docData.testResult.timestamp;
                
                if (score === undefined || timestamp === undefined) {
                    console.error('Missing score or timestamp:', documentSnapshot.id);
                    return;  // skip this iteration
                }

                // Agregar el resultado del test a la lista
                testsResults.push({ score, timestamp });

                let riskMessage = '';
                let riskDescription = '';

                // Aplicar la lógica de evaluación de riesgos
                if (score >= 0 && score <= 4) {
                    riskMessage = "Buenas prácticas para la salud renal.";
                    riskDescription = "Sigue cuidando tus riñones.";
                } else if (score >= 5 && score <= 10) {
                    riskMessage = "Riesgo moderado.";
                    riskDescription = "Considera hablar con un médico para una evaluación.";
                } else {
                    riskMessage = "Riesgo alto.";
                    riskDescription = "Se recomienda consultar a un médico para una evaluación y consejo médico.";
                }

                // Formatear la cadena para este test
                const formattedTest = `${score};${riskMessage};${riskDescription};${timestamp};${documentSnapshot.id}`;

                // Agregar la cadena formateada a la lista
                formattedTests.push(formattedTest);
            });

            // Unir las cadenas formateadas con una coma y envolver la lista resultante con corchetes
            const formattedResult = `[${formattedTests.join(', ')}]`;

            // Devolver la lista de resultados de test y la cadena formateada
            response.status(200).send({
                testsResults,
                formattedResult
            });
        } catch (error) {
            console.error('Error fetching test data:', error);
            response.status(500).send('Internal Server Error');
        }
    });
};
