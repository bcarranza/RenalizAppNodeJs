
const admin = require('../database/firebase.js');//change it to the firebase correct db if any


const serviceAccount = require('./your-firebase-service-account-key.json'); // replace with your Firebase service account key file

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-firebase-project-id.firebaseio.com', // replace with your Firebase project URL
});


// Firebase Authentication
const auth = admin.auth();

exports.postRegister = async (request, response) => {

  try {
    const { name,  dob, address, phoneNumber } = req.body;

    // Create a new Firebase user
    const userRecord = await auth.createUser({
      //email,
      //password,
      displayName: name,
    });

    // Send additional user data to Flutter app if needed
    const userData = {
      name,
      //email,
      dob,
      address,
      phoneNumber,
    };

    res.status(201).json({ message: 'User registered successfully', user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

