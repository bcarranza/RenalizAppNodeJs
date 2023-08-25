const firebase = require('firebase-admin');
const serviceAccount = require('./properties.json')
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://renalizapp-dev-2023.firebaseio.com"
  });

  const db = firebase.firestore();
  

module.exports = {
  db
};

