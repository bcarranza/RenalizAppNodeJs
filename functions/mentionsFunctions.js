const admin = require('../database/firebase.js');

const cors = require('cors');
const corsHandler = cors({ origin: true });

exports.getMentions = async (request, response) => {
  corsHandler(request, response, async () => {
    try {
      const db = admin.firestore();
      const mentionsCollection = db.collection('Mentions');

      const querySnapshot = await mentionsCollection.get();

      if (querySnapshot.empty) {
          response.status(404).send('No documents found in the collection');
          return;
      }

      const mentions = [];
      querySnapshot.forEach((doc) => {
          mentions.push(doc.data());
      });

      response.status(200).json(mentions);
    } catch (error) {
      console.error('Error fetching mentions data:', error);
      response.status(500).send('Internal Server Error');
    }
  });
};
