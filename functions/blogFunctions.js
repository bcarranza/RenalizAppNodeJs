const admin = require('../database/firebase.js');
const cors = require('cors');

// Configura las opciones CORS
const corsOptions = {
  origin: '*', 
  methods: 'GET, POST', 
};

// Crea un manejador CORS
const corsHandler = cors(corsOptions);

exports.getAllBlogs = async (request, response) => {
  corsHandler(request, response, async () => {
    try {
      const db = admin.firestore();
      const blogCollection = db.collection('Blog');

      const snapshot = await blogCollection.get();
      const blogData = [];

      snapshot.forEach((doc) => {
        blogData.push(doc.data());
      });

      response.status(200).json(blogData);
    } catch (error) {
      console.error('Error fetching blog data:', error);
      response.status(500).send('Internal Server Error');
    }
  });
};