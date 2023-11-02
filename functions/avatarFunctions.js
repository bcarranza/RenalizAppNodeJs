const admin = require("../database/firebase.js");

const setCorsHeaders = (response) => {
  response.set("Access-Control-Allow-Origin", "*");
  if (response.method === "OPTIONS") {
    response.set("Access-Control-Allow-Methods", "POST");
    response.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    response.set("Access-Control-Max-Age", "3600");
    response.status(204).send("");
    return true;
  }
  return false;
};

exports.updateAvatar = async (event) => {
  try {
    console.log('La función updateAvatar se está ejecutando.');
    const requestBody = JSON.parse(event.body);
    console.log('Datos del cuerpo de la solicitud:', requestBody);
    const { userId, imageUrl } = requestBody;

    const userRef = admin.firestore().collection('Users').doc(userId);
    await userRef.update({
      'googleProfile.image': imageUrl,
    });
    console.log('Imagen de perfil actualizada con éxito');

    console.log('La respuesta de éxito se generó correctamente.');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Profile image updated successfully' }),
    };
  } catch (error) {
    console.error('Ocurrió un error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update profile image' }),
    };
  }
};
/*
// Objeto event simulado
const event = {
  body: JSON.stringify({ userId: 'FReQ4ptff2oA3EraVXgc', imageUrl: 'https://path-to-image.com/profile.jpg' }),
  // Otras propiedades según las necesidades de tu función, como 'headers', 'queryStringParameters', etc.
};

// Ejecutar la función localmente
exports.updateAvatar(event, {}, (error, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log(response);
  }
});*/