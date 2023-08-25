const express = require('express');
const router = express.Router();
const db = require('../Database/Firebase')

router.get('/', async (req, res) => {

  console.log('llega aqui');
collection = db.collection("Blog");
collection.get()
  .then((querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        data: doc.data()
      });
    });
    
    res.status(200).json(data);

  })
  .catch((error) => {
    console.error("Error al obtener documentos: ", error);
    res.status(500).send("Error al obtener documentos de Firestore");
  });
});

module.exports = router;